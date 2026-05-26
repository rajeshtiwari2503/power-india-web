 import { connectDB } from "@/lib/db";
import { Task } from "@/models";
import { NextResponse } from "next/server";
import { error, success } from "@/lib/api-response";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();

    const tasks = await Task.find()
      .sort({ dueDate: 1 })
      .populate("assignedTo", "name")
      .populate("client", "companyLegalName");

    return success(tasks);
  } catch (err) {
    return error("Failed to fetch tasks");
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();

    const body = await req.json();

    const task = await Task.create(body);

    return success(task, 201);
  } catch (err) {
    return error("Failed to create task");
  }
}