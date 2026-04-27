import { connectDB } from "@/lib/db";
import { Client, Certification } from "@/models";
import { NextResponse } from "next/server";

// Public endpoint — no auth required, but validates by clientId + mobile
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId")?.trim();
  const mobile = searchParams.get("mobile")?.trim();

  if (!clientId || !mobile) {
    return NextResponse.json({ error: "Client ID and mobile number are required" }, { status: 400 });
  }

  await connectDB();

  // Find client — verify by clientId + mobile (basic auth)
  const client = await Client.findOne({ clientId, mobile }).lean();
  if (!client) {
    return NextResponse.json({ error: "No client found with these details. Please check your Client ID and mobile number." }, { status: 404 });
  }

  // Fetch certifications
  const certifications = await Certification.find(
    { client: client._id },
    "applicationId certificationType productName modelNo currentStage renewalDate approvalDate applicationDate"
  ).sort({ createdAt: -1 }).lean();

  return NextResponse.json({
    client: {
      clientId: client.clientId,
      companyLegalName: client.companyLegalName,
      category: client.category,
      servicesTaken: client.servicesTaken,
    },
    certifications,
  });
}