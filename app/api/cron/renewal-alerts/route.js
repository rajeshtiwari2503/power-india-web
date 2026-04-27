import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
import { Notification } from "@/models/Notification";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// POST /api/cron/renewal-alerts
// Call this daily via Vercel Cron or external scheduler
// Add to vercel.json: { "crons": [{ "path": "/api/cron/renewal-alerts", "schedule": "0 9 * * *" }] }

export async function POST(req) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const User = mongoose.models.User;
  const now = new Date();

  // Find certs renewing in 30, 15, 7 days
  const thresholds = [30, 15, 7];
  let alertsSent = 0;

  for (const days of thresholds) {
    const targetDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const certs = await Certification.find({
      renewalDate: { $gte: startOfDay, $lte: endOfDay },
    }).populate("client", "companyLegalName").populate("assignedConsultant", "_id");

    for (const cert of certs) {
      // Get all Admin users + assigned consultant
      const admins = await User.find({ role: { $in: ["Admin", "Management"] } }, "_id");
      const userIds = [...admins.map(u => u._id.toString())];
      if (cert.assignedConsultant?._id) userIds.push(cert.assignedConsultant._id.toString());

      const uniqueUserIds = [...new Set(userIds)];

      for (const userId of uniqueUserIds) {
        // Check if already sent today
        const existing = await Notification.findOne({
          userId,
          relatedId: cert._id,
          type: "renewal",
          createdAt: { $gte: new Date(now.setHours(0, 0, 0, 0)) },
        });
        if (existing) continue;

        await Notification.create({
          userId,
          title: `🔄 Renewal Due in ${days} Days`,
          message: `${cert.client?.companyLegalName || "Client"} — ${cert.certificationType} (${cert.applicationId}) renewal on ${new Date(cert.renewalDate).toLocaleDateString("en-IN")}`,
          type: "renewal",
          link: `/certifications?highlight=${cert._id}`,
          relatedId: cert._id,
          relatedModel: "Certification",
        });
        alertsSent++;
      }
    }
  }

  // Also alert for tasks overdue
  const overdueTasks = await mongoose.models.Task?.find({
    status: { $ne: "Completed" },
    dueDate: { $lt: now },
    reminderSent: { $ne: true },
  }).populate("assignedTo", "_id").limit(50);

  for (const task of (overdueTasks || [])) {
    if (!task.assignedTo?._id) continue;
    await Notification.create({
      userId: task.assignedTo._id,
      title: "⏰ Task Overdue",
      message: `"${task.title}" was due on ${new Date(task.dueDate).toLocaleDateString("en-IN")}`,
      type: "task_due",
      link: "/tasks",
      relatedId: task._id,
      relatedModel: "Task",
    });
    await mongoose.models.Task.findByIdAndUpdate(task._id, { reminderSent: true });
    alertsSent++;
  }

  return NextResponse.json({ success: true, alertsSent });
}

// GET — manual trigger for testing (dev only)
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Dev only" }, { status: 403 });
  }
  // Simulate POST
  return POST(new Request("http://localhost/api/cron/renewal-alerts", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.CRON_SECRET || "dev"}` },
  }));
}