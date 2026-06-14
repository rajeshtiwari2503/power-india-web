import { connectDB } from "@/lib/db";
import { Certification, Notification, Invoice } from "@/models";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const THRESHOLDS = [30, 15, 7]; // days before renewal/due date to alert

type PopulatedClient      = { companyLegalName?: string };
type PopulatedConsultant  = { _id?: string | mongoose.Types.ObjectId };
type CertificationDoc = {
  _id:                  mongoose.Types.ObjectId;
  client?:              mongoose.Types.ObjectId | PopulatedClient;
  assignedConsultant?:  mongoose.Types.ObjectId | PopulatedConsultant;
  certificationType?:   string;
  applicationId?:       string;
  renewalDate?:         Date | string;
};

function verifyCron(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

// POST /api/cron/renewal-alerts  (called by Vercel Cron / external scheduler)
export async function POST(req: NextRequest) {
  if (!verifyCron(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const User = mongoose.models.User;
    const now  = new Date();
    let alertsSent = 0;

    /* ── 1. CERTIFICATION RENEWAL ALERTS ──────────────────────── */
    for (const days of THRESHOLDS) {
      const target = new Date(Date.now() + days * 86400000);
      const start  = new Date(target); start.setHours(0, 0, 0, 0);
      const end    = new Date(target); end.setHours(23, 59, 59, 999);

      const certs = (await Certification.find({ renewalDate: { $gte: start, $lte: end } })
        .populate("client", "companyLegalName")
        .populate("assignedConsultant", "_id")) as CertificationDoc[];

      for (const cert of certs) {
        const admins = await User.find({ role: { $in: ["Admin", "Management"] } }, "_id");
        const userIds = new Set<string>(admins.map((u: any) => u._id.toString()));

        const consultant = cert.assignedConsultant as PopulatedConsultant;
        if (consultant?._id) userIds.add(consultant._id.toString());

        const dedupeKey   = `renewal-${cert._id}-${days}d`;
        const client      = cert.client as PopulatedClient;
        const renewalDate = cert.renewalDate ? new Date(cert.renewalDate) : new Date();

        for (const userId of userIds) {
          const exists = await Notification.findOne({ userId, dedupeKey });
          if (exists) continue;

          await Notification.create({
            userId,
            title:        `🔄 Renewal Due in ${days} Days`,
            message:      `${client?.companyLegalName || "Client"} — ${cert.certificationType || "Certification"} (${cert.applicationId || "N/A"}) renewal on ${renewalDate.toLocaleDateString("en-IN")}`,
            type:         "renewal",
            link:         `/certifications?highlight=${cert._id}`,
            relatedId:    cert._id,
            relatedModel: "Certification",
            dedupeKey,
          });
          alertsSent++;
        }
      }
    }

    /* ── 2. OVERDUE TASK ALERTS ────────────────────────────────── */
    const Task = mongoose.models.Task;
    if (Task) {
      const overdueTasks = await Task.find({
        status:       { $ne: "Completed" },
        dueDate:      { $lt: now },
        reminderSent: { $ne: true },
      }).populate("assignedTo", "_id").limit(100);

      for (const task of overdueTasks) {
        const assignedTo = task.assignedTo as PopulatedConsultant;
        if (!assignedTo?._id) continue;

        const dedupeKey = `task-${task._id}`;
        const exists    = await Notification.findOne({ dedupeKey });
        if (exists) continue;

        await Notification.create({
          userId:       assignedTo._id,
          title:        "⏰ Task Overdue",
          message:      `"${task.title}" was due on ${new Date(task.dueDate).toLocaleDateString("en-IN")}`,
          type:         "task_due",
          link:         "/tasks",
          relatedId:    task._id,
          relatedModel: "Task",
          dedupeKey,
        });

        await Task.findByIdAndUpdate(task._id, { reminderSent: true });
        alertsSent++;
      }
    }

    /* ── 3. OVERDUE PAYMENT ALERTS ─────────────────────────────── */
    const overdueInvoices = await Invoice.find({
      paymentStatus: { $in: ["Pending", "Partial"] },
      dueDate:       { $lt: now },
    }).populate("client", "companyLegalName").limit(100);

    for (const inv of overdueInvoices as any[]) {
      const admins  = await User.find({ role: { $in: ["Admin", "Accounts"] } }, "_id");
      const balance = (inv.totalAmount || 0) * 1.18 - (inv.paidAmount || 0);
      const dedupeKey = `payment-${inv._id}-overdue`;

      for (const admin of admins) {
        const exists = await Notification.findOne({ userId: admin._id.toString(), dedupeKey });
        if (exists) continue;

        await Notification.create({
          userId:       admin._id.toString(),
          title:        "💰 Payment Overdue",
          message:      `${inv.client?.companyLegalName || "Client"} — Invoice ${inv.invoiceNumber} overdue. Balance: ₹${Math.round(balance).toLocaleString("en-IN")}`,
          type:         "payment_due",
          link:         `/finance?highlight=${inv._id}`,
          relatedId:    inv._id,
          relatedModel: "Invoice",
          dedupeKey,
        });
        alertsSent++;
      }
    }

    return NextResponse.json({ success: true, alertsSent, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("CRON_ERROR:", err);
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}

// GET — dev test only
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Dev only" }, { status: 403 });
  }
  return POST(
    new Request("http://localhost/api/cron/renewal-alerts", {
      method:  "POST",
      headers: { authorization: `Bearer ${process.env.CRON_SECRET || "dev"}` },
    }) as any
  );
}
