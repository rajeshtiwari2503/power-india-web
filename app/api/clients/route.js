import { connectDB } from "@/lib/db";
import { Client } from "@/models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const clients = await Client.find({ isActive: true }).sort({ createdAt: -1 });
  return NextResponse.json(clients);
}

export async function POST(req) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const client = await Client.create(body);
  return NextResponse.json(client, { status: 201 });
}