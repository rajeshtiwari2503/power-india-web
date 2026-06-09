/**
 * GET  /api/users  — list all users (Admin/Management only)
 * POST /api/users  — direct create (Admin only, for seed/testing)
 *                    For real employee signup use POST /api/auth/invite
 */

import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ok  = (data: any, s = 200) => NextResponse.json({ success: true,  data  }, { status: s });
const err = (msg: string, s = 400) => NextResponse.json({ success: false, error: msg }, { status: s });

function isAdminOrMgmt(session: any) {
  const role = session?.user?.role;
  return role === "Admin" || role === "Management";
}

export async function GET() {
  try {
    const session = await auth();
    if (!session)              return err("Unauthorized", 401);
    if (!isAdminOrMgmt(session)) return err("Forbidden", 403);

    await connectDB();
    const User = mongoose.models.User;

    const users = await User.find(
      {},
      "name email role isActive isRegistered createdAt"
    ).sort({ createdAt: -1 }).lean();

    return ok(users);
  } catch {
    return err("Failed to fetch users", 500);
  }
}
