 export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Task } from "@/models";
import TasksClient from "./TasksClient";

export default async function TasksPage() {
  await connectDB();

  const tasks = await Task.find()
    .sort({ dueDate: 1 })
    .populate("assignedTo", "name")
    .populate("client", "companyLegalName")
    .lean();

  return (
    <TasksClient tasks={JSON.parse(JSON.stringify(tasks))} />
  );
}