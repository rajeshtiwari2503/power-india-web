 import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

function requireAdmin(session: any) {
  return session?.user?.role === "Admin";
}

type Params = {
  params: Promise<{ id: string }>;
};

// PATCH
export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!requireAdmin(session)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await connectDB();

    const User = mongoose.models.User;

    const { id } = await params;

    const body = await req.json();

    // Prevent changing your own role away from Admin
    if (
      String(id) === String((session.user as any)?.id) &&
      body?.role &&
      body.role !== "Admin"
    ) {
      return NextResponse.json(
        { error: "Cannot change your own admin role" },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-password")
      .lean();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  _: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!requireAdmin(session)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Prevent deleting yourself
    if (String(id) === String((session.user as any)?.id)) {
      return NextResponse.json(
        { error: "Cannot delete yourself" },
        { status: 400 }
      );
    }

    await connectDB();

    const User = mongoose.models.User;

    const deleted = await User.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}