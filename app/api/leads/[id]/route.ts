//  import { connectDB } from "@/lib/db";
// import { Lead } from "@/models";
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/lib/auth";

// type Params = {
//   params: {
//     id: string;
//   };
// };

// // PATCH - Update Lead
// export async function PATCH(req: NextRequest, { params }: Params) {
//   try {
//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     const body = await req.json();

//     const lead = await Lead.findByIdAndUpdate(
//       params.id,
//       { $set: body },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!lead) {
//       return NextResponse.json(
//         { success: false, error: "Lead not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: lead,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: "Failed to update lead" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE - Remove Lead
// export async function DELETE(req: NextRequest, { params }: Params) {
//   try {
//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     const lead = await Lead.findByIdAndDelete(params.id);

//     if (!lead) {
//       return NextResponse.json(
//         { success: false, error: "Lead not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Lead deleted successfully",
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: "Failed to delete lead" },
//       { status: 500 }
//     );
//   }
// }


import { connectDB } from "@/lib/db";
import { Lead } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// PATCH - Update Lead
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const lead = await Lead.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

// DELETE - Remove Lead
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}