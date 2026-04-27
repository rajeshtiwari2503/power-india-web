 "use client"
 import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";
import "@/models";
import mongoose from "mongoose";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  if (session.user?.role !== "Admin") {
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>Access Restricted</h2>
        <p style={{ color: "#64748b", marginTop: 8 }}>Only Admins can access Settings.</p>
      </div>
    );
  }

  await connectDB();
  const User = mongoose.models.User;
  const users = await User.find({}, "name email role isActive createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <SettingsClient
      users={JSON.parse(JSON.stringify(users))}
      currentUser={session.user}
    />
  );
}