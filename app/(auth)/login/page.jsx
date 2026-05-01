"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from 'next/head'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [w, setW] = useState(1200)
 
  useEffect(() => {
    const update = () => setW(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
 
  const isMobile = w <= 640
  const isTablet = w <= 900
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
//    const res =  await signIn("credentials", {
//   email,
//   password,
//   // redirect: true,
//    redirect: false,
//   callbackUrl: "/dashboard",
// });
console.log("res",res);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  } catch (err) {
    setError("Server error. Try again.");
    router.push("/login");
  }

  setLoading(false);
};

  return (
    // <div style={{
    //   minHeight: "100vh",
    //   display: "flex",
    //   background: "linear-gradient(135deg, #0f2444 0%, #1a3c6e 50%, #1e40af 100%)",
    // }}>
    //   {/* Left Panel */}
    //   <div style={{
    //     flex: 1,
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     padding: "60px",
    //     color: "white",
    //   }}>
    //     <div style={{ maxWidth: 480 }}>
    //       <div style={{
    //         width: 56, height: 56, borderRadius: 12,
    //         background: "#f97316",
    //         display: "flex", alignItems: "center", justifyContent: "center",
    //         fontSize: 24, fontWeight: 800, marginBottom: 32, color: "white",
    //       }}>P</div>

    //       <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
    //         Power India Services
    //       </h1>
    //       <p style={{ fontSize: 18, color: "#93c5fd", marginBottom: 48, lineHeight: 1.6 }}>
    //         Certification & Compliance CRM — manage BIS, WPC, EPR, LMPC, ISO and more from one place.
    //       </p>

    //       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    //         {[
    //           { icon: "📋", text: "Lead & Client Management" },
    //           { icon: "🔄", text: "Certification Process Tracking" },
    //           { icon: "📁", text: "Document Management System" },
    //           { icon: "💰", text: "Finance & Invoice Tracking" },
    //         ].map((item) => (
    //           <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
    //             <span style={{ fontSize: 20 }}>{item.icon}</span>
    //             <span style={{ color: "#bfdbfe", fontSize: 15 }}>{item.text}</span>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>

    //   {/* Right Panel - Login Form */}
    //   <div style={{
    //     width: 480,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     padding: 40,
    //     background: "rgba(255,255,255,0.04)",
    //     backdropFilter: "blur(20px)",
    //     borderLeft: "1px solid rgba(255,255,255,0.1)",
    //   }}>
    //     <div style={{ width: "100%", maxWidth: 380 }}>
    //       <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
    //         Sign In
    //       </h2>
    //       <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 32 }}>
    //         Enter your credentials to access the CRM
    //       </p>

    //       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    //         <div>
    //           <label style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>
    //             Email Address
    //           </label>
    //           <input
    //             type="email"
    //             value={form.email}
    //             onChange={(e) => setForm({ ...form, email: e.target.value })}
    //             placeholder="you@powerindiaservices.com"
    //             required
    //             style={{
    //               width: "100%", padding: "12px 16px",
    //               background: "rgba(255,255,255,0.08)",
    //               border: "1px solid rgba(255,255,255,0.15)",
    //               borderRadius: 10, color: "white", fontSize: 14,
    //               outline: "none",
    //             }}
    //           />
    //         </div>

    //         <div>
    //           <label style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             value={form.password}
    //             onChange={(e) => setForm({ ...form, password: e.target.value })}
    //             placeholder="••••••••"
    //             required
    //             style={{
    //               width: "100%", padding: "12px 16px",
    //               background: "rgba(255,255,255,0.08)",
    //               border: "1px solid rgba(255,255,255,0.15)",
    //               borderRadius: 10, color: "white", fontSize: 14,
    //               outline: "none",
    //             }}
    //           />
    //         </div>

    //         {error && (
    //           <div style={{
    //             background: "rgba(220,38,38,0.15)",
    //             border: "1px solid rgba(220,38,38,0.3)",
    //             borderRadius: 8, padding: "10px 14px",
    //             color: "#fca5a5", fontSize: 13,
    //           }}>{error}</div>
    //         )}

    //         <button
    //           type="submit"
    //           disabled={loading}
    //           style={{
    //             padding: "13px", borderRadius: 10,
    //             background: loading ? "#475569" : "#f97316",
    //             color: "white", fontWeight: 700, fontSize: 15,
    //             border: "none", cursor: loading ? "not-allowed" : "pointer",
    //             transition: "all 0.2s",
    //           }}
    //         >
    //           {loading ? "Signing in..." : "Sign In →"}
    //         </button>
    //       </form>

    //       <p style={{ color: "#475569", fontSize: 12, marginTop: 32, textAlign: "center" }}>
    //         Power India Services © {new Date().getFullYear()}
    //       </p>
    //     </div>
    //   </div>
    // </div>
     <>
      <Head>
        <title>Sign In | Power India Services CRM</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
          a { text-decoration: none; }
          input::placeholder { color: rgba(255,255,255,0.35); }
          input:focus { outline: none; border-color: #f97316 !important; box-shadow: 0 0 0 3px rgba(249,115,22,0.2); }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes spin { to{transform:rotate(360deg)} }
          .spin { animation: spin 0.9s linear infinite; }
          @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          .fadein { animation: fadeIn 0.5s ease both; }
        `}</style>
      </Head>
 
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: isMobile || isTablet ? 'column' : 'row',
        background: 'linear-gradient(135deg, #0f2444 0%, #1a3c6e 50%, #1e40af 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
 
        {/* BG decoration */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 320, height: 320, borderRadius: '50%', background: 'rgba(249,115,22,0.08)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 260, height: 260, borderRadius: '50%', background: 'rgba(99,102,241,0.12)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
 
        {/* ── LEFT PANEL ── */}
        <div style={{
          flex: isMobile || isTablet ? 'none' : 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile || isTablet ? 'flex-start' : 'center',
          padding: isMobile ? '48px 20px 28px' : isTablet ? '52px 40px 28px' : '60px',
          color: 'white',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{ maxWidth: isMobile || isTablet ? '100%' : 480 }}>
 
            {/* Logo mark */}
            <div style={{
              width: isMobile ? 44 : 54,
              height: isMobile ? 44 : 54,
              borderRadius: 12,
              background: '#f97316',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: isMobile ? 20 : 24,
              fontWeight: 800,
              marginBottom: isMobile ? 20 : 28,
              color: 'white',
              fontFamily: "'Playfair Display', serif",
              boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
            }}>P</div>
 
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 24 : isTablet ? 30 : 36,
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 12,
            }}>
              Power India Services
            </h1>
 
            <p style={{
              fontSize: isMobile ? 14 : 16,
              color: '#93c5fd',
              marginBottom: isMobile ? 24 : 40,
              lineHeight: 1.65,
              maxWidth: 420,
            }}>
              Certification & Compliance CRM — manage BIS, WPC, EPR, LMPC, ISO and more from one place.
            </p>
 
            {/* Feature list */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr',
              gap: isMobile ? 10 : 16,
            }}>
              {[
                { icon: '📋', text: 'Lead & Client Management' },
                { icon: '🔄', text: 'Certification Process Tracking' },
                { icon: '📁', text: 'Document Management System' },
                { icon: '💰', text: 'Finance & Invoice Tracking' },
              ].map((item) => (
                <div key={item.text} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: isMobile ? '10px 12px' : '12px 14px',
                }}>
                  <span style={{ fontSize: isMobile ? 16 : 18, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: '#bfdbfe', fontSize: isMobile ? 12 : 14, fontWeight: 500, fontFamily: "'Space Grotesk',sans-serif" }}>{item.text}</span>
                </div>
              ))}
            </div>
 
            {/* Back to site link */}
            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: isMobile ? 20 : 32,
              fontSize: 13,
              color: 'rgba(255,255,255,0.45)',
              fontFamily: "'Space Grotesk',sans-serif",
              transition: 'color 0.2s',
            }}>
              ← Back to website
            </Link>
          </div>
        </div>
 
        {/* ── RIGHT PANEL — FORM ── */}
        <div style={{
          width: isMobile || isTablet ? '100%' : 480,
          flexShrink: 0,
          display: 'flex',
          alignItems: isMobile || isTablet ? 'flex-start' : 'center',
          justifyContent: 'center',
          padding: isMobile ? '0 20px 48px' : isTablet ? '0 40px 52px' : '40px',
          background: isMobile || isTablet ? 'transparent' : 'rgba(255,255,255,0.04)',
          backdropFilter: isMobile || isTablet ? 'none' : 'blur(20px)',
          borderLeft: isMobile || isTablet ? 'none' : '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          zIndex: 2,
        }}>
          <div className="fadein" style={{ width: '100%', maxWidth: isMobile ? '100%' : 380 }}>
 
            {/* Form card */}
            <div style={{
              background: isMobile || isTablet ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: isMobile ? 18 : 22,
              padding: isMobile ? '28px 20px' : '36px 32px',
              backdropFilter: 'blur(20px)',
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                color: 'white',
                fontSize: isMobile ? 22 : 26,
                fontWeight: 700,
                marginBottom: 6,
              }}>Sign In</h2>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: isMobile ? 24 : 28 }}>
                Enter your credentials to access the CRM
              </p>
 
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 18 }}>
 
                {/* Email */}
                <div>
                  <label style={{
                    color: '#cbd5e1', fontSize: 12, fontWeight: 600,
                    display: 'block', marginBottom: 8,
                    textTransform: 'uppercase', letterSpacing: '0.8px',
                    fontFamily: "'Space Grotesk',sans-serif",
                  }}>Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@powerindiaservices.com"
                    required
                    style={{
                      width: '100%', padding: '11px 14px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 10, color: 'white', fontSize: 14,
                      fontFamily: "'Inter',sans-serif",
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                  />
                </div>
 
                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{
                      color: '#cbd5e1', fontSize: 12, fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.8px',
                      fontFamily: "'Space Grotesk',sans-serif",
                    }}>Password</label>
                    <a href="#" style={{ fontSize: 12, color: '#f97316', fontFamily: "'Space Grotesk',sans-serif" }}>
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    style={{
                      width: '100%', padding: '11px 14px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 10, color: 'white', fontSize: 14,
                      fontFamily: "'Inter',sans-serif",
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                  />
                </div>
 
                {/* Error */}
                {error && (
                  <div style={{
                    background: 'rgba(220,38,38,0.15)',
                    border: '1px solid rgba(220,38,38,0.3)',
                    borderRadius: 9, padding: '10px 14px',
                    color: '#fca5a5', fontSize: 13,
                    fontFamily: "'Space Grotesk',sans-serif",
                  }}>{error}</div>
                )}
 
                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '13px', borderRadius: 10,
                    background: loading ? 'rgba(255,255,255,0.1)' : '#f97316',
                    color: 'white', fontWeight: 700, fontSize: 15,
                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Space Grotesk',sans-serif",
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: loading ? 'none' : '0 4px 16px rgba(249,115,22,0.35)',
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="spin" width={16} height={16} fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Signing in...
                    </>
                  ) : 'Sign In →'}
                </button>
              </form>
 
              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: `${isMobile ? 18 : 22}px 0` }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: 12, color: '#475569', fontFamily: "'Space Grotesk',sans-serif" }}>or</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              </div>
 
              {/* Contact */}
              <a href="mailto:anand@powerindiaservices.com" style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '11px 14px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10, color: '#bfdbfe', fontSize: 13,
                fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500,
                transition: 'background 0.2s',
              }}>
                📧 anand@powerindiaservices.com
              </a>
            </div>
 
            {/* Footer */}
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 20, textAlign: 'center', fontFamily: "'Space Grotesk',sans-serif" }}>
              Power India Services © {new Date().getFullYear()} · New Delhi, India
            </p>
          </div>
        </div>
      </div>
    </>
  );
}