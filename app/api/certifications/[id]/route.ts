//  import { connectDB } from "@/lib/db";
// import { Certification } from "@/models";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { z } from "zod";
// import mongoose from "mongoose";

// /**
//  * ---------------------------
//  * ZOD VALIDATION SCHEMA
//  * ---------------------------
//  */
// const updateCertificationSchema = z.object({
//   currentStage: z.string().optional(),
//   status: z.enum(["Active", "Inactive", "Completed"]).optional(),
//   renewalDate: z.string().optional(),
//   notes: z.string().optional(),
// });

// /**
//  * ---------------------------
//  * SAFE RESPONSE HELPERS
//  * ---------------------------
//  */
// const success = (data: any, status = 200) =>
//   NextResponse.json({ success: true, data }, { status });

// const error = (message: string, status = 400) =>
//   NextResponse.json({ success: false, error: message }, { status });

// /**
//  * ---------------------------
//  * PATCH - UPDATE CERTIFICATION
//  * ---------------------------
//  */
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();

//     const { id } = params;

//     // Validate Mongo ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return error("Invalid certification ID", 400);
//     }

//     // Parse body
//     const body = await req.json();

//     // Validate input
//     const parsed = updateCertificationSchema.safeParse(body);

//     if (!parsed.success) {
//       return error(parsed.error.issues[0].message, 422);
//     }

//     // 🔐 (Optional) AUTH CHECK PLACEHOLDER
//     // const session = await auth();
//     // if (!session || session.user.role !== "admin") {
//     //   return error("Unauthorized", 401);
//     // }

//     const updated = await Certification.findByIdAndUpdate(
//       id,
//       { $set: parsed.data },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updated) {
//       return error("Certification not found", 404);
//     }

//     return success(updated);
//   } catch (err) {
//     console.error("PATCH_CERT_ERROR:", err);
//     return error("Internal server error", 500);
//   }
// }

// /**
//  * ---------------------------
//  * DELETE - REMOVE CERTIFICATION
//  * ---------------------------
//  */
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();

//     const { id } = params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return error("Invalid certification ID", 400);
//     }

//     // 🔐 AUTH CHECK (optional)
//     // const session = await auth();
//     // if (!session || session.user.role !== "admin") {
//     //   return error("Unauthorized", 401);
//     // }

//     const deleted = await Certification.findByIdAndDelete(id);

//     if (!deleted) {
//       return error("Certification not found", 404);
//     }

//     return success({ deletedId: id });
//   } catch (err) {
//     console.error("DELETE_CERT_ERROR:", err);
//     return error("Internal server error", 500);
//   }
// }

import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";

/**
 * ---------------------------
 * ZOD VALIDATION SCHEMA
 * ---------------------------
 */
const updateCertificationSchema = z.object({
  currentStage: z.string().optional(),
  status: z.enum(["Active", "Inactive", "Completed"]).optional(),
  renewalDate: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * ---------------------------
 * SAFE RESPONSE HELPERS
 * ---------------------------
 */
const success = (data: any, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

const error = (message: string, status = 400) =>
  NextResponse.json({ success: false, error: message }, { status });

/**
 * ---------------------------
 * PATCH - UPDATE CERTIFICATION
 * ---------------------------
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate Mongo ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return error("Invalid certification ID", 400);
    }

    // Parse body
    const body = await req.json();

    // Validate input
    const parsed = updateCertificationSchema.safeParse(body);

    if (!parsed.success) {
      return error(parsed.error.issues[0].message, 422);
    }

    const updated = await Certification.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return error("Certification not found", 404);
    }

    return success(updated);
  } catch (err) {
    console.error("PATCH_CERT_ERROR:", err);
    return error("Internal server error", 500);
  }
}

/**
 * ---------------------------
 * DELETE - REMOVE CERTIFICATION
 * ---------------------------
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return error("Invalid certification ID", 400);
    }

    const deleted = await Certification.findByIdAndDelete(id);

    if (!deleted) {
      return error("Certification not found", 404);
    }

    return success({ deletedId: id });
  } catch (err) {
    console.error("DELETE_CERT_ERROR:", err);
    return error("Internal server error", 500);
  }
}