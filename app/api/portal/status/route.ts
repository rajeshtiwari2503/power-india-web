import { connectDB } from "@/lib/db";
import { Client, Certification } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { error } from "@/lib/api-response";

export const runtime = "nodejs";

/* ─────────────────────────────────────────────────────
   In-memory rate limiter (per IP, no Redis dependency)
   Max 5 attempts per 10 minutes per IP.
   For production, swap with @upstash/ratelimit + Redis.
───────────────────────────────────────────────────── */
const ratemap = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS    = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now  = Date.now();
  const entry = ratemap.get(ip);

  if (!entry || now > entry.resetAt) {
    ratemap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= MAX_ATTEMPTS) return false; // blocked

  entry.count += 1;
  return true;
}

export async function GET(req: NextRequest) {
  // 🔒 Rate limiting — brute-force protection
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again after 10 minutes." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId")?.trim();
    const mobile   = searchParams.get("mobile")?.trim();

    if (!clientId || !mobile) {
      return error("Client ID and mobile number are required", 400);
    }

    // Mobile must be exactly 10 digits
    if (!/^\d{10}$/.test(mobile)) {
      return error("Mobile number must be 10 digits", 400);
    }

    await connectDB();

    const client = await Client.findOne({ clientId, mobile }).lean() as any;

    if (!client) {
      // Generic message — don't reveal which field is wrong
      return error(
        "No client found with these details. Please check your Client ID and mobile number.",
        404
      );
    }

    const certifications = await Certification.find(
      { client: client._id },
      `applicationId certificationType productName modelNo
       currentStage renewalDate approvalDate applicationDate`
    )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      client: {
        clientId:         client.clientId,
        companyLegalName: client.companyLegalName,
        category:         client.category,
        servicesTaken:    client.servicesTaken,
      },
      certifications,
    });
  } catch (err) {
    console.error("PORTAL STATUS ERROR:", err);
    return error("Internal Server Error", 500);
  }
}
