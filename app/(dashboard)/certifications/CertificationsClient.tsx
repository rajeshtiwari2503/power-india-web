"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api-client";

const STAGES = [
  "Documents Pending","Application Preparation","Application Filed",
  "Query Raised","Testing in Progress","Factory Audit",
  "Approval Under Process","Certificate Granted","Closed",
];
const CERT_TYPES = [
  "BIS CRS","BIS ISI","WPC ETA","EPR Plastic","EPR Battery",
  "EPR E-Waste","LMPC","ISO","BEE","CDSCO",
];

const STAGE_PROGRESS: Record<string, number> = {
  "Documents Pending": 8, "Application Preparation": 20,
  "Application Filed": 35, "Query Raised": 45,
  "Testing in Progress": 58, "Factory Audit": 70,
  "Approval Under Process": 82, "Certificate Granted": 100, "Closed": 100,
};

const STAGE_COLOR: Record<string, string> = {
  "Documents Pending":      "bg-slate-100 text-slate-600",
  "Application Preparation":"bg-blue-100 text-blue-700",
  "Application Filed":      "bg-indigo-100 text-indigo-700",
  "Query Raised":           "bg-orange-100 text-orange-700",
  "Testing in Progress":    "bg-yellow-100 text-yellow-700",
  "Factory Audit":          "bg-purple-100 text-purple-700",
  "Approval Under Process": "bg-cyan-100 text-cyan-700",
  "Certificate Granted":    "bg-emerald-100 text-emerald-700",
  "Closed":                 "bg-slate-200 text-slate-500",
};

type Cert = {
  _id: string;
  applicationId: string;
  certificationType: string;
  productName?: string;
  modelNo?: string;
  currentStage: string;
  progressPercent?: number;
  client?: { _id: string; companyLegalName: string; clientId?: string };
  assignedConsultant?: { name: string };
  renewalDate?: string;
  applicationDate?: string;
  notes?: string;
  createdAt: string;
};

/* ── ADD CERT MODAL ────────────────────────────────────────── */
function AddCertModal({ clients, onClose, onSave }: { clients: any[]; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    client: "", certificationType: "", productName: "", modelNo: "",
    applicableStandard: "", applicationDate: "", renewalDate: "", notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await apiFetch("/api/certifications", {
        method: "POST",
        body: { ...form, clientId: form.client },
      });
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create certification.");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-white font-bold text-lg">New Certification</h2>
            <p className="text-slate-400 text-xs mt-0.5">Start a new certification application</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Client *</label>
            <select required value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">— Select Client —</option>
              {clients.map((c) => (
                <option key={c._id} value={c._id}>{c.companyLegalName} {c.clientId ? `(${c.clientId})` : ""}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Certification Type *</label>
            <select required value={form.certificationType} onChange={(e) => setForm({ ...form, certificationType: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">— Select Type —</option>
              {CERT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Product Name", name: "productName" },
              { label: "Model No.", name: "modelNo" },
              { label: "Applicable Standard", name: "applicableStandard" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                <input
                  value={form[f.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Application Date</label>
              <input type="date" value={form.applicationDate} onChange={(e) => setForm({ ...form, applicationDate: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>

          <textarea placeholder="Notes" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none" />

          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm">Cancel</button>
            <button type="submit" disabled={saving}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50">
              {saving ? "Creating…" : "Create Certification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── STAGE UPDATE MODAL ────────────────────────────────────── */
function StageModal({ cert, onClose, onSave }: { cert: Cert; onClose: () => void; onSave: () => void }) {
  const [stage, setStage] = useState(cert.currentStage);
  const [notes, setNotes] = useState(cert.notes || "");
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  const progress = STAGE_PROGRESS[stage] || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await apiFetch(`/api/certifications/${cert._id}`, {
        method: "PATCH",
        body: { currentStage: stage, progressPercent: progress, notes },
      });
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update stage.");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-lg">Update Stage</h2>
            <p className="text-slate-400 text-xs mt-0.5">{cert.applicationId} · {cert.client?.companyLegalName}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Stage</label>
            <select value={stage} onChange={(e) => setStage(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400">
              {STAGES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Progress preview */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Progress</span><span className="font-bold">{progress}%</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: progress === 100 ? "#10b981" : "linear-gradient(90deg, #3b82f6, #6366f1)"
                }}
              />
            </div>
          </div>

          <textarea placeholder="Notes / Remarks" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none" />

          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm">Cancel</button>
            <button type="submit" disabled={saving}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50">
              {saving ? "Saving…" : "Update Stage"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── MAIN ─────────────────────────────────────────────────── */
export default function CertificationsClient({ certs, clients }: { certs: Cert[]; clients: any[] }) {
  const router = useRouter();
  const [showAdd, setShowAdd]     = useState(false);
  const [stageModal, setStageModal] = useState<Cert | null>(null);
  const [filterType, setFilterType] = useState("");
  const [filterStage, setFilterStage] = useState("");
  const [search, setSearch]       = useState("");

  const filtered = certs.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      c.applicationId?.toLowerCase().includes(q) ||
      c.client?.companyLegalName?.toLowerCase().includes(q) ||
      c.productName?.toLowerCase().includes(q);
    return matchSearch &&
      (!filterType  || c.certificationType === filterType) &&
      (!filterStage || c.currentStage === filterStage);
  });

  const active    = certs.filter((c) => c.currentStage !== "Certificate Granted" && c.currentStage !== "Closed").length;
  const granted   = certs.filter((c) => c.currentStage === "Certificate Granted").length;
  const queryRaised = certs.filter((c) => c.currentStage === "Query Raised").length;

  return (
    <div className="space-y-6 text-black">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Certifications</h1>
          <p className="text-sm text-slate-500">{active} active · {granted} granted · {certs.length} total</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow hover:from-blue-700"
        >
          + New Certification
        </button>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active", value: active, icon: "🔄", bg: "bg-blue-50 border-blue-200" },
          { label: "Granted", value: granted, icon: "✅", bg: "bg-emerald-50 border-emerald-200" },
          { label: "Query Raised", value: queryRaised, icon: "⚠️", bg: "bg-orange-50 border-orange-200" },
          { label: "Total", value: certs.length, icon: "📜", bg: "bg-slate-50 border-slate-200" },
        ].map((s) => (
          <div key={s.label} className={`border rounded-xl p-4 ${s.bg}`}>
            <span className="text-xl">{s.icon}</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            placeholder="Search application, company…"
            className="border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-300 w-56"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-300">
          <option value="">All Types</option>
          {CERT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-300">
          <option value="">All Stages</option>
          {STAGES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Certification cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 bg-white border border-slate-200 rounded-2xl">
            <div className="text-4xl mb-3">📜</div>
            <p>No certifications found</p>
          </div>
        )}
        {filtered.map((cert) => {
          const progress = cert.progressPercent ?? STAGE_PROGRESS[cert.currentStage] ?? 0;
          const isGranted = cert.currentStage === "Certificate Granted";
          const isQuery   = cert.currentStage === "Query Raised";

          return (
            <div key={cert._id}
              className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all ${
                isGranted ? "border-emerald-200" : isQuery ? "border-orange-200" : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Top row */}
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-slate-400">{cert.applicationId}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${STAGE_COLOR[cert.currentStage] || "bg-slate-100 text-slate-600"}`}>
                      {cert.currentStage}
                    </span>
                    {isQuery && <span className="text-xs text-orange-600 font-semibold animate-pulse">⚠️ Action needed</span>}
                  </div>

                  {/* Company + cert type */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-slate-900">{cert.client?.companyLegalName || "Unknown Client"}</h3>
                    <span className="text-slate-300">·</span>
                    <span className="text-sm text-blue-600 font-semibold">{cert.certificationType}</span>
                  </div>

                  {/* Product info */}
                  {(cert.productName || cert.modelNo) && (
                    <p className="text-sm text-slate-500 mb-3">
                      {cert.productName}{cert.modelNo ? ` · ${cert.modelNo}` : ""}
                    </p>
                  )}

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                          background: isGranted
                            ? "#10b981"
                            : "linear-gradient(90deg, #3b82f6, #6366f1)"
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {cert.assignedConsultant && (
                    <span className="text-xs text-slate-500">👤 {cert.assignedConsultant.name}</span>
                  )}
                  {cert.renewalDate && (
                    <span className="text-xs text-slate-400">
                      🔄 {new Date(cert.renewalDate).toLocaleDateString("en-IN")}
                    </span>
                  )}
                  {!isGranted && (
                    <button
                      onClick={() => setStageModal(cert)}
                      className="mt-1 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-semibold hover:bg-blue-100 transition"
                    >
                      Update Stage
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd    && <AddCertModal clients={clients} onClose={() => setShowAdd(false)} onSave={() => router.refresh()} />}
      {stageModal && <StageModal cert={stageModal} onClose={() => setStageModal(null)} onSave={() => router.refresh()} />}
    </div>
  );
}
