// import { connectDB } from "@/lib/db";
// import { Notification } from "@/models/Notification";
// import { auth } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";

// type Params = {
//   params: { id: string };
// };

// // PATCH
// export async function PATCH(req: NextRequest, { params }: Params) {
//   try {
//     const session = await auth();
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     const updated = await Notification.findOneAndUpdate(
//       { _id: params.id, userId: session.user.id },
//       { $set: { isRead: true } },
//       { new: true }
//     ).lean();

//     if (!updated) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, notification: updated });
//   } catch (error) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// // DELETE
// export async function DELETE(req: NextRequest, { params }: Params) {
//   try {
//     const session = await auth();
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     const deleted = await Notification.findOneAndDelete({
//       _id: params.id,
//       userId: session.user.id,
//     }).lean();

//     if (!deleted) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true });
//   } catch {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
 

import { connectDB } from "@/lib/db";
 
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { Notification } from "@/models";

type Params = {
  params: Promise<{ id: string }>;
};

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

// PATCH
export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
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

    const { id } = await params;

    const updated = await Notification.findOneAndUpdate(
      {
        _id: id,
        userId: user.id,
      },
      {
        $set: { isRead: true },
      },
      {
        new: true,
      }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      notification: updated,
    });
  } catch (error) {
    console.error("PATCH_NOTIFICATION_ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
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

    const { id } = await params;

    const deleted = await Notification.findOneAndDelete({
      _id: id,
      userId: user.id,
    }).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE_NOTIFICATION_ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}