import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const ok  = (data: any, s = 200) => NextResponse.json({ success: true, data }, { status: s });
const err = (msg: string, s = 400) => NextResponse.json({ success: false, error: msg }, { status: s });

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return err("Unauthorized", 401);
    await connectDB();
    const { id } = await params;
    const cert = await Certification.findById(id)
      .populate("client", "companyLegalName clientId")
      .populate("assignedConsultant", "name");
    if (!cert) return err("Not found", 404);
    return ok(cert);
  } catch { return err("Failed", 500); }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return err("Unauthorized", 401);
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // Auto-calculate progressPercent from stage if not provided
    const STAGE_PROGRESS: Record<string, number> = {
      "Documents Pending": 8, "Application Preparation": 20,
      "Application Filed": 35, "Query Raised": 45,
      "Testing in Progress": 58, "Factory Audit": 70,
      "Approval Under Process": 82, "Certificate Granted": 100, "Closed": 100,
    };

    if (body.currentStage && !body.progressPercent) {
      body.progressPercent = STAGE_PROGRESS[body.currentStage] || 0;
    }

    const cert = await Certification.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })
      .populate("client", "companyLegalName clientId")
      .populate("assignedConsultant", "name");
    if (!cert) return err("Not found", 404);
    return ok(cert);
  } catch { return err("Failed to update", 500); }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return err("Unauthorized", 401);
    const sessionUser = session.user as any;
    if (sessionUser?.role !== "Admin") return err("Forbidden", 403);
    await connectDB();
    const { id } = await params;
    const cert = await Certification.findByIdAndDelete(id);
    if (!cert) return err("Not found", 404);
    return ok({ deleted: true });
  } catch { return err("Failed to delete", 500); }
}
