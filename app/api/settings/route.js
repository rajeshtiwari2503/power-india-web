import { connectDB } from "@/lib/db";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function GET() {
  // const session = await auth();
  // if (!session || session.user.role !== "Admin") {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  await connectDB();
  const User = mongoose.models.User;
  const users = await User.find({}, "name email role isActive createdAt");
  return NextResponse.json(users);
}

export async function POST(req) {
  // const session = await auth();
  // if (!session || session.user.role !== "Admin") {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  await connectDB();
  const User = mongoose.models.User;
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed, role: role || "Sales" });

  return NextResponse.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
}