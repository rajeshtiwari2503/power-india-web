

import { connectDB } from "@/lib/db";
import { Notification } from "@/models/Notification";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

// PATCH /api/notifications/[id] — mark as read
export async function PATCH(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  if (params.id === "all") {
    // Mark all as read
    await Notification.updateMany({ userId: session.user.id }, { isRead: true });
    return NextResponse.json({ success: true });
  }

  const notif = await Notification.findOneAndUpdate(
    { _id: params.id, userId: session.user.id },
    { isRead: true },
    { new: true }
  );
  return NextResponse.json(notif);
}

// DELETE /api/notifications/[id]
export async function DELETE(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await Notification.findOneAndDelete({ _id: params.id, userId: session.user.id });
  return NextResponse.json({ success: true });
}