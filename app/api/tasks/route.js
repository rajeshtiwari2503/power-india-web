import { auth } from "../../../lib/auth";
import { connectDB } from "@/lib/db";
import { Task } from "@/models";
 
import { NextResponse } from "next/server";

export async function GET() {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const tasks = await Task.find().sort({ dueDate: 1 })
    .populate("assignedTo", "name").populate("client", "companyLegalName");
  return NextResponse.json(tasks);
}

export async function POST(req) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const task = await Task.create(body);
  return NextResponse.json(task, { status: 201 });
}