import { connectDB } from "@/lib/db";
import { Invoice } from "@/models";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// PATCH /api/finance/[id]
export async function PATCH(req, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const body = await req.json();

  const invoice = await Invoice.findById(id);
  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  const paidAmount = body.paidAmount !== undefined ? Number(body.paidAmount) : invoice.paidAmount;
  const totalAmount = invoice.totalAmount;

  let paymentStatus;
  if (paidAmount >= totalAmount) paymentStatus = "Paid";
  else if (paidAmount > 0) paymentStatus = "Partial";
  else paymentStatus = "Pending";

  const updated = await Invoice.findByIdAndUpdate(
    id,
    { ...body, paidAmount, paymentStatus },
    { new: true, runValidators: true }
  ).populate("client", "companyLegalName clientId");

  return NextResponse.json({ success: true, data: updated });
}

// DELETE /api/finance/[id]
export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await params;

  const deleted = await Invoice.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
