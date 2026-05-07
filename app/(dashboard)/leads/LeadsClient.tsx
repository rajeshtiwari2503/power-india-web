 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SERVICES = ["BIS-CRS","BIS-ISI","WPC-ETA","EPR","LMPC","CDSCO","ISO","BEE","Other"];
const SOURCES = ["Website","LinkedIn","Referral","Google","WhatsApp","Cold Call","Other"];
const STATUSES = ["New","Contacted","Proposal Sent","Converted","Lost"];
const PRIORITIES = ["Hot","Warm","Cold"];

type Lead = any;

/* ---------------- MODAL ---------------- */

function LeadModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    mobile: "",
    country: "India",
    source: "",
    interestedService: "",
    productName: "",
    priority: "Warm",
    status: "New",
    remarks: "",
    followUpDate: "",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSave();
      onClose();
    }

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-2xl">

        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold">Add New Lead</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">

            {[
              { label: "Company Name", name: "companyName", req: true },
              { label: "Contact Person", name: "contactPerson", req: true },
              { label: "Email", name: "email", type: "email" },
              { label: "Mobile", name: "mobile" },
              { label: "Product Name", name: "productName" },
              { label: "Country", name: "country" },
              { label: "Follow-up Date", name: "followUpDate", type: "date" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-sm font-semibold">{f.label}</label>
                <input
                  type={f.type || "text"}
                  required={f.req}
                  value={(form as any)[f.name]}
                  onChange={(e) =>
                    setForm({ ...form, [f.name]: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
            ))}

            {[
              { label: "Source", name: "source", opts: SOURCES },
              { label: "Service", name: "interestedService", opts: SERVICES },
              { label: "Priority", name: "priority", opts: PRIORITIES },
              { label: "Status", name: "status", opts: STATUSES },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-sm font-semibold">{f.label}</label>
                <select
                  value={(form as any)[f.name]}
                  onChange={(e) =>
                    setForm({ ...form, [f.name]: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 mt-1"
                >
                  <option value="">Select</option>
                  {f.opts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <textarea
            placeholder="Remarks"
            value={form.remarks}
            onChange={(e) =>
              setForm({ ...form, remarks: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {saving ? "Saving..." : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function LeadsClient({ leads }: { leads: Lead[] }) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const filtered = leads.filter((l) => {
    const matchSearch =
      !search ||
      l.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      l.contactPerson?.toLowerCase().includes(search.toLowerCase());

    return (
      matchSearch &&
      (!filterStatus || l.status === filterStatus) &&
      (!filterPriority || l.priority === filterPriority)
    );
  });

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    router.refresh();
  };

  const handleProposal = (lead: Lead) => {
    const svc = lead.interestedService || "BIS-CRS";
    window.open(
      `/api/proposals/generate?leadId=${lead._id}&service=${svc}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-4 text-black">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-sm text-gray-500">{leads.length} total</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Lead
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2">

        <input
          placeholder="Search..."
          className="border rounded-lg p-2 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          className="border rounded-lg p-2"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          {PRIORITIES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Company</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Follow-up</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((lead) => (
              <tr key={lead._id} className="border-t">

                <td className="p-3 font-semibold">
                  {lead.companyName}
                </td>

                <td>
                  <div>{lead.contactPerson}</div>
                  <div className="text-xs text-gray-500">
                    {lead.mobile}
                  </div>
                </td>

                <td>
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                    {lead.interestedService || "—"}
                  </span>
                </td>

                <td>{lead.priority}</td>

                <td>
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(lead._id, e.target.value)
                    }
                    className="border rounded p-1 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>

                <td className="text-gray-500 text-sm">
                  {lead.followUpDate
                    ? new Date(lead.followUpDate).toLocaleDateString(
                        "en-IN"
                      )
                    : "—"}
                </td>

                <td>
                  <button
                    onClick={() => handleProposal(lead)}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs"
                  >
                    Proposal
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <LeadModal
          onClose={() => setShowModal(false)}
          onSave={() => router.refresh()}
        />
      )}
    </div>
  );
}