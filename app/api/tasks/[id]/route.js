import { connectDB } from "@/lib/db";
import { Task } from "@/models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const task = await Task.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(task);
}