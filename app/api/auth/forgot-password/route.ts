/**
 * POST /api/auth/forgot-password
 * Takes an email, generates a reset token, stores hashed version, sends email.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

// Always return success-looking message to prevent email enumeration
const always = (msg = "If that email exists, a reset link has been sent.") =>
  NextResponse.json({ success: true, message: msg });

const err = (msg: string, s = 400) =>
  NextResponse.json({ success: false, error: msg }, { status: s });

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();
    if (!email) return err("Email is required");

    const user = await User.findOne({
      email: email.toLowerCase(),
      isActive: true,
    }).select("+resetToken +resetExpiry");

    // Return same response whether user exists or not (security)
    if (!user) return always();

    // Rate limit: don't allow more than 1 reset per 5 min
    if ((user as any).resetExpiry && (user as any).resetExpiry > new Date(Date.now() - 5 * 60 * 1000)) {
      return err("Please wait 5 minutes before requesting another reset link.", 429);
    }

    const rawToken  = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiry    = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await User.findByIdAndUpdate(user._id, {
      $set: {
        resetToken:  tokenHash,
        resetExpiry: expiry,
      },
    });

    try {
      await sendPasswordResetEmail({ to: user.email, name: user.name, token: rawToken });
    } catch (emailErr) {
      console.error("Reset email failed:", emailErr);
      // Still return success to avoid leaking info
    }

    return always();
  } catch (e) {
    console.error(e);
    return err("Something went wrong", 500);
  }
}
