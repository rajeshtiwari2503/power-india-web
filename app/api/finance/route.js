import { connectDB } from "@/lib/db";
import { Invoice } from "@/models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const invoices = await Invoice.find().sort({ createdAt: -1 }).populate("client", "companyLegalName");
  return NextResponse.json(invoices);
}

export async function POST(req) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const invoice = await Invoice.create({ ...body, client: body.clientId });
  return NextResponse.json(invoice, { status: 201 });
}