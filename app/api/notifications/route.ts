//  import { connectDB } from "@/lib/db";
// import { Notification } from "@/models/Notification";
// import { auth } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";

// export const runtime = "nodejs";

// // 📥 GET notifications
// export async function GET(req: NextRequest) {
//   try {
//     const session = await auth();

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const limit = Math.min(
//       parseInt(searchParams.get("limit") || "20"),
//       100
//     );

//     const unreadOnly = searchParams.get("unread") === "true";

//     const query: any = {
//       userId: session.user.id,
//     };

//     if (unreadOnly) {
//       query.isRead = false;
//     }

//     const [notifications, unreadCount] = await Promise.all([
//       Notification.find(query)
//         .sort({ createdAt: -1 })
//         .limit(limit)
//         .lean(),

//       Notification.countDocuments({
//         userId: session.user.id,
//         isRead: false,
//       }),
//     ]);

//     return NextResponse.json({
//       success: true,
//       notifications,
//       unreadCount,
//     });
//   } catch (error) {
//     console.error("NOTIFICATION GET ERROR:", error);

//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// // 📤 CREATE notification
// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();

//     const session = await auth();

//     const body = await req.json();

//     const notification = await Notification.create({
//       ...body,
//       userId: body.userId || session?.user?.id,
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         notification,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("NOTIFICATION POST ERROR:", error);

//     return NextResponse.json(
//       { error: "Failed to create notification" },
//       { status: 500 }
//     );
//   }
// }


import { connectDB } from "@/lib/db";
import { Notification } from "@/models";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

// 📥 GET notifications
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);

    const limit = Math.min(
      parseInt(searchParams.get("limit") || "20"),
      100
    );

    const unreadOnly =
      searchParams.get("unread") === "true";

    const query: any = {
      userId: user.id,
    };

    if (unreadOnly) {
      query.isRead = false;
    }

    const [notifications, unreadCount] =
      await Promise.all([
        Notification.find(query)
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean(),

        Notification.countDocuments({
          userId: user.id,
          isRead: false,
        }),
      ]);

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error(
      "NOTIFICATION GET ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 📤 CREATE notification
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    const user = session?.user as SessionUser;

    const body = await req.json();

    const notification = await Notification.create({
      ...body,
      userId: body.userId || user?.id,
    });

    return NextResponse.json(
      {
        success: true,
        notification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "NOTIFICATION POST ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}