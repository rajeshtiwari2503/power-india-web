"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const FEATURES = [
  { icon: "🎯", title: "Lead Pipeline",      desc: "Track every lead through 9 stages to closure" },
  { icon: "📜", title: "Certifications",     desc: "BIS, WPC, EPR, LMPC, ISO — all in one place"  },
  { icon: "💰", title: "Finance & Invoices", desc: "Proforma, invoices, payment tracking"           },
  { icon: "👥", title: "Team Management",    desc: "Role-based access for your entire team"         },
];

/* ─── Inner form — inside Suspense because of useSearchParams ─── */
function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [mounted,  setMounted]  = useState(false);   // fix hydration
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPwd,  setShowPwd]  = useState(false);

  // Only render dynamic content after mount (avoids SSR/CSR mismatch)
  useEffect(() => {
    setMounted(true);

    // NextAuth sends ?error= on failed callback
    const urlError = searchParams.get("error");
    if (!urlError) return;
    setError(
      urlError === "CredentialsSignin"
        ? "Galat email ya password."
        : decodeURIComponent(urlError).replace(/^Error:\s*/i, "")
    );
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        email:       email.trim().toLowerCase(),
        password,
        redirect:    false,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        setError(
          res.error === "CredentialsSignin"
            ? "Galat email ya password."
            : res.error.replace(/^Error:\s*/i, "")
        );
      } else if (res?.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Server error. Dobara try karein.");
    }
    setLoading(false);
  };

  // Prevent hydration mismatch — show skeleton until client mounts
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050c1a" }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "4px solid #f97316", borderTopColor: "transparent",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "#050c1a" }}>

      {/* ── LEFT PANEL ─────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[55%] p-14 relative overflow-hidden">

        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        {/* Glow orbs */}
        <div className="absolute pointer-events-none" style={{ top:"-10%", left:"-5%", width:500, height:500, borderRadius:"50%", opacity:0.2, background:"radial-gradient(circle,#f97316 0%,transparent 70%)" }} />
        <div className="absolute pointer-events-none" style={{ bottom:"-10%", right:"-5%", width:400, height:400, borderRadius:"50%", opacity:0.15, background:"radial-gradient(circle,#3b82f6 0%,transparent 70%)" }} />

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#f97316,#ea580c)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:18, color:"#fff", flexShrink:0 }}>
              P
            </div>
            <div>
              <div className="text-white font-bold text-lg tracking-tight">Power India</div>
              <div className="text-xs tracking-widest uppercase" style={{ color:"#64748b" }}>Services CRM</div>
            </div>
          </div>

          <h1 className="font-black text-white mb-6" style={{ fontSize:"3rem", lineHeight:1.1 }}>
            Compliance.<br />
            {/* Use CSS class instead of inline webkit styles to avoid hydration mismatch */}
            <span className="gradient-text">Simplified.</span>
          </h1>
          <style>{`.gradient-text{background:linear-gradient(90deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}`}</style>

          <p className="text-lg leading-relaxed max-w-sm" style={{ color:"#94a3b8" }}>
            End-to-end CRM for Indian certification &amp; compliance — from lead to certificate.
          </p>
        </div>

        {/* Feature cards */}
        <div className="relative z-10 grid grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:16 }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{f.icon}</div>
              <div className="text-white font-semibold text-sm mb-1">{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color:"#64748b" }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-2 text-xs" style={{ color:"#475569" }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", animation:"pulse 2s infinite" }} />
          All systems operational · Power India Services
        </div>
      </div>

      {/* ── RIGHT PANEL — FORM ────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-14 relative">

        {/* Mobile logo */}
        <div className="absolute top-8 left-6 flex items-center gap-2 lg:hidden">
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#f97316,#ea580c)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff" }}>P</div>
          <span className="text-white font-bold">Power India</span>
        </div>

        <div className="w-full" style={{ maxWidth:360 }}>

          {/* Card */}
          <div style={{
            background:"rgba(255,255,255,0.04)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:20,
            overflow:"hidden",
            boxShadow:"0 32px 64px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)",
          }}>
            {/* Rainbow stripe */}
            <div style={{ height:4, background:"linear-gradient(90deg,#f97316,#3b82f6,#8b5cf6)" }} />

            <div style={{ padding:32 }}>
              <div style={{ marginBottom:28 }}>
                <h2 className="text-white font-bold text-2xl tracking-tight">Welcome back</h2>
                <p className="text-sm mt-1" style={{ color:"#64748b" }}>Sign in to your workspace</p>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div style={{ marginBottom:16 }}>
                  <label className="text-xs font-semibold uppercase tracking-widest block" style={{ color:"#94a3b8", marginBottom:8 }}>
                    Email
                  </label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#64748b", fontSize:14 }}>✉</span>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@powerindia.com"
                      style={{
                        width:"100%", boxSizing:"border-box",
                        paddingLeft:40, paddingRight:16, paddingTop:14, paddingBottom:14,
                        borderRadius:12, fontSize:14, color:"#fff",
                        background:"rgba(255,255,255,0.06)",
                        border:"1px solid rgba(255,255,255,0.1)",
                        outline:"none", transition:"border-color 0.2s,box-shadow 0.2s",
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(249,115,22,0.15)"; }}
                      onBlur={e  => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow="none"; }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom:16 }}>
                  <label className="text-xs font-semibold uppercase tracking-widest block" style={{ color:"#94a3b8", marginBottom:8 }}>
                    Password
                  </label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#64748b", fontSize:14 }}>🔒</span>
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width:"100%", boxSizing:"border-box",
                        paddingLeft:40, paddingRight:56, paddingTop:14, paddingBottom:14,
                        borderRadius:12, fontSize:14, color:"#fff",
                        background:"rgba(255,255,255,0.06)",
                        border:"1px solid rgba(255,255,255,0.1)",
                        outline:"none", transition:"border-color 0.2s,box-shadow 0.2s",
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(249,115,22,0.15)"; }}
                      onBlur={e  => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow="none"; }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(v => !v)}
                      style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", color:"#64748b", background:"none", border:"none", cursor:"pointer", fontSize:12 }}
                    >
                      {showPwd ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div style={{
                    display:"flex", alignItems:"flex-start", gap:8,
                    padding:12, borderRadius:12, marginBottom:16,
                    background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)",
                    color:"#fca5a5", fontSize:14,
                  }}>
                    <span style={{ flexShrink:0 }}>⚠</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width:"100%", padding:"14px 0",
                    borderRadius:12, fontSize:14, fontWeight:700, color:"#fff",
                    border:"none", cursor: loading ? "not-allowed" : "pointer",
                    background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg,#f97316,#ea580c)",
                    boxShadow: loading ? "none" : "0 4px 20px rgba(249,115,22,0.35)",
                    transition:"all 0.2s", marginTop:8,
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                  }}
                >
                  {loading ? (
                    <>
                      <svg style={{ width:16, height:16, animation:"spin 0.8s linear infinite" }} viewBox="0 0 24 24" fill="none">
                        <circle style={{ opacity:0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path style={{ opacity:0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      Signing in…
                    </>
                  ) : "Sign In →"}
                </button>
              </form>

              {/* Forgot password */}
              <div style={{ marginTop:20, textAlign:"center" }}>
                <a href="/forgot-password" style={{ color:"#64748b", fontSize:12, textDecoration:"none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
                >
                  Forgot your password?
                </a>
              </div>

              {/* Info */}
              <div style={{
                marginTop:16, padding:12, borderRadius:12, textAlign:"center",
                background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)",
              }}>
                <p style={{ color:"#475569", fontSize:12, margin:0 }}>
                  New here? Contact your Admin — they&apos;ll send you an invite link.
                </p>
              </div>

            </div>
          </div>

          <p style={{ textAlign:"center", color:"#334155", fontSize:12, marginTop:24 }}>
            Power India Services · CRM v2.0
          </p>

        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        * { box-sizing: border-box; }
        input::placeholder { color: #475569; }
      `}</style>
    </div>
  );
}

/* ── Suspense wrapper required for useSearchParams in Next.js 13+ ── */
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight:"100vh", background:"#050c1a", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:40, height:40, borderRadius:"50%", border:"4px solid #f97316", borderTopColor:"transparent", animation:"spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
