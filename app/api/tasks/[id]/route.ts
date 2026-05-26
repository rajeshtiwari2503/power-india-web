 import { connectDB } from "@/lib/db";
import { Task } from "@/models";
import { NextResponse } from "next/server";
import { error, success } from "@/lib/api-response";
import { auth } from "@/lib/auth";

type Params = {
  params: {
    id: string;
  };
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();

    const body = await req.json();

    const task = await Task.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
        runValidators: true, // important for safety
      }
    )
      .populate("assignedTo", "name")
      .populate("client", "companyLegalName");

    if (!task) {
      return error("Task not found", 404);
    }

    return success(task);
  } catch (err) {
    return error("Failed to update task");
  }
}