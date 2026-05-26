 import { connectDB } from "@/lib/db";
import { Client } from "@/models";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";

/**
 * ---------------------------
 * VALIDATION SCHEMA (POST)
 * ---------------------------
 */
const createClientSchema = z.object({
  companyLegalName: z.string().min(2),
  clientId: z.string().optional(),
  category: z.string().optional(),
  email: z.string().email().optional(),
  mobile: z.string().optional(),
  address: z.string().optional(),
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
 * GET - LIST CLIENTS
 * (pagination + search + active filter)
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

    const query: any = {
      isActive: true,
    };

    // 🔍 search filter
    if (search) {
      query.$or = [
        { companyLegalName: { $regex: search, $options: "i" } },
        { clientId: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    const [clients, total] = await Promise.all([
      Client.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v"),

      Client.countDocuments(query),
    ]);

    return success({
      clients,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET_CLIENTS_ERROR:", err);
    return error("Internal Server Error", 500);
  }
}

/**
 * ---------------------------
 * POST - CREATE CLIENT
 * ---------------------------
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();

    const body = await req.json();

    // Validate input
    const parsed = createClientSchema.safeParse(body);

    if (!parsed.success) {
      return error(parsed.error.issues[0].message, 422);
    }

    const data = parsed.data;

    // Optional: auto generate clientId if not provided
    if (!data.clientId) {
      const count = await Client.countDocuments();
      data.clientId = `C-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
    }

    const client = await Client.create({
      ...data,
      isActive: true,
    });

    return success(client, 201);
  } catch (err) {
    console.error("POST_CLIENT_ERROR:", err);
    return error("Failed to create client", 500);
  }
}