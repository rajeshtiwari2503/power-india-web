/**
 * POST /api/auth/reset-password
 * Validates the reset token and sets a new password.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendPasswordChangedEmail } from "@/lib/email";

const ok  = (data: any) => NextResponse.json({ success: true, data });
const err = (msg: string, s = 400) => NextResponse.json({ success: false, error: msg }, { status: s });

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { token, password, confirmPassword } = await req.json();

    if (!token)    return err("Token is required");
    if (!password) return err("Password is required");
    if (password.length < 8) return err("Password must be at least 8 characters");
    if (password !== confirmPassword) return err("Passwords do not match");

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    if (!hasUpper || !hasLower || !hasDigit) {
      return err("Password must include uppercase, lowercase, and a number");
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const now = new Date();

    const user = await User.findOne({
      resetToken:  tokenHash,
      resetExpiry: { $gt: now },
    }).select("+resetToken +resetExpiry");

    if (!user) {
      return err("Reset link is invalid or has expired. Please request a new one.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(user._id, {
      $set:   { password: hashedPassword },
      $unset: { resetToken: "", resetExpiry: "" },
    });

    // Send confirmation email (non-blocking)
    sendPasswordChangedEmail({ to: user.email, name: user.name }).catch(console.error);

    return ok({ message: "Password reset successfully. You can now sign in." });
  } catch (e) {
    console.error(e);
    return err("Reset failed", 500);
  }
}
