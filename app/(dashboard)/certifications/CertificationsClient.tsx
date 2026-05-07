 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* =========================
   CONSTANTS
========================= */

const STAGES = [
  "Documents Pending",
  "Application Preparation",
  "Application Filed",
  "Query Raised",
  "Testing in Progress",
  "Factory Audit",
  "Approval Under Process",
  "Certificate Granted",
  "Closed",
];

const CERT_TYPES = [
  "BIS CRS",
  "BIS ISI",
  "WPC ETA",
  "EPR Plastic",
  "EPR Battery",
  "EPR E-Waste",
  "LMPC",
  "ISO",
  "BEE",
  "CDSCO",
];

const stageProgress: Record<string, number> = {
  "Documents Pending": 5,
  "Application Preparation": 15,
  "Application Filed": 30,
  "Query Raised": 40,
  "Testing in Progress": 55,
  "Factory Audit": 70,
  "Approval Under Process": 85,
  "Certificate Granted": 100,
  "Closed": 100,
};

const stageColor: Record<string, string> = {
  "Documents Pending": "bg-amber-500",
  "Application Preparation": "bg-blue-500",
  "Application Filed": "bg-indigo-500",
  "Query Raised": "bg-red-500",
  "Testing in Progress": "bg-cyan-600",
  "Factory Audit": "bg-purple-500",
  "Approval Under Process": "bg-orange-500",
  "Certificate Granted": "bg-green-600",
  "Closed": "bg-slate-500",
};

/* =========================
   STAGE TRACKER
========================= */

function StageTracker({ currentStage }: { currentStage: string }) {
  const currentIndex = STAGES.indexOf(currentStage);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;

        return (
          <div key={stage} className="flex items-center ">
            <div className="flex flex-col items-center min-w-[80px] gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border
                ${
                  done
                    ? "bg-green-600 text-white"
                    : active
                    ? "bg-white border-2 border-blue-500 text-blue-600"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>

              <div
                className={`text-[10px] text-center leading-tight font-medium
                ${
                  done
                    ? "text-green-600"
                    : active
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                {stage}
              </div>
            </div>

            {i < STAGES.length - 1 && (
              <div
                className={`h-[2px] w-5 ${
                  done ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* =========================
   MODAL
========================= */

function AddCertModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    clientId: "",
    certificationType: "",
    productName: "",
    modelNo: "",
    applicableStandard: "",
    applicationDate: "",
    renewalDate: "",
    remarks: "",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/certifications", {
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
      <div className="bg-white w-full max-w-xl rounded-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold">New Certification Application</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input
            placeholder="Client ID"
            className="input"
            value={form.clientId}
            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
          />

          <select
            className="input"
            value={form.certificationType}
            onChange={(e) =>
              setForm({ ...form, certificationType: e.target.value })
            }
          >
            <option value="">Select Type</option>
            {CERT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <input
            placeholder="Product Name"
            className="input"
            onChange={(e) =>
              setForm({ ...form, productName: e.target.value })
            }
          />

          <input
            placeholder="Model No"
            className="input"
            onChange={(e) => setForm({ ...form, modelNo: e.target.value })}
          />

          <input
            placeholder="Standard"
            className="input"
            onChange={(e) =>
              setForm({ ...form, applicableStandard: e.target.value })
            }
          />

          <input
            type="date"
            className="input"
            onChange={(e) =>
              setForm({ ...form, applicationDate: e.target.value })
            }
          />

          <input
            type="date"
            className="input"
            onChange={(e) =>
              setForm({ ...form, renewalDate: e.target.value })
            }
          />

          <textarea
            placeholder="Remarks"
            className="input col-span-2"
            onChange={(e) =>
              setForm({ ...form, remarks: e.target.value })
            }
          />

          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              {saving ? "Saving..." : "Create"}
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

export default function CertificationsClient({
  certs: initialCerts,
}: any) {
  const router = useRouter();

  const [certs] = useState(initialCerts);
  const [view, setView] = useState<"table" | "cards">("table");
  const [showModal, setShowModal] = useState(false);

  const filtered = certs;

  return (
    <div className="p-6 text-black">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Certifications</h1>
          <p className="text-sm text-gray-500">
            {certs.length} applications tracked
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="btn-outline"
            onClick={() =>
              setView(view === "table" ? "cards" : "table")
            }
          >
            Toggle View
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="btn-primary"
          >
            + New Application
          </button>
        </div>
      </div>

      {/* TABLE */}
      {view === "table" ? (
        <div className="overflow-x-auto bg-white rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">App ID</th>
                <th>Client</th>
                <th>Type</th>
                <th>Product</th>
                <th>Stage</th>
                <th>Progress</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c: any) => (
                <tr key={c._id} className="border-t">
                  <td className="p-3 font-bold text-blue-600">
                    {c.applicationId}
                  </td>
                  <td>{c.client?.companyLegalName}</td>
                  <td>
                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
                      {c.certificationType}
                    </span>
                  </td>
                  <td>{c.productName}</td>
                  <td>{c.currentStage}</td>
                  <td>{stageProgress[c.currentStage] || 0}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARDS */
        <div className="grid md:grid-cols-3 gap-4">
          {filtered.map((c: any) => (
            <div
              key={c._id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <div className="font-bold text-blue-600">
                {c.applicationId}
              </div>
              <div className="font-semibold">
                {c.client?.companyLegalName}
              </div>
              <div className="text-sm text-gray-500">
                {c.productName}
              </div>
              <div className="mt-2 text-xs">
                {c.currentStage}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddCertModal
          onClose={() => setShowModal(false)}
          onSave={() => router.refresh()}
        />
      )}
    </div>
  );
}