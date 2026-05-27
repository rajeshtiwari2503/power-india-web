//  "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { apiFetch, ApiError } from "@/lib/api-client";

// /* ---------------- TYPES ---------------- */

// type Role = "Admin" | "Sales" | "Documentation" | "Accounts" | "Management";

// type User = {
//   _id: string;
//   name: string;
//   email: string;
//   role: Role;
//   isActive: boolean;
//   createdAt: string;
// };

// type CurrentUser = {
//   id: string;
//   role: Role;
// };

// /* ---------------- CONSTANTS ---------------- */

// const ROLES: Role[] = [
//   "Admin",
//   "Sales",
//   "Documentation",
//   "Accounts",
//   "Management",
// ];

// const roleColors: Record<Role, { bg: string; text: string }> = {
//   Admin: { bg: "bg-red-50", text: "text-red-600" },
//   Sales: { bg: "bg-blue-50", text: "text-blue-600" },
//   Documentation: { bg: "bg-green-50", text: "text-green-600" },
//   Accounts: { bg: "bg-yellow-50", text: "text-yellow-600" },
//   Management: { bg: "bg-purple-50", text: "text-purple-600" },
// };

// /* ---------------- ADD USER MODAL ---------------- */

// function AddUserModal({
//   onClose,
//   onSave,
// }: {
//   onClose: () => void;
//   onSave: () => void;
// }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "Sales" as Role,
//   });

//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");

//     try {
//       await apiFetch("/api/users", { method: "POST", body: form });
//       onSave();
//       onClose();
//     } catch (err) {
//       const message =
//         err instanceof ApiError
//           ? err.message
//           : "Failed to create user. Please try again.";
//       setError(message);
//     }

//     setSaving(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-lg font-extrabold">Add Team Member</h2>
//           <button onClick={onClose} className="text-xl">✕</button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-3">

//           <input
//             className="w-full border rounded-lg p-2"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />

//           <input
//             className="w-full border rounded-lg p-2"
//             placeholder="Email"
//             type="email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//           />

//           <input
//             className="w-full border rounded-lg p-2"
//             placeholder="Password"
//             type="password"
//             minLength={8}
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//           />

//           <select
//             className="w-full border rounded-lg p-2"
//             value={form.role}
//             onChange={(e) =>
//               setForm({ ...form, role: e.target.value as Role })
//             }
//           >
//             {ROLES.map((r) => (
//               <option key={r} value={r}>
//                 {r}
//               </option>
//             ))}
//           </select>

//           {error && (
//             <div className="bg-red-50 text-red-600 text-sm p-2 rounded-lg">
//               {error}
//             </div>
//           )}

//           <div className="flex justify-end gap-3 pt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-3 py-2 border rounded-lg"
//             >
//               Cancel
//             </button>

//             <button
//               disabled={saving}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//             >
//               {saving ? "Creating..." : "Create"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ---------------- MAIN COMPONENT ---------------- */

// export default function SettingsClient({
//   users,
//   currentUser,
// }: {
//   users: User[];
//   currentUser: CurrentUser;
// }) {
//   const router = useRouter();

//   const [showModal, setShowModal] = useState(false);
//   const [updatingRole, setUpdatingRole] = useState<string | null>(null);
//   const [error, setError] = useState("");

//   /* -------- ROLE CHANGE -------- */
//   const handleRoleChange = async (id: string, role: Role) => {
//     setUpdatingRole(id);
//     setError("");

//     try {
//       await apiFetch(`/api/users/${id}`, { method: "PATCH", body: { role } });
//       router.refresh();
//     } catch (err) {
//       const message =
//         err instanceof ApiError
//           ? err.message
//           : "Failed to update role. Please try again.";
//       setError(message);
//     }
//     setUpdatingRole(null);
//   };

//   /* -------- TOGGLE ACTIVE -------- */
//   const handleToggleActive = async (id: string, isActive: boolean) => {
//     setError("");
//     try {
//       await apiFetch(`/api/users/${id}`, {
//         method: "PATCH",
//         body: { isActive: !isActive },
//       });
//       router.refresh();
//     } catch (err) {
//       const message =
//         err instanceof ApiError
//           ? err.message
//           : "Failed to update user. Please try again.";
//       setError(message);
//     }
//   };

//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-extrabold">Settings</h1>
//         <p className="text-sm text-slate-500">
//           Manage team members and roles
//         </p>
//       </div>

//       {/* ROLE LEGEND */}
//       <div className="bg-white border rounded-xl p-5">
//         <h3 className="font-bold mb-4">Role Access</h3>

//         <div className="grid grid-cols-2 gap-3">
//           {ROLES.map((role) => (
//             <div
//               key={role}
//               className={`p-3 rounded-lg border ${roleColors[role].bg}`}
//             >
//               <p className={`font-bold ${roleColors[role].text}`}>
//                 {role}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {error && (
//         <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       {/* USERS TABLE */}
//       <div className="bg-white border rounded-xl overflow-hidden">

//         <div className="flex justify-between p-4 border-b">
//           <h3 className="font-bold">
//             Team Members ({users.length})
//           </h3>

//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
//           >
//             + Add Member
//           </button>
//         </div>

//         <table className="w-full text-sm">

//           <thead className="bg-slate-50 text-slate-600">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Joined</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-t">

//                 {/* NAME */}
//                 <td className="p-3 flex items-center gap-2">
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${roleColors[user.role].bg}`}
//                   >
//                     {user.name?.[0]}
//                   </div>
//                   {user.name}
//                   {user._id === currentUser.id && (
//                     <span className="text-xs text-slate-400">(You)</span>
//                   )}
//                 </td>

//                 {/* EMAIL */}
//                 <td className="text-slate-500">{user.email}</td>

//                 {/* ROLE */}
//                 <td>
//                   {user._id === currentUser.id ? (
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-bold ${roleColors[user.role].bg} ${roleColors[user.role].text}`}
//                     >
//                       {user.role}
//                     </span>
//                   ) : (
//                     <select
//                       value={user.role}
//                       disabled={updatingRole === user._id}
//                       onChange={(e) =>
//                         handleRoleChange(
//                           user._id,
//                           e.target.value as Role
//                         )
//                       }
//                       className={`border rounded px-2 py-1 text-xs ${roleColors[user.role].bg} ${roleColors[user.role].text}`}
//                     >
//                       {ROLES.map((r) => (
//                         <option key={r} value={r}>
//                           {r}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 </td>

//                 {/* STATUS */}
//                 <td>
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-semibold ${
//                       user.isActive
//                         ? "bg-green-50 text-green-600"
//                         : "bg-slate-100 text-slate-500"
//                     }`}
//                   >
//                     {user.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </td>

//                 {/* JOINED */}
//                 <td className="text-slate-500">
//                   {new Date(user.createdAt).toLocaleDateString("en-IN")}
//                 </td>

//                 {/* ACTION */}
//                 <td>
//                   {user._id !== currentUser.id && (
//                     <button
//                       onClick={() =>
//                         handleToggleActive(user._id, user.isActive)
//                       }
//                       className={`px-2 py-1 text-xs rounded border ${
//                         user.isActive
//                           ? "text-red-600 bg-red-50"
//                           : "text-green-600 bg-green-50"
//                       }`}
//                     >
//                       {user.isActive ? "Deactivate" : "Activate"}
//                     </button>
//                   )}
//                 </td>

//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <AddUserModal
//           onClose={() => setShowModal(false)}
//           onSave={() => router.refresh()}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api-client";

/* ---------------- TYPES ---------------- */

type Role =
  | "Admin"
  | "Sales"
  | "Documentation"
  | "Accounts"
  | "Management";

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

type SettingsClientProps = {
  users: User[];
  currentUser: CurrentUser;
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
  Admin: {
    bg: "bg-red-50 border-red-100",
    text: "text-red-600",
  },
  Sales: {
    bg: "bg-blue-50 border-blue-100",
    text: "text-blue-600",
  },
  Documentation: {
    bg: "bg-green-50 border-green-100",
    text: "text-green-600",
  },
  Accounts: {
    bg: "bg-yellow-50 border-yellow-100",
    text: "text-yellow-600",
  },
  Management: {
    bg: "bg-purple-50 border-purple-100",
    text: "text-purple-600",
  },
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await apiFetch("/api/users", {
        method: "POST",
        body: form,
      });

      onSave();
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to create user";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Add Team Member
            </h2>

            <p className="text-sm text-slate-500">
              Create new user account
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500"
              placeholder="Minimum 8 characters"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Role
            </label>

            <select
              value={form.role}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  role: e.target.value as Role,
                }))
              }
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create User"}
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
}: SettingsClientProps) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [error, setError] = useState("");

  /* ---------------- UPDATE ROLE ---------------- */

  const handleRoleChange = async (id: string, role: Role) => {
    try {
      setUpdatingRole(id);
      setError("");

      await apiFetch(`/api/users/${id}`, {
        method: "PATCH",
        body: { role },
      });

      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to update role";

      setError(message);
    } finally {
      setUpdatingRole(null);
    }
  };

  /* ---------------- TOGGLE ACTIVE ---------------- */

  const handleToggleActive = async (
    id: string,
    isActive: boolean
  ) => {
    try {
      setLoadingAction(id);
      setError("");

      await apiFetch(`/api/users/${id}`, {
        method: "PATCH",
        body: {
          isActive: !isActive,
        },
      });

      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to update user";

      setError(message);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage team members and access roles
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Add Team Member
        </button>
      </div>

      {/* ROLE ACCESS */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Role Access
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {ROLES.map((role) => (
            <div
              key={role}
              className={`rounded-xl border p-4 ${roleColors[role].bg}`}
            >
              <p
                className={`text-sm font-bold ${roleColors[role].text}`}
              >
                {role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* USERS TABLE */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Team Members
            </h2>

            <p className="text-sm text-slate-500">
              {users.length} users found
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left font-semibold">
                  Name
                </th>

                <th className="text-left font-semibold">
                  Email
                </th>

                <th className="text-left font-semibold">
                  Role
                </th>

                <th className="text-left font-semibold">
                  Status
                </th>

                <th className="text-left font-semibold">
                  Joined
                </th>

                <th className="text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t transition hover:bg-slate-50"
                >
                  {/* NAME */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${roleColors[user.role].bg}`}
                      >
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>
                        <div className="font-semibold text-slate-900">
                          {user.name}

                          {user._id === currentUser.id && (
                            <span className="ml-2 text-xs font-normal text-slate-400">
                              (You)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="text-slate-600">
                    {user.email}
                  </td>

                  {/* ROLE */}
                  <td>
                    {user._id === currentUser.id ? (
                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${roleColors[user.role].bg} ${roleColors[user.role].text}`}
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
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold outline-none ${roleColors[user.role].bg} ${roleColors[user.role].text}`}
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                        user.isActive
                          ? "bg-green-50 text-green-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {user.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  {/* JOINED */}
                  <td className="text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString(
                      "en-IN"
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td>
                    {user._id !== currentUser.id && (
                      <button
                        onClick={() =>
                          handleToggleActive(
                            user._id,
                            user.isActive
                          )
                        }
                        disabled={loadingAction === user._id}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                          user.isActive
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {loadingAction === user._id
                          ? "Updating..."
                          : user.isActive
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-10 text-center text-slate-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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