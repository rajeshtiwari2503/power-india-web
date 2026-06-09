/**
 * Email helper using Nodemailer
 *
 * Required .env.local variables:
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=587
 *   SMTP_USER=your@gmail.com
 *   SMTP_PASS=your-app-password
 *   SMTP_FROM="Power India CRM <your@gmail.com>"
 *   NEXT_PUBLIC_APP_URL=https://yourdomain.com
 */

import nodemailer from "nodemailer";

function createTransport() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST || "smtp.gmail.com",
    port:   Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const FROM = process.env.SMTP_FROM || "Power India CRM <noreply@powerindia.com>";
const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// ── Shared email shell ──────────────────────────────────────
function htmlShell(title: string, body: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;padding:20px;">

    <!-- Logo bar -->
    <div style="background:#050c1a;border-radius:16px 16px 0 0;padding:28px 32px;display:flex;align-items:center;gap:12px;">
      <div style="width:40px;height:40px;background:linear-gradient(135deg,#f97316,#ea580c);border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:18px;">P</div>
      <div>
        <div style="color:#fff;font-weight:700;font-size:15px;">Power India Services</div>
        <div style="color:#64748b;font-size:11px;letter-spacing:1px;text-transform:uppercase;">CRM Platform</div>
      </div>
    </div>

    <!-- Content -->
    <div style="background:#fff;padding:36px 32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
      ${body}
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
      <p style="margin:0;color:#94a3b8;font-size:12px;">
        Power India Services © ${new Date().getFullYear()} · This is an automated email, please do not reply.
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ── 1. Invite Email ─────────────────────────────────────────
export async function sendInviteEmail({
  to, name, role, token,
}: {
  to: string; name: string; role: string; token: string;
}) {
  const link = `${BASE}/register?token=${token}`;

  const body = `
    <h2 style="margin:0 0 8px;color:#0f172a;font-size:22px;font-weight:800;">You're invited! 🎉</h2>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">
      Hi <strong>${name}</strong>, an admin has created your account on <strong>Power India Services CRM</strong>
      with the role of <strong>${role}</strong>.
    </p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Your login email</p>
      <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">${to}</p>
    </div>

    <p style="margin:0 0 20px;color:#475569;font-size:14px;">
      Click the button below to set your password and activate your account.
      This link expires in <strong>48 hours</strong>.
    </p>

    <div style="text-align:center;margin:32px 0;">
      <a href="${link}" style="display:inline-block;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;font-weight:700;font-size:15px;padding:14px 36px;border-radius:12px;text-decoration:none;letter-spacing:0.3px;">
        Activate Account →
      </a>
    </div>

    <p style="margin:24px 0 0;color:#94a3b8;font-size:12px;text-align:center;">
      Or copy this link: <a href="${link}" style="color:#3b82f6;">${link}</a>
    </p>`;

  const transporter = createTransport();
  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Your Power India CRM Invitation",
    html: htmlShell("Invitation", body),
  });
}

// ── 2. Forgot Password Email ────────────────────────────────
export async function sendPasswordResetEmail({
  to, name, token,
}: {
  to: string; name: string; token: string;
}) {
  const link = `${BASE}/reset-password?token=${token}`;

  const body = `
    <h2 style="margin:0 0 8px;color:#0f172a;font-size:22px;font-weight:800;">Reset your password 🔑</h2>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">
      Hi <strong>${name}</strong>, we received a request to reset your password.
      Click the button below to create a new one.
    </p>

    <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0;color:#92400e;font-size:13px;">
        ⚠️ This link will expire in <strong>1 hour</strong>. If you didn't request this, you can safely ignore this email.
      </p>
    </div>

    <div style="text-align:center;margin:32px 0;">
      <a href="${link}" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;font-weight:700;font-size:15px;padding:14px 36px;border-radius:12px;text-decoration:none;letter-spacing:0.3px;">
        Reset Password →
      </a>
    </div>

    <p style="margin:24px 0 0;color:#94a3b8;font-size:12px;text-align:center;">
      Or copy: <a href="${link}" style="color:#3b82f6;">${link}</a>
    </p>`;

  const transporter = createTransport();
  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Reset your Power India CRM password",
    html: htmlShell("Password Reset", body),
  });
}

// ── 3. Password Changed Confirmation ───────────────────────
export async function sendPasswordChangedEmail({ to, name }: { to: string; name: string }) {
  const body = `
    <h2 style="margin:0 0 8px;color:#0f172a;font-size:22px;font-weight:800;">Password changed ✅</h2>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">
      Hi <strong>${name}</strong>, your password was successfully changed.
    </p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0;color:#166534;font-size:13px;">
        If you didn't make this change, please contact your Admin immediately.
      </p>
    </div>
    <div style="text-align:center;margin:28px 0;">
      <a href="${BASE}/login" style="display:inline-block;background:#0f172a;color:#fff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;text-decoration:none;">
        Sign In →
      </a>
    </div>`;

  const transporter = createTransport();
  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Your password was changed",
    html: htmlShell("Password Changed", body),
  });
}
