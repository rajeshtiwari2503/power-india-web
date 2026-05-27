 import { connectDB } from "@/lib/db";
import { NextResponse, type NextRequest } from "next/server";
import mongoose from "mongoose";
import { error, success } from "@/lib/api-response";

// NOTE: uncomment when auth is ready
// import { auth } from "@/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const User = mongoose.models.User;

    const { id } = await params;

    const body = await req.json();

    // const session = await auth();

    // if (!session || session.user.role !== "Admin") {
    //   return error("Unauthorized", 401);
    // }

    // if (
    //   id === session.user.id &&
    //   body.role &&
    //   body.role !== "Admin"
    // ) {
    //   return error("Cannot change your own admin role", 400);
    // }

    const user = await User.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return error("User not found", 404);
    }

    return success(user);
  } catch (err) {
    return error("Failed to update user");
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const User = mongoose.models.User;

    const { id } = await params;

    // const session = await auth();

    // if (!session || session.user.role !== "Admin") {
    //   return error("Unauthorized", 401);
    // }

    // if (id === session.user.id) {
    //   return error("Cannot delete yourself", 400);
    // }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return error("User not found", 404);
    }

    return success({ deleted: true });
  } catch (err) {
    return error("Failed to delete user");
  }
}