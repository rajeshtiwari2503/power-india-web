 "use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />

      {/* LEFT PANEL */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12 text-white z-10">
        <div className="max-w-xl">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-xl mb-8">
            P
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Power India Services
          </h1>

          <p className="text-blue-200 mb-10 leading-relaxed">
            Certification & Compliance CRM — manage BIS, WPC, EPR, LMPC, ISO and more.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 text-blue-100 text-sm">
            <div>📋 Lead & Client Management</div>
            <div>🔄 Certification Tracking</div>
            <div>📁 Document System</div>
            <div>💰 Finance & Invoices</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-[420px] flex items-center justify-center px-6 py-12 z-10">
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">

          <h2 className="text-white text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-slate-400 text-sm mb-6">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-xs text-slate-300 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-300 text-sm bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Power India Services © {new Date().getFullYear()}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-orange-400 text-sm hover:underline"
            >
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}