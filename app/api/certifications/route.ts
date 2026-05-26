 import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import { auth } from "@/lib/auth";

/**
 * ---------------------------
 * VALIDATION SCHEMA (POST)
 * ---------------------------
 */
const createCertificationSchema = z.object({
  // clientId: z.string().min(1),
  certificationType: z.string().min(1),
  productName: z.string().optional(),
  modelNo: z.string().optional(),
  assignedConsultant: z.string().optional(),
  currentStage: z.string().optional(),
});

/**
 * ---------------------------
 * RESPONSE HELPERS
 * ---------------------------
 */
const success = (data: any, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

const error = (message: string, status = 400) =>
  NextResponse.json({ success: false, error: message }, { status });

/**
 * ---------------------------
 * GET - CERTIFICATIONS LIST
 * (with pagination + search)
 * ---------------------------
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const query: any = {};

    // 🔍 Search filter
    if (search) {
      query.$or = [
        { certificationType: { $regex: search, $options: "i" } },
        { productName: { $regex: search, $options: "i" } },
        { applicationId: { $regex: search, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      Certification.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("client", "companyLegalName clientId")
        .populate("assignedConsultant", "name")
        .select("-__v"),

      Certification.countDocuments(query),
    ]);

    return success({
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET_CERT_ERROR:", err);
    return error("Internal Server Error", 500);
  }
}

/**
 * ---------------------------
 * POST - CREATE CERTIFICATION
 * ---------------------------
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();

    const body = await req.json();

    const parsed = createCertificationSchema.safeParse(body);
    if (!parsed.success) {
      return error(parsed.error.issues[0].message, 422);
    }

    // NOTE: frontend sends `clientId` as a string; model expects `client` ObjectId.
    const clientId = (body as any)?.clientId;
    if (!clientId || !mongoose.Types.ObjectId.isValid(String(clientId))) {
      return error("Invalid clientId", 400);
    }

    const cert = await Certification.create({
      ...parsed.data,
      ...body,
      client: clientId,
    });

    return success(cert, 201);
  } catch (err) {
    console.error("POST_CERT_ERROR:", err);
    return error("Failed to create certification", 500);
  }
}