import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const certs = await Certification.find()
    .sort({ createdAt: -1 })
    .populate("client", "companyLegalName")
    .populate("assignedConsultant", "name");
  return NextResponse.json(certs);
}

export async function POST(req) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const cert = await Certification.create({ ...body, client: body.clientId });
  return NextResponse.json(cert, { status: 201 });
}