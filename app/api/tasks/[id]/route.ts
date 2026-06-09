import { connectDB } from "@/lib/db";
import { Task, Lead } from "@/models";
import { error, success } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

// GET single task
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();
    const { id } = await params;

    const task = await Task.findById(id)
      .populate("assignedTo", "name role")
      .populate("client", "companyLegalName clientId")
      .populate("lead", "leadId companyName stage status");

    if (!task) return error("Task not found", 404);

    // Employees can only see their own tasks
    const sessionUser = session.user as any;
    const role = sessionUser?.role;
    const userId = sessionUser?.id;
    const isEmployee = role === "Sales" || role === "Documentation";

    if (isEmployee && task.assignedTo?._id?.toString() !== userId) {
      return error("Forbidden", 403);
    }

    return success(task);
  } catch {
    return error("Failed to fetch task");
  }
}

// PATCH — update task
// Employees can update status of their own tasks
// Admin/Management can update anything
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const sessionUser = session.user as any;
    const role = sessionUser?.role as string;
    const userId = sessionUser?.id as string;
    const isEmployee = role === "Sales" || role === "Documentation";

    // Employees can only update their own tasks and only the status field
    if (isEmployee) {
      const task = await Task.findById(id);
      if (!task) return error("Task not found", 404);

      if (task.assignedTo?.toString() !== userId) {
        return error("Forbidden – you can only update your own tasks", 403);
      }

      // Employees may only change status and notes
      const allowedFields = ["status", "notes"];
      const filteredBody: any = {};
      for (const key of allowedFields) {
        if (body[key] !== undefined) filteredBody[key] = body[key];
      }

      // If task completed, also advance lead Stage 3 → Stage 4
      if (filteredBody.status === "Completed" && task.lead) {
        await Lead.findByIdAndUpdate(task.lead, {
          $set: { stage: 4, status: "Contacted" },
        });
      } else if (filteredBody.status === "In Progress" && task.lead) {
        await Lead.findByIdAndUpdate(task.lead, {
          $set: { stage: 3, status: "In Progress" },
        });
      }

      const updated = await Task.findByIdAndUpdate(id, { $set: filteredBody }, { new: true, runValidators: true })
        .populate("assignedTo", "name")
        .populate("lead", "leadId companyName stage status");

      return success(updated);
    }

    // Admin / Management / Accounts — full update
    const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate("assignedTo", "name")
      .populate("client", "companyLegalName")
      .populate("lead", "leadId companyName stage status");

    if (!task) return error("Task not found", 404);

    return success(task);
  } catch {
    return error("Failed to update task");
  }
}

// DELETE — Admin only
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    const sessionUser = session.user as any;
    if (sessionUser?.role !== "Admin") return error("Forbidden", 403);

    await connectDB();
    const { id } = await params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) return error("Task not found", 404);

    return success({ deleted: true });
  } catch {
    return error("Failed to delete task");
  }
}
