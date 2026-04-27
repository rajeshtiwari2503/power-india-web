"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "linear-gradient(135deg, #0f2444 0%, #1a3c6e 50%, #1e40af 100%)",
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px",
        color: "white",
      }}>
        <div style={{ maxWidth: 480 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: "#f97316",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 800, marginBottom: 32, color: "white",
          }}>P</div>

          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Power India Services
          </h1>
          <p style={{ fontSize: 18, color: "#93c5fd", marginBottom: 48, lineHeight: 1.6 }}>
            Certification & Compliance CRM — manage BIS, WPC, EPR, LMPC, ISO and more from one place.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "📋", text: "Lead & Client Management" },
              { icon: "🔄", text: "Certification Process Tracking" },
              { icon: "📁", text: "Document Management System" },
              { icon: "💰", text: "Finance & Invoice Tracking" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ color: "#bfdbfe", fontSize: 15 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div style={{
        width: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        borderLeft: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            Sign In
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 32 }}>
            Enter your credentials to access the CRM
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@powerindiaservices.com"
                required
                style={{
                  width: "100%", padding: "12px 16px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10, color: "white", fontSize: 14,
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                style={{
                  width: "100%", padding: "12px 16px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10, color: "white", fontSize: 14,
                  outline: "none",
                }}
              />
            </div>

            {error && (
              <div style={{
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(220,38,38,0.3)",
                borderRadius: 8, padding: "10px 14px",
                color: "#fca5a5", fontSize: 13,
              }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "13px", borderRadius: 10,
                background: loading ? "#475569" : "#f97316",
                color: "white", fontWeight: 700, fontSize: 15,
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p style={{ color: "#475569", fontSize: 12, marginTop: 32, textAlign: "center" }}>
            Power India Services © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}