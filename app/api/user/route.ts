 import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { error, success } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();

    const User = mongoose.models.User;

    const users = await User.find(
      {},
      "name email role isActive createdAt"
    ).sort({ createdAt: -1 });

    return success(users);
  } catch (err) {
    return error("Failed to fetch users");
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const User = mongoose.models.User;

    const body = await req.json();
    const { name, email, password, role } = body;

    // Validation
    if (!name || !email || !password) {
      return error("Name, email and password are required", 400);
    }

    // Check duplicate user
    const existing = await User.findOne({ email });

    if (existing) {
      return error("User already exists", 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Sales",
    });

    return success(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      201
    );
  } catch (err) {
    return error("Failed to create user");
  }
}