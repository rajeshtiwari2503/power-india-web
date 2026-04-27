import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const cert = await Certification.findByIdAndUpdate(params.id, body, { new: true });
  if (!cert) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(cert);
}

export async function DELETE(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await Certification.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}