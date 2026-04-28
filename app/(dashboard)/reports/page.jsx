export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/db";
import { Lead, Client, Certification, Invoice } from "@/models";
import ReportsClient from "./ReportsClient";

async function getReportData() {
  await connectDB();
  const now = new Date();

  // Last 6 months labels
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { label: d.toLocaleString("en-IN", { month: "short", year: "2-digit" }), start: d, end: new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59) };
  });

  // Monthly leads
  const monthlyLeads = await Promise.all(months.map(async m => ({
    month: m.label,
    total: await Lead.countDocuments({ createdAt: { $gte: m.start, $lte: m.end } }),
    converted: await Lead.countDocuments({ createdAt: { $gte: m.start, $lte: m.end }, status: "Converted" }),
    lost: await Lead.countDocuments({ createdAt: { $gte: m.start, $lte: m.end }, status: "Lost" }),
  })));

  // Monthly revenue
  const monthlyRevenue = await Promise.all(months.map(async m => {
    const agg = await Invoice.aggregate([
      { $match: { createdAt: { $gte: m.start, $lte: m.end } } },
      { $group: { _id: null, revenue: { $sum: "$paidAmount" }, invoiced: { $sum: "$totalAmount" } } },
    ]);
    return { month: m.label, revenue: agg[0]?.revenue || 0, invoiced: agg[0]?.invoiced || 0 };
  }));

  // Certifications by type
  const certsByType = await Certification.aggregate([
    { $group: { _id: "$certificationType", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Certification stage distribution
  const certsByStage = await Certification.aggregate([
    { $group: { _id: "$currentStage", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Lead source distribution
  const leadsBySource = await Lead.aggregate([
    { $group: { _id: "$source", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Lead priority distribution
  const leadsByPriority = await Lead.aggregate([
    { $group: { _id: "$priority", count: { $sum: 1 } } },
  ]);

  // Top clients by certifications
  const topClients = await Certification.aggregate([
    { $group: { _id: "$client", certCount: { $sum: 1 } } },
    { $sort: { certCount: -1 } },
    { $limit: 5 },
    { $lookup: { from: "clients", localField: "_id", foreignField: "_id", as: "client" } },
    { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
    { $project: { name: "$client.companyLegalName", certCount: 1 } },
  ]);

  // Conversion rate
  const totalLeads = await Lead.countDocuments();
  const convertedLeads = await Lead.countDocuments({ status: "Converted" });
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  // Payment status summary
  const paymentSummary = await Invoice.aggregate([
    { $group: { _id: "$paymentStatus", count: { $sum: 1 }, amount: { $sum: "$totalAmount" } } },
  ]);

  // Upcoming renewals next 90 days
  const renewalSoon = await Certification.find({
    renewalDate: { $gte: now, $lte: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000) },
  }).populate("client", "companyLegalName").sort({ renewalDate: 1 }).limit(10).lean();

  return {
    monthlyLeads, monthlyRevenue, certsByType, certsByStage,
    leadsBySource, leadsByPriority, topClients, conversionRate,
    paymentSummary, renewalSoon: JSON.parse(JSON.stringify(renewalSoon)),
    totals: {
      leads: totalLeads, clients: await Client.countDocuments({ isActive: true }),
      certs: await Certification.countDocuments(),
      revenue: monthlyRevenue.reduce((s, m) => s + m.revenue, 0),
    },
  };
}

export default async function ReportsPage() {
  const data = await getReportData();
  return <ReportsClient data={JSON.parse(JSON.stringify(data))} />;
}