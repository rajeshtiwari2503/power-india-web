export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Lead, Client, Certification, Task, Invoice } from "@/models";
import DashboardClient from "./DashboardClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getAdminStats() {
  await connectDB();
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalLeads, leadsThisMonth, activeClients, activeCertifications,
    pendingTasks, overdueTasks, revenueAgg, pendingInvoices,
    upcomingRenewals, recentLeads, certificationsByStage,
  ] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Client.countDocuments({ isActive: true }),
    Certification.countDocuments({ currentStage: { $nin: ["Certificate Granted", "Closed"] } }),
    Task.countDocuments({ status: "Pending" }),
    Task.countDocuments({ status: "Pending", dueDate: { $lt: now } }),
    Invoice.aggregate([{ $group: { _id: null, total: { $sum: "$paidAmount" } } }]),
    Invoice.countDocuments({ paymentStatus: { $in: ["Pending", "Partial"] } }),
    Certification.countDocuments({ renewalDate: { $gte: now, $lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) } }),
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
    Certification.aggregate([{ $group: { _id: "$currentStage", count: { $sum: 1 } } }]),
  ]);

  return {
    totalLeads, leadsThisMonth, activeClients, activeCertifications,
    pendingTasks, overdueTasks,
    totalRevenue: revenueAgg?.[0]?.total || 0,
    pendingInvoices, upcomingRenewals,
    recentLeads: JSON.parse(JSON.stringify(recentLeads)),
    certificationsByStage: JSON.parse(JSON.stringify(certificationsByStage)),
  };
}

async function getEmployeeStats(userId: string) {
  await connectDB();
  const now = new Date();

  const [
    myTasks, myPendingTasks, myOverdueTasks,
    myCompletedTasks, myLeads, recentMyTasks,
  ] = await Promise.all([
    Task.countDocuments({ assignedTo: userId }),
    Task.countDocuments({ assignedTo: userId, status: "Pending" }),
    Task.countDocuments({ assignedTo: userId, status: { $ne: "Completed" }, dueDate: { $lt: now } }),
    Task.countDocuments({ assignedTo: userId, status: "Completed" }),
    Lead.countDocuments({ assignedTo: userId }),
    Task.find({ assignedTo: userId, status: { $ne: "Completed" } })
      .sort({ dueDate: 1 })
      .limit(5)
      .populate("lead", "leadId companyName")
      .lean(),
  ]);

  return {
    myTasks, myPendingTasks, myOverdueTasks, myCompletedTasks, myLeads,
    recentMyTasks: JSON.parse(JSON.stringify(recentMyTasks)),
  };
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const sessionUser = session.user as any;
  const role: string = sessionUser?.role || "";
  const userId: string = sessionUser?.id || "";
  const name: string = sessionUser?.name || "";

  const isEmployee = role === "Sales" || role === "Documentation";

  if (isEmployee) {
    const stats = await getEmployeeStats(userId);
    return (
      <DashboardClient
        stats={null}
        employeeStats={stats}
        role={role}
        userName={name}
      />
    );
  }

  const stats = await getAdminStats();
  return (
    <DashboardClient
      stats={stats}
      employeeStats={null}
      role={role}
      userName={name}
    />
  );
}
