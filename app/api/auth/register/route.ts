/**
 * POST /api/auth/register
 * Employee completes registration by setting their password via invite token.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const ok  = (data: any, s = 200) => NextResponse.json({ success: true, data }, { status: s });
const err = (msg: string, s = 400) => NextResponse.json({ success: false, error: msg }, { status: s });

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { token, password, confirmPassword } = await req.json();

    if (!token)           return err("Token is required");
    if (!password)        return err("Password is required");
    if (password.length < 8) return err("Password must be at least 8 characters");
    if (password !== confirmPassword) return err("Passwords do not match");

    // Validate strength
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    if (!hasUpper || !hasLower || !hasDigit) {
      return err("Password must contain uppercase, lowercase, and a number");
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const now = new Date();

    const user = await User.findOne({
      inviteToken:  tokenHash,
      inviteExpiry: { $gt: now },
    }).select("+inviteToken +inviteExpiry");

    if (!user) {
      return err("Invite link is invalid or has expired. Please ask your Admin to resend.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(user._id, {
      $set: {
        password:     hashedPassword,
        isActive:     true,
        isRegistered: true,
      },
      $unset: {
        inviteToken:  "",
        inviteExpiry: "",
      },
    });

    return ok({ message: "Account activated! You can now sign in." });
  } catch (e) {
    console.error(e);
    return err("Registration failed", 500);
  }
}
