 import { connectDB } from "@/lib/db";
import { Client, Certification } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const clientId = searchParams.get("clientId")?.trim();
    const mobile = searchParams.get("mobile")?.trim();

    // 🔐 validation
    if (!clientId || !mobile) {
      return NextResponse.json(
        { error: "Client ID and mobile number are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // 🔎 verify client identity
    const client = await Client.findOne({
      clientId,
      mobile,
    })
      .lean();

    if (!client) {
      return NextResponse.json(
        {
          error:
            "No client found with these details. Please check your Client ID and mobile number.",
        },
        { status: 404 }
      );
    }

    // ⚡ fetch certifications
    const certifications = await Certification.find(
      { client: client._id },
      `
        applicationId
        certificationType
        productName
        modelNo
        currentStage
        renewalDate
        approvalDate
        applicationDate
      `
    )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      client: {
        clientId: client.clientId,
        companyLegalName: client.companyLegalName,
        category: client.category,
        servicesTaken: client.servicesTaken,
      },
      certifications,
    });
  } catch (error) {
    console.error("PORTAL STATUS ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}