import { connectDB } from "@/lib/db";
import { Notification } from "@/models";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/api-response";

export const runtime = "nodejs";

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string;
};

// GET /api/notifications
export async function GET(req: NextRequest) {
  const session = await auth();
  const user = session?.user as SessionUser;
  if (!user?.id) return error("Unauthorized", 401);

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const limit      = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const unreadOnly = searchParams.get("unread") === "true";

    const query: any = { userId: user.id };
    if (unreadOnly) query.isRead = false;

    const [notifications, unreadCount] = await Promise.all([
      Notification.find(query).sort({ createdAt: -1 }).limit(limit).lean(),
      Notification.countDocuments({ userId: user.id, isRead: false }),
    ]);

    return success({ notifications, unreadCount });
  } catch (err) {
    console.error("NOTIFICATION GET ERROR:", err);
    return error("Internal Server Error", 500);
  }
}

// POST /api/notifications
export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user as SessionUser;
  if (!user?.id) return error("Unauthorized", 401);

  try {
    await connectDB();
    const body = await req.json();

    const notification = await Notification.create({
      ...body,
      userId: body.userId || user.id,
    });

    return NextResponse.json({ success: true, notification }, { status: 201 });
  } catch (err) {
    console.error("NOTIFICATION POST ERROR:", err);
    return error("Failed to create notification", 500);
  }
}
