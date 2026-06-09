import { connectDB } from "@/lib/db";
import { Lead, Task } from "@/models";
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
      .populate("assignedTo", "name")
      .populate("assignedTask", "title status")
      .populate("clientId", "clientId companyLegalName");

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

// CREATE lead  (Stage 1)
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

    const userName = (session.user as any)?.name || "Admin";
    const userId   = (session.user as any)?.id;

    // Ensure Stage 1 defaults
    const lead = await Lead.create({
      ...body,
      stage: 1,
      status: body.status || "New",
      activityLog: [{
        stage:    1,
        status:   "New",
        note:     body.remarks || `Lead created for ${body.companyName}`,
        doneBy:   userName,
        doneById: userId,
      }],
    });

    // ── Stage 2: If assignedTo is provided at creation, auto-create a task ──
    if (body.assignedTo) {
      const task = await Task.create({
        title: `Follow up: ${lead.companyName}`,
        assignedTo: body.assignedTo,
        lead: lead._id,
        priority: lead.priority === "Hot" ? "High" : lead.priority === "Cold" ? "Low" : "Medium",
        dueDate: body.followUpDate || null,
        notes: `Auto-created from Lead ${lead.leadId}`,
        status: "Pending",
      });

      // Link task back to lead and advance to Stage 2
      lead.assignedTask = task._id as any;
      lead.stage = 2;
      lead.status = "Assigned";
      await lead.save();
    }

    return NextResponse.json(
      { success: true, data: lead },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
