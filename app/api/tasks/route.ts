import { connectDB } from "@/lib/db";
import { Lead, Task } from "@/models";
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
      .populate("client", "companyLegalName")
      .populate("lead", "leadId companyName stage status");

    return success(tasks);
  } catch (err) {
    return error("Failed to fetch tasks");
  }
}

// Stage 2: Assign Task to Employee
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();

    const body = await req.json();

    const task = await Task.create(body);

    // ── If task is linked to a lead, advance lead to Stage 2 ─────────────
    if (body.lead) {
      await Lead.findByIdAndUpdate(body.lead, {
        $set: {
          assignedTask: task._id,
          assignedTo: body.assignedTo || undefined,
          stage: 2,
          status: "Assigned",
        },
      });
    }

    return success(task, 201);
  } catch (err) {
    return error("Failed to create task");
  }
}
