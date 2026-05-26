import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function requireAdmin(session: any) {
  return session?.user?.role === "Admin";
}

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!requireAdmin(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await connectDB();
    const User = mongoose.models.User;

    const users = await User.find({}, "name email role isActive createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: users });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!requireAdmin(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await connectDB();
    const User = mongoose.models.User;

    const body = await req.json();
    const { name, email, password, role } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(String(password), 12);
    const user = await User.create({
      name,
      email: String(email).toLowerCase(),
      password: hashedPassword,
      role: role || "Sales",
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        data: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

