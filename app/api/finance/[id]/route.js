import { connectDB } from "@/lib/db";
import { Invoice } from "@/models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

// PATCH /api/finance/[id] — update payment status / paid amount
export async function PATCH(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  // Auto-calculate paymentStatus from paidAmount
  const invoice = await Invoice.findById(params.id);
  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  const paidAmount = body.paidAmount !== undefined ? Number(body.paidAmount) : invoice.paidAmount;
  const totalAmount = invoice.totalAmount;

  let paymentStatus = invoice.paymentStatus;
  if (body.paidAmount !== undefined) {
    if (paidAmount >= totalAmount) paymentStatus = "Paid";
    else if (paidAmount > 0) paymentStatus = "Partial";
    else paymentStatus = "Pending";
  }

  const updated = await Invoice.findByIdAndUpdate(
    params.id,
    { ...body, paidAmount, paymentStatus },
    { new: true }
  ).populate("client", "companyLegalName");

  return NextResponse.json(updated);
}

// DELETE /api/finance/[id]
export async function DELETE(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await Invoice.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}