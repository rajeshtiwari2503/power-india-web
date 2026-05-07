 export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import {
  Lead,
  Client,
  Certification,
  Task,
  Invoice,
} from "@/models";

import DashboardClient from "./DashboardClient";

type DashboardStats = {
  totalLeads: number;
  leadsThisMonth: number;
  activeClients: number;
  activeCertifications: number;
  pendingTasks: number;
  overdueTasks: number;
  totalRevenue: number;
  pendingInvoices: number;
  upcomingRenewals: number;
  recentLeads: any[];
  certificationsByStage: any[];
};

async function getDashboardStats(): Promise<DashboardStats> {
  await connectDB();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalLeads,
    leadsThisMonth,
    activeClients,
    activeCertifications,
    pendingTasks,
    overdueTasks,
    revenueAgg,
    pendingInvoices,
    upcomingRenewals,
    recentLeads,
    certificationsByStage,
  ] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Client.countDocuments({ isActive: true }),
    Certification.countDocuments({
      currentStage: { $nin: ["Certificate Granted", "Closed"] },
    }),
    Task.countDocuments({ status: "Pending" }),
    Task.countDocuments({
      status: "Pending",
      dueDate: { $lt: now },
    }),
    Invoice.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$paidAmount" },
        },
      },
    ]),
    Invoice.countDocuments({
      paymentStatus: { $in: ["Pending", "Partial"] },
    }),
    Certification.countDocuments({
      renewalDate: {
        $gte: now,
        $lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      },
    }),
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
    Certification.aggregate([
      {
        $group: {
          _id: "$currentStage",
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  return {
    totalLeads,
    leadsThisMonth,
    activeClients,
    activeCertifications,
    pendingTasks,
    overdueTasks,
    totalRevenue: revenueAgg?.[0]?.total || 0,
    pendingInvoices,
    upcomingRenewals,
    recentLeads: JSON.parse(JSON.stringify(recentLeads)),
    certificationsByStage: JSON.parse(
      JSON.stringify(certificationsByStage)
    ),
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return <DashboardClient stats={stats} />;
}