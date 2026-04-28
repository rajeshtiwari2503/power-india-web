
export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/db";
import { Invoice } from "@/models";
import FinanceClient from "./FinanceClient";

export default async function FinancePage() {
  await connectDB();
  const invoices = await Invoice.find()
    .sort({ createdAt: -1 })
    .populate("client", "companyLegalName")
    .lean();

  const stats = await Invoice.aggregate([
    {
      $group: {
        _id: "$paymentStatus",
        total: { $sum: "$totalAmount" },
        paid: { $sum: "$paidAmount" },
        count: { $sum: 1 },
      },
    },
  ]);

  return (
    <FinanceClient
      invoices={JSON.parse(JSON.stringify(invoices))}
      stats={JSON.parse(JSON.stringify(stats))}
    />
  );
}