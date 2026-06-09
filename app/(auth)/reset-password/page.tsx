"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function getStrength(pwd: string) {
  let score = 0;
  if (pwd.length >= 8)          score++;
  if (pwd.length >= 12)         score++;
  if (/[A-Z]/.test(pwd))       score++;
  if (/[0-9]/.test(pwd))       score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = [
    { label: "Very weak",  color: "#ef4444" },
    { label: "Weak",       color: "#f97316" },
    { label: "Fair",       color: "#eab308" },
    { label: "Strong",     color: "#22c55e" },
    { label: "Very strong",color: "#10b981" },
  ];
  return { score, ...map[Math.min(score, 4)] };
}

function Check({ ok }: { ok: boolean }) {
  return <span style={{ color: ok ? "#22c55e" : "#94a3b8", fontSize: 13 }}>{ok ? "✓" : "○"}</span>;
}

function ResetPasswordForm() {
  const params  = useSearchParams();
  const router  = useRouter();
  const token   = params.get("token") || "";

  const [userInfo,    setUserInfo]    = useState<{ name: string; email: string } | null>(null);
  const [tokenState,  setTokenState]  = useState<"loading" | "valid" | "invalid">("loading");
  const [tokenError,  setTokenError]  = useState("");

  const [password,    setPassword]    = useState("");
  const [confirm,     setConfirm]     = useState("");
  const [showPwd,     setShowPwd]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [submitting,  setSubmitting]  = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [error,       setError]       = useState("");

  useEffect(() => {
    if (!token) {
      setTokenState("invalid");
      setTokenError("No reset token found. Please use the link from your email.");
      return;
    }
    fetch(`/api/auth/verify-token?token=${token}&type=reset`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) { setUserInfo(data.data); setTokenState("valid"); }
        else { setTokenState("invalid"); setTokenError(data.error || "Invalid or expired reset link."); }
      })
      .catch(() => { setTokenState("invalid"); setTokenError("Verification failed. Please try again."); });
  }, [token]);

  const strength = getStrength(password);
  const rules = [
    { label: "At least 8 characters",       ok: password.length >= 8 },
    { label: "One uppercase letter (A–Z)",  ok: /[A-Z]/.test(password) },
    { label: "One lowercase letter (a–z)",  ok: /[a-z]/.test(password) },
    { label: "One number (0–9)",            ok: /[0-9]/.test(password) },
    { label: "Passwords match",             ok: confirm.length > 0 && password === confirm },
  ];
  const allRulesMet = rules.every((r) => r.ok);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRulesMet) return;
    setSubmitting(true);
    setError("");

    const res  = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, confirmPassword: confirm }),
    });
    const data = await res.json();

    if (data.success) { setSuccess(true); }
    else { setError(data.error || "Reset failed. Please try again."); }
    setSubmitting(false);
  };

  // ── Loading ─────────────────────────────────────────────────
  if (tokenState === "loading") {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Verifying reset link…</p>
        </div>
      </div>
    );
  }

  // ── Invalid token ────────────────────────────────────────────
  if (tokenState === "invalid") {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl"
            style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}>⏰</div>
          <h1 className="text-white text-2xl font-bold mb-3">Link Expired</h1>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">{tokenError}</p>
          <div className="space-y-3">
            <Link href="/forgot-password"
              className="block w-full py-3 rounded-xl text-sm font-bold text-white text-center"
              style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>
              Request New Reset Link
            </Link>
            <Link href="/login" className="block text-slate-500 text-sm hover:text-slate-300 transition-colors">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Success ──────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="h-1" style={{ background: "linear-gradient(90deg,#22c55e,#10b981)" }} />
            <div className="p-10 text-center">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}>🔓</div>
              <h2 className="text-white text-2xl font-bold mb-3">Password Reset!</h2>
              <p className="text-slate-400 text-sm mb-2 leading-relaxed">
                Your password has been updated successfully.
              </p>
              <p className="text-slate-500 text-xs mb-8">
                A confirmation email has been sent to <strong className="text-slate-400">{userInfo?.email}</strong>.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", boxShadow: "0 4px 20px rgba(249,115,22,0.35)" }}>
                Sign In Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Reset Form ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050c1a] flex overflow-hidden">

      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#3b82f6 0%,transparent 70%)" }} />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#f97316 0%,transparent 70%)" }} />

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg"
              style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>P</div>
            <div>
              <div className="text-white font-bold">Power India Services</div>
              <div className="text-slate-500 text-xs tracking-widest uppercase">CRM Platform</div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}>
            <div className="h-1" style={{ background: "linear-gradient(90deg,#3b82f6,#8b5cf6)" }} />

            <div className="p-8">

              {/* Header */}
              <div className="mb-7 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                  style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}>🔒</div>
                <h2 className="text-white text-xl font-bold mb-1">Set New Password</h2>
                {userInfo && (
                  <p className="text-slate-500 text-xs">
                    For <span className="text-slate-300">{userInfo.email}</span>
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* New password */}
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest block mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full pl-4 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)"; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs">{showPwd ? "Hide" : "Show"}</button>
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

                {/* Confirm */}
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest block mb-2">Confirm Password</label>
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
                        border: confirm && password !== confirm ? "1px solid rgba(239,68,68,0.5)"
                          : confirm && password === confirm ? "1px solid rgba(34,197,94,0.5)"
                          : "1px solid rgba(255,255,255,0.1)"
                      }}
                      onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)"; }}
                      onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; }}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs">{showConfirm ? "Hide" : "Show"}</button>
                  </div>
                </div>

                {/* Rules */}
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
                  <div className="flex items-start gap-2 p-3 rounded-xl text-sm text-red-300"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <span>⚠</span><span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !allRulesMet}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all"
                  style={{
                    background: allRulesMet && !submitting ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "rgba(255,255,255,0.1)",
                    boxShadow: allRulesMet && !submitting ? "0 4px 20px rgba(59,130,246,0.35)" : "none",
                    cursor: allRulesMet && !submitting ? "pointer" : "not-allowed",
                  }}>
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      Resetting password…
                    </span>
                  ) : "Reset Password →"}
                </button>
              </form>

              <div className="mt-6 text-center space-y-2">
                <Link href="/forgot-password" className="block text-slate-500 text-xs hover:text-slate-300 transition-colors">
                  Request a new reset link
                </Link>
                <Link href="/login" className="block text-slate-500 text-xs hover:text-slate-300 transition-colors">
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
