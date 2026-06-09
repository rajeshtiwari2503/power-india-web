// /api/user/[id] — Profile endpoint
// - Employees can GET/PATCH their own profile (name, password only)
// - Admin can GET/PATCH/DELETE any user

import { connectDB } from "@/lib/db";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { error, success } from "@/lib/api-response";
import { auth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();
    const { id } = await params;
    const User = mongoose.models.User;

    const sessionUser = session.user as any;
    const role = sessionUser?.role;
    const userId = sessionUser?.id;

    // Employees can only view themselves
    if (role !== "Admin" && role !== "Management" && userId !== id) {
      return error("Forbidden", 403);
    }

    const user = await User.findById(id).select("-password");
    if (!user) return error("User not found", 404);

    return success(user);
  } catch {
    return error("Failed to fetch user");
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();
    const { id } = await params;
    const User = mongoose.models.User;
    const body = await req.json();

    const sessionUser = session.user as any;
    const role = sessionUser?.role as string;
    const userId = sessionUser?.id as string;

    const isAdmin = role === "Admin";
    const isSelf  = userId === id;

    // Employees can only patch themselves and only name/password
    if (!isAdmin && !isSelf) return error("Forbidden", 403);

    let updateData: any = {};

    if (isAdmin) {
      // Admin can update anything except password via this route
      const { password, ...rest } = body;
      updateData = rest;

      // If admin also sends a new password
      if (password) {
        updateData.password = await bcrypt.hash(password, 12);
      }

      // Prevent admin removing own admin role
      if (isSelf && body.role && body.role !== "Admin") {
        return error("Cannot change your own admin role", 400);
      }
    } else {
      // Employee: only name and password
      if (body.name)     updateData.name = body.name;
      if (body.password) updateData.password = await bcrypt.hash(body.password, 12);
    }

    const user = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })
      .select("-password");

    if (!user) return error("User not found", 404);

    return success(user);
  } catch {
    return error("Failed to update user");
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    const sessionUser = session.user as any;
    if (sessionUser?.role !== "Admin") return error("Forbidden", 403);

    await connectDB();
    const { id } = await params;
    const User = mongoose.models.User;

    if (id === sessionUser.id) return error("Cannot delete yourself", 400);

    const user = await User.findByIdAndDelete(id);
    if (!user) return error("User not found", 404);

    return success({ deleted: true });
  } catch {
    return error("Failed to delete user");
  }
}
