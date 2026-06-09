export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import EmployeesClient from "./EmployeesClient";
import mongoose from "mongoose";
import { Task, Lead } from "@/models";

export default async function EmployeesPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const sessionUser = session.user as any;
  const role: string = sessionUser?.role || "";

  // Only Admin and Management can view employees
  if (role !== "Admin" && role !== "Management") {
    redirect("/dashboard");
  }

  await connectDB();

  const User = mongoose.models.User;

  // Get all users
  const users = await User.find({}, "_id name email role isActive isRegistered createdAt")
    .sort({ createdAt: -1 })
    .lean();

  // For each user, get their task stats
  const userIds = users.map((u: any) => u._id);

  const [taskStats, leadStats] = await Promise.all([
    Task.aggregate([
      { $match: { assignedTo: { $in: userIds } } },
      {
        $group: {
          _id: "$assignedTo",
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] } },
          completed: { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } },
        },
      },
    ]),
    Lead.aggregate([
      { $match: { assignedTo: { $in: userIds } } },
      {
        $group: {
          _id: "$assignedTo",
          total: { $sum: 1 },
          converted: { $sum: { $cond: ["$isConverted", 1, 0] } },
        },
      },
    ]),
  ]);

  // Build stats map
  const taskMap: Record<string, any> = {};
  taskStats.forEach((t: any) => { taskMap[t._id.toString()] = t; });

  const leadMap: Record<string, any> = {};
  leadStats.forEach((l: any) => { leadMap[l._id.toString()] = l; });

  const enrichedUsers = users.map((u: any) => ({
    ...u,
    taskStats: taskMap[u._id.toString()] || { total: 0, pending: 0, inProgress: 0, completed: 0 },
    leadStats: leadMap[u._id.toString()] || { total: 0, converted: 0 },
  }));

  return (
    <EmployeesClient
      users={JSON.parse(JSON.stringify(enrichedUsers))}
      currentUserId={sessionUser.id}
      currentUserRole={role}
    />
  );
}
