"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// ── password strength helper ─────────────────────────────────
function getStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { score, label: "Very weak",  color: "#ef4444" };
  if (score === 2) return { score, label: "Weak",       color: "#f97316" };
  if (score === 3) return { score, label: "Fair",       color: "#eab308" };
  if (score === 4) return { score, label: "Strong",     color: "#22c55e" };
  return              { score, label: "Very strong", color: "#10b981" };
}

const ROLE_COLORS: Record<string, string> = {
  Admin:         "#ef4444",
  Sales:         "#3b82f6",
  Documentation: "#22c55e",
  Accounts:      "#eab308",
  Management:    "#8b5cf6",
};

// ── check mark icon ──────────────────────────────────────────
function Check({ ok }: { ok: boolean }) {
  return (
    <span style={{ color: ok ? "#22c55e" : "#94a3b8", fontSize: 13 }}>
      {ok ? "✓" : "○"}
    </span>
  );
}

// ── Main register form ───────────────────────────────────────
function RegisterForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token  = params.get("token") || "";

  const [userInfo, setUserInfo]   = useState<{ name: string; email: string; role: string } | null>(null);
  const [tokenState, setTokenState] = useState<"loading" | "valid" | "invalid">("loading");
  const [tokenError, setTokenError] = useState("");

  const [password,    setPassword]    = useState("");
  const [confirm,     setConfirm]     = useState("");
  const [showPwd,     setShowPwd]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [error,      setError]      = useState("");

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setTokenState("invalid");
      setTokenError("No invite token found. Please use the link from your invitation email.");
      return;
    }

    fetch(`/api/auth/verify-token?token=${token}&type=invite`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setUserInfo(data.data);
          setTokenState("valid");
        } else {
          setTokenState("invalid");
          setTokenError(data.error || "Invalid invite link.");
        }
      })
      .catch(() => {
        setTokenState("invalid");
        setTokenError("Could not verify your invite link. Please try again.");
      });
  }, [token]);

  const strength = getStrength(password);

  const rules = [
    { label: "At least 8 characters",        ok: password.length >= 8 },
    { label: "One uppercase letter (A–Z)",   ok: /[A-Z]/.test(password) },
    { label: "One lowercase letter (a–z)",   ok: /[a-z]/.test(password) },
    { label: "One number (0–9)",             ok: /[0-9]/.test(password) },
    { label: "Passwords match",              ok: confirm.length > 0 && password === confirm },
  ];

  const allRulesMet = rules.every((r) => r.ok);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRulesMet) return;
    setSubmitting(true);
    setError("");

    const res  = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, confirmPassword: confirm }),
    });
    const data = await res.json();

    if (data.success) {
      setSuccess(true);
    } else {
      setError(data.error || "Registration failed.");
    }
    setSubmitting(false);
  };

  // ── Loading ─────────────────────────────────────────────────
  if (tokenState === "loading") {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Verifying your invite link…</p>
        </div>
      </div>
    );
  }

  // ── Invalid token ────────────────────────────────────────────
  if (tokenState === "invalid") {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="text-6xl mb-6">🔗</div>
          <h1 className="text-white text-2xl font-bold mb-3">Invite Link Invalid</h1>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">{tokenError}</p>
          <Link href="/login"
            className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
            ← Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  // ── Success ──────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="h-1" style={{ background: "linear-gradient(90deg,#22c55e,#10b981)" }} />
            <div className="p-10 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
                style={{ background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.3)" }}>
                🎉
              </div>
              <h2 className="text-white text-2xl font-bold mb-3">Account Activated!</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Welcome, <strong className="text-white">{userInfo?.name}</strong>!
                Your account is ready. Sign in to access your dashboard.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
                Sign In Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Registration Form ────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050c1a] flex overflow-hidden">

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#f97316 0%,transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#3b82f6 0%,transparent 70%)" }} />

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg"
              style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>P</div>
            <div>
              <div className="text-white font-bold">Power India Services</div>
              <div className="text-slate-500 text-xs tracking-widest uppercase">CRM Platform</div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
            }}>
            <div className="h-1" style={{ background: "linear-gradient(90deg,#f97316,#3b82f6,#8b5cf6)" }} />

            <div className="p-8">

              {/* Welcome section */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">👋</span>
                  <h2 className="text-white text-xl font-bold">Welcome, {userInfo?.name?.split(" ")[0]}!</h2>
                </div>

                {/* User info card */}
                <div className="rounded-xl p-4 mb-2"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Signing up as</p>
                      <p className="text-white font-semibold text-sm">{userInfo?.email}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{
                        background: `${ROLE_COLORS[userInfo?.role || "Sales"]}20`,
                        color: ROLE_COLORS[userInfo?.role || "Sales"],
                        border: `1px solid ${ROLE_COLORS[userInfo?.role || "Sales"]}40`,
                      }}>
                      {userInfo?.role}
                    </span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs">Set a strong password to activate your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Password */}
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full pl-4 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.15)"; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs">
                      {showPwd ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1,2,3,4,5].map((i) => (
                          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                            style={{ background: i <= strength.score ? strength.color : "rgba(255,255,255,0.1)" }} />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: strength.color }}>{strength.label}</p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full pl-4 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: confirm && password !== confirm
                          ? "1px solid rgba(239,68,68,0.5)"
                          : confirm && password === confirm
                          ? "1px solid rgba(34,197,94,0.5)"
                          : "1px solid rgba(255,255,255,0.1)"
                      }}
                      onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.15)"; }}
                      onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; }}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs">
                      {showConfirm ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Rules checklist */}
                <div className="rounded-xl p-4 space-y-2"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  {rules.map((r) => (
                    <div key={r.label} className="flex items-center gap-2.5 text-xs">
                      <Check ok={r.ok} />
                      <span style={{ color: r.ok ? "#e2e8f0" : "#64748b" }}>{r.label}</span>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl text-sm text-red-300"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    ⚠ {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !allRulesMet}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all"
                  style={{
                    background: allRulesMet && !submitting
                      ? "linear-gradient(135deg,#f97316,#ea580c)"
                      : "rgba(255,255,255,0.1)",
                    boxShadow: allRulesMet && !submitting ? "0 4px 20px rgba(249,115,22,0.35)" : "none",
                    cursor: allRulesMet && !submitting ? "pointer" : "not-allowed",
                  }}>
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      Activating account…
                    </span>
                  ) : "Activate Account →"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-slate-500 text-xs hover:text-slate-300 transition-colors">
                  ← Back to Sign In
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-600 text-xs mt-6">
            Power India Services CRM © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
