"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api-client";

type Role = "Admin" | "Sales" | "Documentation" | "Accounts" | "Management";

type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  taskStats: { total: number; pending: number; inProgress: number; completed: number };
  leadStats: { total: number; converted: number };
};

const ROLES: Role[] = ["Admin", "Sales", "Documentation", "Accounts", "Management"];

const ROLE_COLORS: Record<Role, string> = {
  Admin:         "bg-red-100 text-red-700 border-red-200",
  Sales:         "bg-blue-100 text-blue-700 border-blue-200",
  Documentation: "bg-green-100 text-green-700 border-green-200",
  Accounts:      "bg-yellow-100 text-yellow-700 border-yellow-200",
  Management:    "bg-purple-100 text-purple-700 border-purple-200",
};

const ROLE_ACCESS: Record<Role, string[]> = {
  Admin:         ["All pages, all actions, user management"],
  Sales:         ["Leads (own), Tasks (own), Dashboard (own)"],
  Documentation: ["Tasks (own), Documents, Dashboard (own)"],
  Accounts:      ["Finance, Invoices, Clients, Certifications"],
  Management:    ["All pages (read + limited edit), Reports"],
};

/* ══════════════════════════════════════════
   ADD EMPLOYEE MODAL
══════════════════════════════════════════ */
function AddEmployeeModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Sales" as Role,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [inviteUrl, setInviteUrl] = useState(""); // fallback if email fails

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setInviteUrl("");
    try {
      const res  = await apiFetch("/api/auth/invite", { method: "POST", body: form });
      // Check if email failed but user was created (admin can share link manually)
      if ((res as any)?.inviteUrl) {
        setInviteUrl((res as any).inviteUrl);
        setSaving(false);
        return; // stay open to show link
      }
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to send invite.");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-lg">Invite New Employee</h2>
            <p className="text-slate-400 text-xs mt-0.5">An invite link will be emailed to them</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
        </div>

        {/* If invite URL returned (email failed) show it for manual sharing */}
        {inviteUrl ? (
          <div className="p-6 space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 font-semibold text-sm mb-1">⚠ Email could not be sent</p>
              <p className="text-amber-700 text-xs mb-3">
                The employee account was created. Share this invite link manually:
              </p>
              <div className="bg-white border border-amber-200 rounded-lg p-3 break-all text-xs font-mono text-slate-700">
                {inviteUrl}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { navigator.clipboard.writeText(inviteUrl); }}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50"
              >
                📋 Copy Link
              </button>
              <button
                onClick={() => { onSave(); onClose(); }}
                className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            {/* How it works */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-3">
              <span className="text-blue-500 text-lg mt-0.5">✉</span>
              <div>
                <p className="text-blue-800 font-semibold text-xs mb-0.5">How it works</p>
                <p className="text-blue-600 text-xs leading-relaxed">
                  The employee receives an email with a secure invite link.
                  They click it to set their own password and activate their account.
                  The link expires in <strong>48 hours</strong>.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Full Name *</label>
              <input
                required
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Email Address *</label>
              <input
                required
                type="email"
                placeholder="employee@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Role *</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
              >
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <p className="text-xs text-slate-400 mt-1.5">
                Access: {ROLE_ACCESS[form.role][0]}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
            )}

            <div className="flex justify-end gap-3 pt-1">
              <button type="button" onClick={onClose} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-semibold hover:from-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                    </svg>
                    Sending Invite…
                  </span>
                ) : "Send Invite ✉"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function EmployeesClient({
  users,
  currentUserId,
  currentUserRole,
}: {
  users: User[];
  currentUserId: string;
  currentUserRole: string;
}) {
  const router = useRouter();

  const [showModal, setShowModal]   = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError]           = useState("");
  const [toast, setToast]           = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [search, setSearch]         = useState("");

  const isAdmin = currentUserRole === "Admin";

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const handleResendInvite = async (user: User) => {
    setUpdatingId(user._id);
    setError("");
    try {
      const res = await apiFetch("/api/auth/invite", {
        method: "POST",
        body: { name: user.name, email: user.email, role: user.role },
      }) as any;
      if (res?.inviteUrl) {
        await navigator.clipboard.writeText(res.inviteUrl).catch(() => {});
        showToast("Email failed — invite link copied to clipboard!");
      } else {
        showToast(`Invite re-sent to ${user.email}`);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to resend invite.");
    }
    setUpdatingId(null);
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    setUpdatingId(id);
    setError("");
    try {
      await apiFetch(`/api/users/${id}`, { method: "PATCH", body: { isActive: !isActive } });
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update employee.");
    }
    setUpdatingId(null);
  };

  const handleRoleChange = async (id: string, role: Role) => {
    setUpdatingId(id);
    setError("");
    try {
      await apiFetch(`/api/users/${id}`, { method: "PATCH", body: { role } });
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update role.");
    }
    setUpdatingId(null);
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (!filterRole || u.role === filterRole);
  });

  const activeCount   = users.filter((u) => u.isActive).length;
  const inactiveCount = users.filter((u) => !u.isActive).length;

  return (
    <div className="space-y-6 text-black">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
          <p className="text-sm text-slate-500">
            {activeCount} active · {inactiveCount} inactive · {users.length} total
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            + Register Employee
          </button>
        )}
      </div>

      {/* Role Access Reference */}
      <div className="bg-white border rounded-xl p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Role Access Matrix</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {ROLES.map((role) => (
            <div key={role} className={`rounded-lg border p-3 ${ROLE_COLORS[role]}`}>
              <p className="font-bold text-sm">{role}</p>
              <p className="text-xs mt-1 opacity-80">{ROLE_ACCESS[role][0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <input
          placeholder="Search name or email..."
          className="border rounded-lg p-2 text-sm w-56"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-lg p-2 text-sm"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          {ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((user) => (
          <div
            key={user._id}
            className={`bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition ${
              !user.isActive ? "opacity-60" : ""
            }`}
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border ${ROLE_COLORS[user.role]}`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-900 truncate">{user.name}</p>
                  {user._id === currentUserId && (
                    <span className="text-xs text-slate-400">(You)</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>

            {/* Role + Status */}
            <div className="flex items-center justify-between mb-4">
              {isAdmin && user._id !== currentUserId ? (
                <select
                  value={user.role}
                  disabled={updatingId === user._id}
                  onChange={(e) => handleRoleChange(user._id, e.target.value as Role)}
                  className={`text-xs px-2 py-1 rounded-lg border font-semibold ${ROLE_COLORS[user.role]}`}
                >
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              ) : (
                <span className={`text-xs px-2 py-1 rounded-lg border font-semibold ${ROLE_COLORS[user.role]}`}>
                  {user.role}
                </span>
              )}

              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                user.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
              }`}>
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-slate-800">{user.taskStats.total}</p>
                <p className="text-xs text-slate-500">Total Tasks</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-yellow-700">{user.taskStats.pending}</p>
                <p className="text-xs text-yellow-600">Pending</p>
              </div>
              <div className="bg-green-50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-green-700">{user.taskStats.completed}</p>
                <p className="text-xs text-green-600">Done</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
              <span>🎯 {user.leadStats.total} leads assigned</span>
              <span>✅ {user.leadStats.converted} converted</span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-3 border-t items-center">
              <span className="text-xs text-slate-400">
                {new Date(user.createdAt).toLocaleDateString("en-IN")}
              </span>

              {/* Not yet registered badge + resend invite */}
              {isAdmin && !(user as any).isRegistered && user._id !== currentUserId && (
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  Invite pending
                </span>
              )}

              <div className="ml-auto flex gap-1.5">
                {/* Resend invite for unregistered users */}
                {isAdmin && !(user as any).isRegistered && user._id !== currentUserId && (
                  <button
                    onClick={() => handleResendInvite(user)}
                    disabled={updatingId === user._id}
                    className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-100 transition font-medium"
                  >
                    {updatingId === user._id ? "Sending…" : "✉ Resend"}
                  </button>
                )}

                {isAdmin && user._id !== currentUserId && (
                  <button
                    onClick={() => handleToggleActive(user._id, user.isActive)}
                    disabled={updatingId === user._id}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition border ${
                      user.isActive
                        ? "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                        : "bg-green-50 text-green-600 border-green-100 hover:bg-green-100"
                    }`}
                  >
                    {updatingId === user._id
                      ? "…"
                      : user.isActive ? "Deactivate" : "Activate"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-400">
            No employees found.
          </div>
        )}
      </div>

      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onSave={() => router.refresh()}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4">
          <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <span className="text-green-400 text-lg">✓</span>
            <span className="text-sm font-medium">{toast}</span>
            <button onClick={() => setToast("")} className="text-slate-400 hover:text-white ml-2 text-xs">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
