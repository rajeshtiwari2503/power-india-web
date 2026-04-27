import { connectDB } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const User = mongoose.models.User;
  const body = await req.json();

  // Prevent self-deactivation or self-role-change to non-admin
  if (params.id === session.user.id && body.role && body.role !== "Admin") {
    return NextResponse.json({ error: "Cannot change your own admin role" }, { status: 400 });
  }

  const user = await User.findByIdAndUpdate(params.id, body, { new: true });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ success: true, user });
}

export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (params.id === session.user.id) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  }

  await connectDB();
  const User = mongoose.models.User;
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}