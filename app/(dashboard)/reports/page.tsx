export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Lead, Client, Certification, Invoice } from "@/models";
import ReportsClient from "./ReportsClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getReportData() {
  await connectDB();
  const now = new Date();

  const months = Array.from({ length: 6 }).map((_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      label: date.toLocaleString("en-IN", { month: "short", year: "2-digit" }),
      start: date,
      end: new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59),
    };
  });

  const [monthlyLeads, monthlyRevenue, certsByType, certsByStage,
    leadsBySource, leadsByPriority, topClients, paymentSummary, renewalSoon,
    totalLeads, convertedLeads] = await Promise.all([
    Promise.all(months.map(async (m) => ({
      month: m.label,
      total: await Lead.countDocuments({ createdAt: { $gte: m.start, $lte: m.end } }),
      converted: await Lead.countDocuments({ createdAt: { $gte: m.start, $lte: m.end }, status: "Converted" }),
      lost: await Lead.countDocuments({ createdAt: { $gte: m.start, $lte: m.end }, status: "Lost" }),
    }))),

    Promise.all(months.map(async (m) => {
      const res = await Invoice.aggregate([
        { $match: { createdAt: { $gte: m.start, $lte: m.end } } },
        { $group: { _id: null, revenue: { $sum: "$paidAmount" }, invoiced: { $sum: "$totalAmount" } } },
      ]);
      return { month: m.label, revenue: res[0]?.revenue || 0, invoiced: res[0]?.invoiced || 0 };
    })),

    Certification.aggregate([{ $group: { _id: "$certificationType", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Certification.aggregate([{ $group: { _id: "$currentStage", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Lead.aggregate([{ $group: { _id: "$source", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Lead.aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }]),

    Certification.aggregate([
      { $group: { _id: "$client", certCount: { $sum: 1 } } },
      { $sort: { certCount: -1 } }, { $limit: 5 },
      { $lookup: { from: "clients", localField: "_id", foreignField: "_id", as: "client" } },
      { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
      { $project: { name: "$client.companyLegalName", certCount: 1 } },
    ]),

    Invoice.aggregate([{ $group: { _id: "$paymentStatus", count: { $sum: 1 }, amount: { $sum: "$totalAmount" } } }]),

    Certification.find({
      renewalDate: { $gte: now, $lte: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000) },
    }).populate("client", "companyLegalName").sort({ renewalDate: 1 }).limit(10).lean(),

    Lead.countDocuments(),
    Lead.countDocuments({ status: "Converted" }),
  ]);

  return {
    monthlyLeads, monthlyRevenue, certsByType, certsByStage,
    leadsBySource, leadsByPriority, topClients, paymentSummary,
    renewalSoon: JSON.parse(JSON.stringify(renewalSoon)),
    conversionRate: totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0",
    totals: {
      leads: totalLeads,
      clients: await Client.countDocuments({ isActive: true }),
      certs: await Certification.countDocuments(),
      revenue: monthlyRevenue.reduce((s, m) => s + m.revenue, 0),
    },
  };
}

export default async function ReportsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const data = await getReportData();
  return <ReportsClient data={JSON.parse(JSON.stringify(data))} />;
}
