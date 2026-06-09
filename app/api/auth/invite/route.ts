/**
 * POST /api/auth/invite
 * Admin sends an invite to a new employee.
 * Creates the user (inactive, no password) and emails an invite link.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import { auth } from "@/lib/auth";
import crypto from "crypto";
import { sendInviteEmail } from "@/lib/email";

const ok  = (data: any, s = 200) => NextResponse.json({ success: true, data }, { status: s });
const err = (msg: string, s = 400) => NextResponse.json({ success: false, error: msg }, { status: s });

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return err("Unauthorized", 401);

    const sessionUser = session.user as any;
    if (sessionUser?.role !== "Admin") return err("Only Admins can send invites", 403);

    await connectDB();

    const { name, email, role } = await req.json();

    if (!name || !email) return err("Name and email are required", 400);

    const existing = await User.findOne({ email: email.toLowerCase() }).select("+inviteToken");

    if (existing) {
      if (existing.isActive && (existing as any).isRegistered) {
        return err("A user with this email already exists and is active", 400);
      }
      // Re-send invite if user was created but not yet registered
    }

    // Generate a secure random token (URL-safe)
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiry = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours

    let user;
    if (existing) {
      // Update existing unregistered user
      await User.findByIdAndUpdate(existing._id, {
        $set: {
          name,
          role: role || "Sales",
          inviteToken: tokenHash,
          inviteExpiry: expiry,
          isActive: false,
          isRegistered: false,
        },
      });
      user = existing;
    } else {
      // Create new placeholder user (password will be set on register)
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password: crypto.randomBytes(16).toString("hex"), // placeholder
        role:  role || "Sales",
        isActive:     false,
        isRegistered: false,
        inviteToken:  tokenHash,
        inviteExpiry: expiry,
      });
    }

    // Send invite email
    try {
      await sendInviteEmail({ to: email, name, role: role || "Sales", token: rawToken });
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
      // Return token in response so admin can share manually
      return ok({
        message: "User created but email failed. Share this invite link manually.",
        inviteUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/register?token=${rawToken}`,
        emailError: true,
      });
    }

    return ok({ message: `Invite sent to ${email}` }, 201);
  } catch (e) {
    console.error(e);
    return err("Failed to send invite", 500);
  }
}
