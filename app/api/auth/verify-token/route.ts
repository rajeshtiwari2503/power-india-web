/**
 * GET /api/auth/verify-token?token=xxx&type=invite|reset
 * Validates a token and returns the associated user info (name, email, role).
 * Used by the frontend before showing the form.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import crypto from "crypto";

const ok  = (data: any) => NextResponse.json({ success: true, data });
const err = (msg: string, s = 400) => NextResponse.json({ success: false, error: msg }, { status: s });

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawToken = searchParams.get("token");
    const type     = searchParams.get("type") || "invite"; // "invite" | "reset"

    if (!rawToken) return err("Token is required");

    await connectDB();

    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const now = new Date();

    let user: any;

    if (type === "invite") {
      user = await User.findOne({
        inviteToken:  tokenHash,
        inviteExpiry: { $gt: now },
      }).select("+inviteToken +inviteExpiry");
    } else {
      user = await User.findOne({
        resetToken:  tokenHash,
        resetExpiry: { $gt: now },
      }).select("+resetToken +resetExpiry");
    }

    if (!user) {
      return err(
        type === "invite"
          ? "Invite link is invalid or has expired. Please ask your Admin to resend."
          : "Reset link is invalid or has expired. Please request a new one.",
        400
      );
    }

    return ok({
      name:  user.name,
      email: user.email,
      role:  user.role,
    });
  } catch (e) {
    return err("Verification failed", 500);
  }
}
