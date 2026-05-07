 import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const runtime = "nodejs"; // important for bcrypt + mongoose

export async function GET() {
  try {
    // 🔒 prevent accidental production access
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "Only available in development" },
        { status: 403 }
      );
    }

    await connectDB();

    const email = "admin@powerindiaservices.com";

    // ⚡ check existing admin
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "Admin user already exists",
      });
    }

    // 🔐 secure password hashing
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const user = await User.create({
      name: "Admin User",
      email,
      password: hashedPassword,
      role: "Admin",
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin user created successfully",
        data: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("SEED ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}