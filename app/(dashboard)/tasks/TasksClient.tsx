 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Priority = "High" | "Medium" | "Low";
type Status = "Pending" | "In Progress" | "Completed";

interface Task {
  _id: string;
  title: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  notes?: string;
  assignedTo?: { name: string };
  client?: { companyLegalName: string };
}

const PRIORITIES: Priority[] = ["High", "Medium", "Low"];
const STATUSES: Status[] = ["Pending", "In Progress", "Completed"];

const priorityColor: Record<Priority, string> = {
  High: "text-red-600 bg-red-50 border-red-200",
  Medium: "text-orange-600 bg-orange-50 border-orange-200",
  Low: "text-green-600 bg-green-50 border-green-200",
};

const statusColor: Record<Status, string> = {
  Pending: "text-yellow-600 bg-yellow-50",
  "In Progress": "text-blue-600 bg-blue-50",
  Completed: "text-green-600 bg-green-50",
};

export default function TasksClient({ tasks: initialTasks }: { tasks: Task[] }) {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<"list" | "kanban">("list");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    priority: "Medium" as Priority,
    dueDate: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.refresh();
      setShowModal(false);
    }

    setSaving(false);
  };

  const updateStatus = async (taskId: string, status: Status) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status } : t))
    );
  };

  const overdue = tasks.filter(
    (t) =>
      t.status !== "Completed" &&
      t.dueDate &&
      new Date(t.dueDate) < new Date()
  );

  return (
    <div className="space-y-6 text-black">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
          <p className="text-sm text-slate-500">
            {tasks.filter((t) => t.status === "Pending").length} pending
            {overdue.length > 0 && (
              <span className="text-red-600 ml-2">
                • {overdue.length} overdue
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView(view === "list" ? "kanban" : "list")}
            className="px-3 py-2 border rounded-lg text-sm hover:bg-slate-50"
          >
            {view === "list" ? "🗂 Kanban" : "📋 List"}
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            ➕ Add Task
          </button>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {view === "kanban" ? (
        <div className="grid grid-cols-3 gap-4">
          {STATUSES.map((status) => (
            <div key={status} className="bg-slate-50 border rounded-xl p-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">{status}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white border">
                  {tasks.filter((t) => t.status === status).length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter((t) => t.status === status)
                  .map((task) => (
                    <div
                      key={task._id}
                      className={`bg-white p-3 rounded-lg border-l-4 ${
                        priorityColor[task.priority]
                      }`}
                    >
                      <p className="font-semibold text-sm">{task.title}</p>

                      {task.client && (
                        <p className="text-xs text-slate-500">
                          {task.client.companyLegalName}
                        </p>
                      )}

                      <div className="flex justify-between mt-2 text-xs">
                        <span
                          className={`px-2 py-1 rounded ${
                            statusColor[task.status]
                          }`}
                        >
                          {task.status}
                        </span>

                        {task.dueDate && (
                          <span className="text-slate-500">
                            📅{" "}
                            {new Date(task.dueDate).toLocaleDateString(
                              "en-IN"
                            )}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-1 mt-2">
                        {STATUSES.filter((s) => s !== status).map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(task._id, s)}
                            className="text-xs px-2 py-1 border rounded bg-slate-100 hover:bg-slate-200"
                          >
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
        /* LIST VIEW */
        <div className="border rounded-xl overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-3">Task</th>
                <th className="p-3">Client</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Due</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => {
                const isOverdue =
                  task.status !== "Completed" &&
                  task.dueDate &&
                  new Date(task.dueDate) < new Date();

                return (
                  <tr key={task._id} className="border-t">
                    <td className="p-3 font-medium">{task.title}</td>

                    <td className="p-3 text-slate-500">
                      {task.client?.companyLegalName || "—"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs border ${
                          priorityColor[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td
                      className={`p-3 ${
                        isOverdue ? "text-red-600 font-semibold" : ""
                      }`}
                    >
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-IN")
                        : "—"}
                      {isOverdue && " ⚠️"}
                    </td>

                    <td className="p-3">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateStatus(task._id, e.target.value as Status)
                        }
                        className={`px-2 py-1 rounded text-xs border ${statusColor[
                          task.status
                        ]}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-[500px] space-y-4"
          >
            <h2 className="text-lg font-bold">Add Task</h2>

            <input
              className="w-full border p-2 rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-2">
              <select
                className="border p-2 rounded"
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value as Priority,
                  })
                }
              >
                {PRIORITIES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>

              <input
                type="date"
                className="border p-2 rounded"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
              />
            </div>

            <textarea
              className="w-full border p-2 rounded"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-3 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                disabled={saving}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                {saving ? "Saving..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}