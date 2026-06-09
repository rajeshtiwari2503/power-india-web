"use client";

import { useState } from "react";
import Link from "next/link";

type Stage = "form" | "sent";

export default function ForgotPasswordPage() {
  const [email,  setEmail]  = useState("");
  const [stage,  setStage]  = useState<Stage>("form");
  const [loading,setLoading]= useState(false);
  const [error,  setError]  = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res  = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setStage("sent");
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050c1a] flex overflow-hidden">

      {/* Glow orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#3b82f6 0%,transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#8b5cf6 0%,transparent 70%)" }} />

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="flex items-center gap-3 justify-center mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg"
              style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>P</div>
            <div>
              <div className="text-white font-bold leading-tight">Power India Services</div>
              <div className="text-slate-500 text-xs tracking-widest uppercase">CRM Platform</div>
            </div>
          </div>

          {stage === "form" ? (
            <div className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}>
              {/* Color bar */}
              <div className="h-1" style={{ background: "linear-gradient(90deg,#3b82f6,#8b5cf6,#f97316)" }} />

              <div className="p-8">

                {/* Header */}
                <div className="mb-8 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
                    style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)" }}>
                    🔑
                  </div>
                  <h2 className="text-white text-2xl font-bold mb-2">Forgot Password?</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    No problem! Enter your registered email and we'll send a secure reset link.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">✉</span>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)"; }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 p-3 rounded-xl text-sm text-red-300"
                      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <span className="mt-0.5">⚠</span>
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Info note */}
                  <div className="rounded-xl p-3.5 flex items-start gap-3"
                    style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.15)" }}>
                    <span className="text-blue-400 mt-0.5 text-sm flex-shrink-0">ℹ</span>
                    <p className="text-blue-300/70 text-xs leading-relaxed">
                      The reset link expires in <strong className="text-blue-300">1 hour</strong>. 
                      Check your spam folder if you don't see it.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all"
                    style={{
                      background: loading ? "rgba(59,130,246,0.5)" : "linear-gradient(135deg,#3b82f6,#2563eb)",
                      boxShadow: loading ? "none" : "0 4px 20px rgba(59,130,246,0.35)",
                    }}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                        </svg>
                        Sending reset link…
                      </span>
                    ) : "Send Reset Link →"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link href="/login" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
                    ← Back to Sign In
                  </Link>
                </div>
              </div>
            </div>

          ) : (
            /* ── Sent success state ─── */
            <div className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
              }}>
              <div className="h-1" style={{ background: "linear-gradient(90deg,#22c55e,#10b981)" }} />
              <div className="p-8 text-center">

                {/* Animated envelope */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                    style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}>
                    📧
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">
                    ✓
                  </div>
                </div>

                <h2 className="text-white text-2xl font-bold mb-3">Check Your Inbox!</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">
                  We've sent a password reset link to:
                </p>
                <p className="text-white font-semibold mb-6">{email}</p>

                <div className="rounded-xl p-4 mb-6 text-left"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-slate-400 text-xs mb-3 font-semibold uppercase tracking-wide">What to do next</p>
                  <div className="space-y-2">
                    {[
                      "Open the email from Power India Services",
                      "Click the 'Reset Password' button",
                      "Create your new password (link expires in 1 hour)",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-400">
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-slate-300 flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => { setStage("form"); setEmail(""); }}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-slate-300 transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    Try a different email
                  </button>
                  <Link href="/login"
                    className="block w-full py-3 rounded-xl text-sm font-bold text-white text-center transition-all"
                    style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
                    ← Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          )}

          <p className="text-center text-slate-600 text-xs mt-6">
            Power India Services CRM © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
