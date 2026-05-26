 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api-client";

/* =========================
   CONSTANTS
========================= */

const CATEGORIES = ["Manufacturer", "Importer", "Trader"];
const SERVICES = [
  "BIS-CRS",
  "BIS-ISI",
  "WPC-ETA",
  "EPR",
  "LMPC",
  "CDSCO",
  "ISO",
  "BEE",
];

/* =========================
   TYPES (optional)
========================= */

type ClientType = {
  _id: string;
  companyLegalName: string;
  clientId?: string;
  gstNumber?: string;
  panNumber?: string;
  iec?: string;
  contactPerson?: string;
  mobile?: string;
  email?: string;
  category?: string;
  servicesTaken?: string[];
};

/* =========================
   MODAL
========================= */

function AddClientModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    companyLegalName: "",
    gstNumber: "",
    panNumber: "",
    iec: "",
    officeAddress: "",
    factoryAddress: "",
    contactPerson: "",
    mobile: "",
    email: "",
    category: "",
    servicesTaken: [] as string[],
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleService = (svc: string) => {
    setForm((prev) => ({
      ...prev,
      servicesTaken: prev.servicesTaken.includes(svc)
        ? prev.servicesTaken.filter((s) => s !== svc)
        : [...prev.servicesTaken, svc],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await apiFetch("/api/clients", {
        method: "POST",
        body: {
          ...form,
          emails: form.email ? [form.email] : [],
        },
      });
      onSave();
      onClose();
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to create client. Please try again.";
      setError(message);
    }

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold">Add New Client</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          {[
            { label: "Company Legal Name*", name: "companyLegalName", required: true },
            { label: "GST Number", name: "gstNumber" },
            { label: "PAN Number", name: "panNumber" },
            { label: "IEC", name: "iec" },
            { label: "Contact Person", name: "contactPerson" },
            { label: "Mobile", name: "mobile" },
            { label: "Email", name: "email", type: "email" },
          ].map((f) => (
            <div key={f.name}>
              <label className="text-xs font-semibold mb-1 block">
                {f.label}
              </label>
              <input
                type={f.type || "text"}
                required={f.required}
                value={(form as any)[f.name]}
                onChange={(e) =>
                  setForm({ ...form, [f.name]: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}

          {/* CATEGORY */}
          <div>
            <label className="text-xs font-semibold mb-1 block">
              Category
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="">Select</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* ADDRESSES */}
          <textarea
            placeholder="Office Address"
            className="col-span-1 border rounded-lg px-3 py-2 text-sm"
            onChange={(e) =>
              setForm({ ...form, officeAddress: e.target.value })
            }
          />

          <textarea
            placeholder="Factory Address"
            className="col-span-1 border rounded-lg px-3 py-2 text-sm"
            onChange={(e) =>
              setForm({ ...form, factoryAddress: e.target.value })
            }
          />

          {/* SERVICES */}
          <div className="col-span-2">
            <label className="text-sm font-semibold block mb-2">
              Services Taken
            </label>

            <div className="flex flex-wrap gap-2">
              {SERVICES.map((svc) => {
                const active = form.servicesTaken.includes(svc);

                return (
                  <button
                    type="button"
                    key={svc}
                    onClick={() => toggleService(svc)}
                    className={`px-3 py-1 rounded-lg text-sm border transition
                      ${
                        active
                          ? "bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                  >
                    {svc}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIONS */}
          {error && (
            <div className="col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {saving ? "Saving..." : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function ClientsClient({
  clients,
}: {
  clients: ClientType[];
}) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [error, setError] = useState("");

  const filtered = clients.filter((c) => {
    const matchSearch =
      !search ||
      c.companyLegalName?.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson?.toLowerCase().includes(search.toLowerCase()) ||
      c.gstNumber?.toLowerCase().includes(search.toLowerCase());

    const matchCat = !filterCategory || c.category === filterCategory;

    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 text-black">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-sm text-gray-500">
            {clients.length} active clients
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Client
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-5">
        <input
          className="border px-3 py-2 rounded-lg text-sm w-72"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded-lg text-sm"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map((client) => (
          <div
            key={client._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between mb-2">
              <div>
                <div className="font-bold">
                  {client.companyLegalName}
                </div>
                <div className="text-xs text-gray-500">
                  {client.clientId}
                </div>
              </div>

              {client.category && (
                <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">
                  {client.category}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              {client.contactPerson && <div>👤 {client.contactPerson}</div>}
              {client.mobile && <div>📞 {client.mobile}</div>}
              {client.gstNumber && <div>GST: {client.gstNumber}</div>}
            </div>

            {/* SERVICES */}
            <div className="flex flex-wrap gap-1 mt-3">
              {client.servicesTaken?.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <AddClientModal
          onClose={() => setShowModal(false)}
          onSave={() => router.refresh()}
        />
      )}
    </div>
  );
}