import { connectDB } from "@/lib/db";
import { Lead } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

const ok  = (data: any, s = 200) => NextResponse.json({ success: true,  data  }, { status: s });
const err = (msg: string, s = 400) => NextResponse.json({ success: false, error: msg }, { status: s });

// GET — single lead with full activity log
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return err("Unauthorized", 401);

    await connectDB();
    const { id } = await params;

    const lead = await Lead.findById(id)
      .populate("assignedTo",  "name email")
      .populate("assignedTask","title status dueDate")
      .populate("clientId",    "clientId companyLegalName");

    if (!lead) return err("Lead not found", 404);
    return ok(lead);
  } catch { return err("Failed to fetch lead", 500); }
}

// PATCH — update stage/status + append to activityLog
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return err("Unauthorized", 401);

    await connectDB();
    const { id }   = await params;
    const body     = await req.json();
    const userName = (session.user as any)?.name || "System";
    const userId   = (session.user as any)?.id;

    // ── Stage advancement auto-rules ─────────────────────────
    if (body.assignedTo && !body.stage)                    { body.stage = 2; if (!body.status) body.status = "Assigned"; }
    if (body.status === "Converted"  && !body.stage)       { body.stage = 5; body.isConverted = true; }
    if (body.status === "Rejected"   && !body.stage)       body.stage = 4;
    if (body.status === "Lost"       && !body.stage)       body.stage = 4;
    if (body.status === "Nurturing"  && !body.stage)       body.stage = 4;
    if (body.status === "Matured"    && !body.stage)       body.stage = 4;
    if (body.status === "Convinced"  && !body.stage)       body.stage = 4;
    if (body.stage === 9)                                  { body.status = "Converted"; body.isConverted = true; }

    // ── Build activity log entry ──────────────────────────────
    const noteText = body.note || body.remarks || "";

    const logEntry = {
      stage:    body.stage,
      status:   body.status,
      note:     noteText || `Stage ${body.stage} — ${body.status || "updated"}`,
      doneBy:   userName,
      doneById: userId,
    };

    // ── Build update object ───────────────────────────────────
    const { note, ...updateFields } = body; // remove note from top-level

    // remarks = latest note for quick display
    if (noteText) updateFields.remarks = noteText;

    const lead = await Lead.findByIdAndUpdate(
      id,
      {
        $set:  updateFields,
        $push: { activityLog: logEntry },
      },
      { new: true, runValidators: true }
    )
      .populate("assignedTo",  "name")
      .populate("assignedTask","title status")
      .populate("clientId",    "clientId companyLegalName");

    if (!lead) return err("Lead not found", 404);
    return ok(lead);
  } catch (e) {
    console.error(e);
    return err("Failed to update lead", 500);
  }
}

// DELETE
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return err("Unauthorized", 401);

    await connectDB();
    const { id } = await params;
    const lead   = await Lead.findByIdAndDelete(id);
    if (!lead) return err("Lead not found", 404);
    return ok({ deleted: true });
  } catch { return err("Failed to delete lead", 500); }
}
