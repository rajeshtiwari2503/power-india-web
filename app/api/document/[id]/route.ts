import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";

/**
 * VALIDATION
 */
const addDocSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
});

const deleteDocSchema = z.object({
  docUrl: z.string().url(),
});

/**
 * HELPERS
 */
const success = (data: any, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

const error = (message: string, status = 400) =>
  NextResponse.json({ success: false, error: message }, { status });

/**
 * POST /api/documents/:id
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return error("Invalid certification ID", 400);
    }

    const body = await req.json();

    const parsed = addDocSchema.safeParse(body);

    if (!parsed.success) {
      return error(parsed.error.issues[0].message, 422);
    }

    const { name, url } = parsed.data;

    const existing = await Certification.findOne({
      _id: id,
      "documents.url": url,
    });

    if (existing) {
      return error("Document already exists", 409);
    }

    const cert = await Certification.findByIdAndUpdate(
      id,
      {
        $push: {
          documents: {
            name,
            url,
            uploadedAt: new Date(),
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!cert) {
      return error("Certification not found", 404);
    }

    return success(cert);
  } catch (err) {
    console.error("DOC_ADD_ERROR:", err);
    return error("Internal server error", 500);
  }
}

/**
 * DELETE /api/documents/:id
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

    const body = await req.json();

    const parsed = deleteDocSchema.safeParse(body);

    if (!parsed.success) {
      return error(parsed.error.issues[0].message, 422);
    }

    const { docUrl } = parsed.data;

    const cert = await Certification.findByIdAndUpdate(
      id,
      {
        $pull: {
          documents: { url: docUrl },
        },
      },
      { new: true }
    );

    if (!cert) {
      return error("Certification not found", 404);
    }

    return success(cert);
  } catch (err) {
    console.error("DOC_DELETE_ERROR:", err);
    return error("Internal server error", 500);
  }
}