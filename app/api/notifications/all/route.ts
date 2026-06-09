// import { connectDB } from "@/lib/db";
// import { Notification } from "@/models/Notification";
// import { auth } from "@/lib/auth";
// import { NextResponse } from "next/server";

// export const runtime = "nodejs";

// export async function PATCH() {
//   try {
//     const session = await auth();
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     await Notification.updateMany(
//       { userId: session.user.id, isRead: false },
//       { $set: { isRead: true } }
//     );

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { connectDB } from "@/lib/db";
 
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Notification } from "@/models";

export const runtime = "nodejs";

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function PATCH() {
  try {
    const session = await auth();

    const user = session?.user as SessionUser;

    if (!user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    await Notification.updateMany(
      {
        userId: user.id,
        isRead: false,
      },
      {
        $set: { isRead: true },
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("MARK_ALL_NOTIFICATIONS_ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}