"use client";

import { useState } from "react";
import { apiFetch, ApiError } from "@/lib/api-client";

const ROLE_COLORS: Record<string, string> = {
  Admin:         "bg-red-100 text-red-700",
  Sales:         "bg-blue-100 text-blue-700",
  Documentation: "bg-green-100 text-green-700",
  Accounts:      "bg-yellow-100 text-yellow-700",
  Management:    "bg-purple-100 text-purple-700",
};

export default function ProfileClient({
  user,
  currentUserId,
}: {
  user: any;
  currentUserId: string;
}) {
  const [name, setName]         = useState(user.name || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [saving, setSaving]     = useState(false);
  const [message, setMessage]   = useState("");
  const [error, setError]       = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSaving(true);
    try {
      const body: any = { name };
      if (password) body.password = password;

      await apiFetch(`/api/user/${currentUserId}`, { method: "PATCH", body });
      setMessage("Profile updated successfully!");
      setPassword("");
      setConfirm("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update profile.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-black">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-500">Update your name or change your password.</p>
      </div>

      {/* Info card */}
      <div className="bg-white border rounded-xl p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
          {user.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-lg font-bold text-slate-900">{user.name}</p>
          <p className="text-sm text-slate-500">{user.email}</p>
          <span className={`mt-1 inline-block text-xs px-2 py-1 rounded-lg font-semibold ${ROLE_COLORS[user.role] || "bg-slate-100 text-slate-600"}`}>
            {user.role}
          </span>
        </div>
      </div>

      {/* Edit form */}
      <form onSubmit={handleSave} className="bg-white border rounded-xl p-6 space-y-5">
        <h2 className="font-bold text-slate-800">Edit Details</h2>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border rounded-xl p-3 text-sm bg-slate-50 text-slate-400 cursor-not-allowed"
          />
          <p className="text-xs text-slate-400 mt-1">Email cannot be changed. Contact Admin if needed.</p>
        </div>

        <div className="border-t pt-5">
          <p className="text-sm font-semibold text-slate-700 mb-3">Change Password <span className="text-slate-400 font-normal">(leave blank to keep current)</span></p>

          <div className="space-y-3">
            <input
              type="password"
              placeholder="New password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
        )}
        {message && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">✅ {message}</div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
