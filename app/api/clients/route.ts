import { connectDB } from "@/lib/db";
import { Client, Lead } from "@/models";
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
  companyLegalName: z.string().min(2, "Company name is required"),
  clientId: z.string().optional(),
  category: z
    .enum(["Manufacturer", "Importer", "Trader"])
    .nullable()
    .optional(),
  email: z.string().email().optional(),
  mobile: z.string().optional(),
  address: z.string().optional(),

  // Stage 5: link client back to the originating lead
  leadId: z.string().optional(),

  // Payment amount captured at Stage 5
  paymentAmount: z.number().optional(),
});

const ok = (data: any, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, error: message }, { status });

/**
 * ---------------------------
 * GET - LIST CLIENTS
 * ---------------------------
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return fail("Unauthorized", 401);

    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Math.min(Number(searchParams.get("limit") || "10"), 50);
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const query: any = { isActive: true };

    if (search) {
      query.$or = [
        { companyLegalName: { $regex: search, $options: "i" } },
        { clientId: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    const [clients, total] = await Promise.all([
      Client.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .lean(),
      Client.countDocuments(query),
    ]);

    return ok({
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
    return fail("Internal Server Error", 500);
  }
}

/**
 * ---------------------------
 * POST - CREATE CLIENT  (Stage 5)
 * ---------------------------
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return fail("Unauthorized", 401);

    await connectDB();

    const body = await req.json();

    const parsed = createClientSchema.safeParse(body);
    if (!parsed.success) {
      return fail(parsed.error.issues[0].message, 422);
    }

    const data = parsed.data;

    if (!data.clientId) {
      const count = await Client.countDocuments();
      data.clientId = `C-${new Date().getFullYear()}-${String(
        count + 1
      ).padStart(4, "0")}`;
    }

    const client = await Client.create({
      ...body,
      clientId: data.clientId,
      leadId: data.leadId || undefined,
      isActive: true,
    });

    // ── Stage 5: If this client was created from a lead,
    //    mark lead as Converted and advance to Stage 5 ──────────────────────
    if (data.leadId) {
      await Lead.findByIdAndUpdate(data.leadId, {
        $set: {
          stage: 5,
          status: "Converted",
          isConverted: true,
          clientId: client._id,
        },
      });
    }

    return ok(client, 201);
  } catch (err) {
    console.error("POST_CLIENT_ERROR:", err);
    return fail("Failed to create client", 500);
  }
}
