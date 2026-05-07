 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type Role = "Admin" | "Sales" | "Documentation" | "Accounts" | "Management";

type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
};

type CurrentUser = {
  id: string;
  role: Role;
};

/* ---------------- CONSTANTS ---------------- */

const ROLES: Role[] = [
  "Admin",
  "Sales",
  "Documentation",
  "Accounts",
  "Management",
];

const roleColors: Record<Role, { bg: string; text: string }> = {
  Admin: { bg: "bg-red-50", text: "text-red-600" },
  Sales: { bg: "bg-blue-50", text: "text-blue-600" },
  Documentation: { bg: "bg-green-50", text: "text-green-600" },
  Accounts: { bg: "bg-yellow-50", text: "text-yellow-600" },
  Management: { bg: "bg-purple-50", text: "text-purple-600" },
};

/* ---------------- ADD USER MODAL ---------------- */

function AddUserModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Sales" as Role,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSave();
      onClose();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create user");
    }

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-extrabold">Add Team Member</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            className="w-full border rounded-lg p-2"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="w-full border rounded-lg p-2"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="w-full border rounded-lg p-2"
            placeholder="Password"
            type="password"
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <select
            className="w-full border rounded-lg p-2"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value as Role })
            }
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {saving ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function SettingsClient({
  users,
  currentUser,
}: {
  users: User[];
  currentUser: CurrentUser;
}) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  /* -------- ROLE CHANGE -------- */
  const handleRoleChange = async (id: string, role: Role) => {
    setUpdatingRole(id);

    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    router.refresh();
    setUpdatingRole(null);
  };

  /* -------- TOGGLE ACTIVE -------- */
  const handleToggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });

    router.refresh();
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-extrabold">Settings</h1>
        <p className="text-sm text-slate-500">
          Manage team members and roles
        </p>
      </div>

      {/* ROLE LEGEND */}
      <div className="bg-white border rounded-xl p-5">
        <h3 className="font-bold mb-4">Role Access</h3>

        <div className="grid grid-cols-2 gap-3">
          {ROLES.map((role) => (
            <div
              key={role}
              className={`p-3 rounded-lg border ${roleColors[role].bg}`}
            >
              <p className={`font-bold ${roleColors[role].text}`}>
                {role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">

        <div className="flex justify-between p-4 border-b">
          <h3 className="font-bold">
            Team Members ({users.length})
          </h3>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
          >
            + Add Member
          </button>
        </div>

        <table className="w-full text-sm">

          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">

                {/* NAME */}
                <td className="p-3 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${roleColors[user.role].bg}`}
                  >
                    {user.name?.[0]}
                  </div>
                  {user.name}
                  {user._id === currentUser.id && (
                    <span className="text-xs text-slate-400">(You)</span>
                  )}
                </td>

                {/* EMAIL */}
                <td className="text-slate-500">{user.email}</td>

                {/* ROLE */}
                <td>
                  {user._id === currentUser.id ? (
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${roleColors[user.role].bg} ${roleColors[user.role].text}`}
                    >
                      {user.role}
                    </span>
                  ) : (
                    <select
                      value={user.role}
                      disabled={updatingRole === user._id}
                      onChange={(e) =>
                        handleRoleChange(
                          user._id,
                          e.target.value as Role
                        )
                      }
                      className={`border rounded px-2 py-1 text-xs ${roleColors[user.role].bg} ${roleColors[user.role].text}`}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  )}
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.isActive
                        ? "bg-green-50 text-green-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* JOINED */}
                <td className="text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString("en-IN")}
                </td>

                {/* ACTION */}
                <td>
                  {user._id !== currentUser.id && (
                    <button
                      onClick={() =>
                        handleToggleActive(user._id, user.isActive)
                      }
                      className={`px-2 py-1 text-xs rounded border ${
                        user.isActive
                          ? "text-red-600 bg-red-50"
                          : "text-green-600 bg-green-50"
                      }`}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onSave={() => router.refresh()}
        />
      )}
    </div>
  );
}