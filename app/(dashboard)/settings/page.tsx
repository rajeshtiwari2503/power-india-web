 export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";
import "@/models";
import mongoose from "mongoose";

/* ---------------- TYPES ---------------- */

type SessionUser = {
  name?: string | null;
  email?: string | null;
  role?: string;
};

type UserDoc = {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
};

export default async function SettingsPage() {
  const session = await auth();

  /* ---------------- AUTH CHECK ---------------- */
  if (!session) redirect("/login");

  const user = session.user as SessionUser;

  if (user?.role !== "Admin") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <div className="text-5xl mb-4">🔒</div>

        <h2 className="text-xl font-extrabold text-slate-900">
          Access Restricted
        </h2>

        <p className="text-slate-500 mt-2">
          Only Admins can access Settings.
        </p>
      </div>
    );
  }

  /* ---------------- DB ---------------- */
  await connectDB();

  const User = mongoose.models.User;

  const users: UserDoc[] = await User.find(
    {},
    "name email role isActive createdAt"
  )
    .sort({ createdAt: -1 })
    .lean();

  return (
    <SettingsClient
      users={JSON.parse(JSON.stringify(users))}
      currentUser={user}
    />
  );
}