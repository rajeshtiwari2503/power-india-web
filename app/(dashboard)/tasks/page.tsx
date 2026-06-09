export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Task } from "@/models";
import TasksClient from "./TasksClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TasksPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const sessionUser = session.user as any;
  const role: string = sessionUser?.role || "";
  const userId: string = sessionUser?.id || "";

  await connectDB();

  // Employees (Sales, Documentation) only see tasks assigned to them
  // Admin, Management, Accounts see all tasks
  const isEmployee = role === "Sales" || role === "Documentation";

  const query = isEmployee ? { assignedTo: userId } : {};

  const tasks = await Task.find(query)
    .sort({ dueDate: 1 })
    .populate("assignedTo", "name")
    .populate("client", "companyLegalName")
    .populate("lead", "leadId companyName stage status")
    .lean();

  return (
    <TasksClient
      tasks={JSON.parse(JSON.stringify(tasks))}
      currentUserRole={role}
      currentUserId={userId}
    />
  );
}
