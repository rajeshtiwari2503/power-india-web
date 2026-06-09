 
export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Lead } from "@/models";
import LeadsClient from "./LeadsClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

export default async function LeadsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const sessionUser = session.user as any;
  const role: string = sessionUser?.role || "";
  const userId: string = sessionUser?.id || "";

  await connectDB();

  // Employees only see leads assigned to them
  const isEmployee = role === "Sales" || role === "Documentation";
  const query = isEmployee ? { assignedTo: userId } : {};

  const leads = await Lead.find(query)
    .sort({ createdAt: -1 })
    .populate("assignedTo", "name")
    .populate("assignedTask", "title status")
    .populate("clientId", "clientId companyLegalName")
    .lean();

  // Fetch users list for "Assign Task" dropdown
  const User = mongoose.models.User;
  const users = await User.find({ isActive: true }, "_id name role")
    .sort({ name: 1 })
    .lean();

  return (
    <LeadsClient
      leads={JSON.parse(JSON.stringify(leads))}
      users={JSON.parse(JSON.stringify(users))}
      currentUserRole={role}
    />
  );
}
