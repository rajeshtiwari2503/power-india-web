import { connectDB } from "@/lib/db";
import { Lead } from "../../../models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const leads = await Lead.find().sort({ createdAt: -1 }).populate("assignedTo", "name");
  return NextResponse.json(leads);
}

export async function POST(req) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const lead = await Lead.create(body);
  return NextResponse.json(lead, { status: 201 });
}