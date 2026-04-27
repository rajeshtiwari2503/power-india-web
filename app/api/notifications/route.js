import { connectDB } from "../../../lib/db";
import { Notification } from "@/models/Notification";
import { auth } from "../../../lib/auth";
import { NextResponse } from "next/server";

// GET /api/notifications — fetch user's notifications
export async function GET(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  const unreadOnly = searchParams.get("unread") === "true";

  const query = { userId: session.user.id };
  if (unreadOnly) query.isRead = false;

  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .limit(limit);

  const unreadCount = await Notification.countDocuments({ userId: session.user.id, isRead: false });

  return NextResponse.json({ notifications, unreadCount });
}

// POST /api/notifications — create notification (internal/admin use)
export async function POST(req) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const notification = await Notification.create({ ...body, userId: body.userId || session.user.id });
  return NextResponse.json(notification, { status: 201 });
}