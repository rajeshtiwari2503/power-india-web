// GET /api/user  — returns list of active users (for dropdowns: assign task, etc.)
// SECURED: must be logged in

import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { error, success } from "@/lib/api-response";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();
    const User = mongoose.models.User;

    const users = await User.find(
      { isActive: true },
      "name email role isActive createdAt"
    ).sort({ name: 1 });

    return success(users);
  } catch (err) {
    return error("Failed to fetch users");
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);
    if ((session.user as any)?.role !== "Admin") return error("Forbidden", 403);

    await connectDB();
    const User = mongoose.models.User;

    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return error("Name, email and password are required", 400);
    }

    const existing = await User.findOne({ email });
    if (existing) return error("User already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Sales",
    });

    return success({ id: user._id, name: user.name, email: user.email, role: user.role }, 201);
  } catch (err) {
    return error("Failed to create user");
  }
}
