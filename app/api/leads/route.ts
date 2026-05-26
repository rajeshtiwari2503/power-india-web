 import { connectDB } from "@/lib/db";
import { Lead } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// GET all leads
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .populate("assignedTo", "name");

    return NextResponse.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

// CREATE lead
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();

    if (!body?.companyName) {
      return NextResponse.json(
        { success: false, error: "companyName is required" },
        { status: 400 }
      );
    }

    const lead = await Lead.create(body);

    return NextResponse.json(
      {
        success: true,
        data: lead,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create lead" },
      { status: 500 }
    );
  }
}