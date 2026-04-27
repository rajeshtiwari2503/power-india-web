import { connectDB } from "@/lib/db";
import { Lead } from "../../../../models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const lead = await Lead.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(lead);
}

export async function DELETE(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  await Lead.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}