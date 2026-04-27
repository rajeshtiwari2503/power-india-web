"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES = ["Pending", "In Progress", "Completed"];

const priorityColor = { High: "#dc2626", Medium: "#f97316", Low: "#16a34a" };
const statusColor = { Pending: "#f59e0b", "In Progress": "#2563eb", Completed: "#16a34a" };

export default function TasksClient({ tasks: initialTasks }) {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("list");
  const [form, setForm] = useState({
    title: "", assignedToId: "", clientId: "",
    dueDate: "", priority: "Medium", notes: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.refresh(); setShowModal(false); }
    setSaving(false);
  };

  const updateStatus = async (taskId, status) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setTasks(tasks.map(t => t._id === taskId ? { ...t, status } : t));
  };

  const overdue = tasks.filter(t => t.status !== "Completed" && t.dueDate && new Date(t.dueDate) < new Date());

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Tasks</h1>
          <p style={{ color: "#64748b", fontSize: 14 }}>
            {tasks.filter(t => t.status === "Pending").length} pending
            {overdue.length > 0 && <span style={{ color: "#dc2626", marginLeft: 8 }}>• {overdue.length} overdue</span>}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setView(view === "list" ? "kanban" : "list")} className="btn btn-outline">
            {view === "list" ? "🗂️ Kanban" : "📋 List"}
          </button>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">➕ Add Task</button>
        </div>
      </div>

      {view === "kanban" ? (
        /* Kanban View */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {STATUSES.map(status => (
            <div key={status} style={{ background: "#f8fafc", borderRadius: 12, padding: 16, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor[status] }} />
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{status}</span>
                </div>
                <span style={{
                  background: statusColor[status] + "18", color: statusColor[status],
                  padding: "2px 8px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                }}>
                  {tasks.filter(t => t.status === status).length}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {tasks.filter(t => t.status === status).map(task => (
                  <div key={task._id} style={{
                    background: "white", borderRadius: 8, padding: 12,
                    border: "1px solid #e2e8f0",
                    borderLeft: `3px solid ${priorityColor[task.priority]}`,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{task.title}</div>
                    {task.client && <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>{task.client.companyLegalName}</div>}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{
                        background: priorityColor[task.priority] + "18",
                        color: priorityColor[task.priority],
                        padding: "2px 6px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                      }}>{task.priority}</span>
                      {task.dueDate && (
                        <span style={{
                          fontSize: 11,
                          color: new Date(task.dueDate) < new Date() && task.status !== "Completed" ? "#dc2626" : "#64748b",
                        }}>
                          📅 {new Date(task.dueDate).toLocaleDateString("en-IN")}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      {STATUSES.filter(s => s !== status).map(s => (
                        <button key={s} onClick={() => updateStatus(task._id, s)}
                          style={{
                            padding: "3px 8px", borderRadius: 4, fontSize: 11,
                            background: "#f1f5f9", border: "1px solid #e2e8f0",
                            cursor: "pointer", color: "#64748b",
                          }}>
                          → {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Client</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>No tasks yet</td></tr>
              ) : tasks.map(task => {
                const isOverdue = task.status !== "Completed" && task.dueDate && new Date(task.dueDate) < new Date();
                return (
                  <tr key={task._id}>
                    <td>
                      <div style={{ fontWeight: 600, textDecoration: task.status === "Completed" ? "line-through" : "none", color: task.status === "Completed" ? "#94a3b8" : "#0f172a" }}>
                        {task.title}
                      </div>
                      {task.notes && <div style={{ fontSize: 12, color: "#94a3b8" }}>{task.notes}</div>}
                    </td>
                    <td style={{ fontSize: 13, color: "#64748b" }}>{task.client?.companyLegalName || "—"}</td>
                    <td style={{ fontSize: 13 }}>{task.assignedTo?.name || "—"}</td>
                    <td>
                      <span style={{
                        background: priorityColor[task.priority] + "18",
                        color: priorityColor[task.priority],
                        padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                      }}>{task.priority}</span>
                    </td>
                    <td style={{ fontSize: 13, color: isOverdue ? "#dc2626" : "#64748b", fontWeight: isOverdue ? 600 : 400 }}>
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-IN") : "—"}
                      {isOverdue && " ⚠️"}
                    </td>
                    <td>
                      <select
                        value={task.status}
                        onChange={e => updateStatus(task._id, e.target.value)}
                        style={{
                          padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                          border: "none", background: statusColor[task.status] + "18",
                          color: statusColor[task.status], cursor: "pointer",
                        }}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => updateStatus(task._id, "Completed")}
                        style={{
                          padding: "4px 10px", borderRadius: 6,
                          background: task.status === "Completed" ? "#f1f5f9" : "#dcfce7",
                          color: task.status === "Completed" ? "#94a3b8" : "#16a34a",
                          border: "none", fontSize: 12, cursor: "pointer", fontWeight: 600,
                        }}
                      >
                        {task.status === "Completed" ? "Done ✓" : "Mark Done"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Task Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
          <div style={{
            background: "white", borderRadius: 16, padding: 32,
            width: "100%", maxWidth: 500,
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Add Task</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Task Title *</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="form-input" placeholder="e.g. Submit BIS application for ABC" required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Priority</label>
                    <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="form-input">
                      {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Due Date</label>
                    <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className="form-input" />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Notes</label>
                  <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                    className="form-input" rows={2} placeholder="Optional notes..." />
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? "Saving..." : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}