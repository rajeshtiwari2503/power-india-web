/**
 * PATCH  /api/users/[id]  — update role, isActive (Admin only)
 * DELETE /api/users/[id]  — delete user (Admin only)
 */

import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ok  = (data: any)          => NextResponse.json({ success: true,  data  });
const err = (msg: string, s = 400) => NextResponse.json({ success: false, error: msg }, { status: s });

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return err("Unauthorized", 401);

    const sessionUser = session.user as any;
    if (sessionUser?.role !== "Admin") return err("Forbidden – Admin only", 403);

    await connectDB();
    const { id } = await params;
    const User = mongoose.models.User;
    const body = await req.json();

    // Prevent admin removing their own role
    if (id === sessionUser.id && body.role && body.role !== "Admin") {
      return err("Cannot change your own admin role", 400);
    }

    // Only allow safe fields
    const allowed = ["name", "role", "isActive"];
    const update: any = {};
    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = body[key];
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    ).select("name email role isActive isRegistered createdAt");

    if (!user) return err("User not found", 404);
    return ok(user);
  } catch {
    return err("Failed to update user", 500);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return err("Unauthorized", 401);

    const sessionUser = session.user as any;
    if (sessionUser?.role !== "Admin") return err("Forbidden – Admin only", 403);

    await connectDB();
    const { id } = await params;
    const User = mongoose.models.User;

    if (id === sessionUser.id) return err("Cannot delete yourself", 400);

    const user = await User.findByIdAndDelete(id);
    if (!user) return err("User not found", 404);

    return ok({ deleted: true, id });
  } catch {
    return err("Failed to delete user", 500);
  }
}
