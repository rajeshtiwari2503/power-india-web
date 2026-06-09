export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Invoice, Client } from "@/models";
import FinanceClient from "./FinanceClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

export default async function FinancePage() {
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();

  const [invoices, statsRaw, clients] = await Promise.all([
    Invoice.find()
      .sort({ createdAt: -1 })
      .populate("client", "companyLegalName clientId")
      .lean(),

    Invoice.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          total: { $sum: "$totalAmount" },
          paid: { $sum: "$paidAmount" },
          count: { $sum: 1 },
        },
      },
    ]),

    Client.find({ isActive: true }, "_id companyLegalName clientId")
      .sort({ companyLegalName: 1 })
      .lean(),
  ]);

  // Build summary object
  const summary = { Paid: 0, Pending: 0, Partial: 0, totalRevenue: 0, totalPaid: 0 };
  statsRaw.forEach((s: any) => {
    summary[s._id as keyof typeof summary] = s.count;
    summary.totalRevenue += s.total;
    summary.totalPaid    += s.paid;
  });

  return (
    <FinanceClient
      invoices={JSON.parse(JSON.stringify(invoices))}
      clients={JSON.parse(JSON.stringify(clients))}
      summary={summary}
    />
  );
}
