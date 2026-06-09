export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const sessionUser = session.user as any;

  await connectDB();
  const User = mongoose.models.User;

  const user = await User.findById(sessionUser.id).select("-password").lean();
  if (!user) redirect("/login");

  return (
    <ProfileClient
      user={JSON.parse(JSON.stringify(user))}
      currentUserId={sessionUser.id}
    />
  );
}
