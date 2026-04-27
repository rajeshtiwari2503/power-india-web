 // app/api/seed/route.js

import { NextResponse } from "next/server";
 
import User from "../../../models/User";        // adjust path
import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/db";

export async function GET(req) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Only available in development" },
      { status: 403 }
    );
  }

  await connectDB();

  const hashedPassword = await bcrypt.hash("admin123", 12);

  const existingUser = await User.findOne({
    email: "admin@powerindiaservices.com",
  });

  if (existingUser) {
    return NextResponse.json({ message: "Admin user already exists" });
  }

  const user = await User.create({
    name: "Admin User",
    email: "admin@powerindiaservices.com",
    password: hashedPassword,
    role: "Admin",
  });

  return NextResponse.json({
    message: "Admin user created",
    email: user.email,
  });
}