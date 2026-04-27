"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ROLES = ["Admin", "Sales", "Documentation", "Accounts", "Management"];

const roleColors = {
  Admin: { bg: "#fef2f2", text: "#dc2626" },
  Sales: { bg: "#eff6ff", text: "#2563eb" },
  Documentation: { bg: "#f0fdf4", text: "#16a34a" },
  Accounts: { bg: "#fefce8", text: "#ca8a04" },
  Management: { bg: "#faf5ff", text: "#9333ea" },
};

function AddUserModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Sales" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { onSave(); onClose(); }
    else {
      const data = await res.json();
      setError(data.error || "Failed to create user");
    }
    setSaving(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{
        background: "white", borderRadius: 16, padding: 32,
        width: "100%", maxWidth: 440,
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>Add Team Member</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Full Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="form-input" placeholder="e.g. Rahul Sharma" required />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email *</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="form-input" placeholder="rahul@powerindiaservices.com" required />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Password *</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                className="form-input" placeholder="Min 8 characters" required minLength={8} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Role *</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="form-input">
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", color: "#dc2626", fontSize: 13 }}>
                {error}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SettingsClient({ users, currentUser }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingRole(userId);
    await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    router.refresh();
    setUpdatingRole(null);
  };

  const handleToggleActive = async (userId, isActive) => {
    await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    router.refresh();
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Settings</h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>Manage team members and access roles</p>
      </div>

      {/* Role Legend */}
      <div className="stat-card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Role Access Levels</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { role: "Admin", access: "Full access — all modules" },
            { role: "Sales", access: "Leads + basic dashboard" },
            { role: "Documentation", access: "Certifications + Documents" },
            { role: "Accounts", access: "Finance + Invoices" },
            { role: "Management", access: "Reports + Dashboard" },
          ].map(item => (
            <div key={item.role} style={{
              padding: "12px 14px", borderRadius: 8,
              background: roleColors[item.role]?.bg,
              border: `1px solid ${roleColors[item.role]?.text}22`,
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: roleColors[item.role]?.text, marginBottom: 4 }}>
                {item.role}
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{item.access}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Table */}
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{
          padding: "16px 20px", borderBottom: "1px solid #e2e8f0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Team Members ({users.length})</h3>
          <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ fontSize: 13 }}>
            ➕ Add Member
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: roleColors[user.role]?.bg || "#f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700,
                      color: roleColors[user.role]?.text || "#64748b",
                      flexShrink: 0,
                    }}>
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>
                      {user.name}
                      {user._id === currentUser.id && (
                        <span style={{ fontSize: 11, color: "#64748b", marginLeft: 6 }}>(You)</span>
                      )}
                    </span>
                  </div>
                </td>
                <td style={{ color: "#64748b", fontSize: 13 }}>{user.email}</td>
                <td>
                  {user._id === currentUser.id ? (
                    <span style={{
                      background: roleColors[user.role]?.bg,
                      color: roleColors[user.role]?.text,
                      padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700,
                    }}>{user.role}</span>
                  ) : (
                    <select
                      value={user.role}
                      onChange={e => handleRoleChange(user._id, e.target.value)}
                      disabled={updatingRole === user._id}
                      style={{
                        padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                        border: "1px solid #e2e8f0", cursor: "pointer",
                        background: roleColors[user.role]?.bg,
                        color: roleColors[user.role]?.text,
                      }}
                    >
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  )}
                </td>
                <td>
                  <span style={{
                    background: user.isActive ? "#dcfce7" : "#f1f5f9",
                    color: user.isActive ? "#16a34a" : "#64748b",
                    padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                  }}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ fontSize: 13, color: "#64748b" }}>
                  {new Date(user.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td>
                  {user._id !== currentUser.id && (
                    <button
                      onClick={() => handleToggleActive(user._id, user.isActive)}
                      style={{
                        padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                        border: "1px solid #e2e8f0",
                        background: user.isActive ? "#fef2f2" : "#f0fdf4",
                        color: user.isActive ? "#dc2626" : "#16a34a",
                        cursor: "pointer",
                      }}
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

      {showModal && <AddUserModal onClose={() => setShowModal(false)} onSave={() => router.refresh()} />}
    </div>
  );
}