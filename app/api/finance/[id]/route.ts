import { connectDB } from "@/lib/db";
import { Invoice } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { success, error } from "@/lib/api-response";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/finance/[id]
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return error("Unauthorized", 401);

  await connectDB();
  const { id } = await params;
  const body: Record<string, any> = await req.json();

  const invoice = await Invoice.findById(id);
  if (!invoice) return error("Invoice not found", 404);

  const paidAmount =
    body.paidAmount !== undefined ? Number(body.paidAmount) : invoice.paidAmount;
  const totalAmount = invoice.totalAmount as number;

  let paymentStatus: "Paid" | "Partial" | "Pending";
  if (paidAmount >= totalAmount)      paymentStatus = "Paid";
  else if (paidAmount > 0)            paymentStatus = "Partial";
  else                                paymentStatus = "Pending";

  const updated = await Invoice.findByIdAndUpdate(
    id,
    { ...body, paidAmount, paymentStatus },
    { new: true, runValidators: true }
  ).populate("client", "companyLegalName clientId");

  return success(updated);
}

// DELETE /api/finance/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return error("Unauthorized", 401);

  const role = (session.user as any)?.role;
  if (!["Admin", "Accounts"].includes(role))
    return error("Only Admin or Accounts can delete invoices", 403);

  await connectDB();
  const { id } = await params;

  const deleted = await Invoice.findByIdAndDelete(id);
  if (!deleted) return error("Invoice not found", 404);

  return success({ deleted: true });
}
