"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  "BIS CRS", "BIS ISI", "WPC ETA", "EPR Plastic",
  "EPR Battery", "EPR E-Waste", "LMPC", "ISO", "BEE", "CDSCO",
];

const stageProgress = {
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

const stageColor = {
  "Documents Pending": "#f59e0b",
  "Application Preparation": "#3b82f6",
  "Application Filed": "#6366f1",
  "Query Raised": "#ef4444",
  "Testing in Progress": "#0891b2",
  "Factory Audit": "#8b5cf6",
  "Approval Under Process": "#f97316",
  "Certificate Granted": "#16a34a",
  "Closed": "#64748b",
};

function StageTracker({ currentStage }) {
  const currentIndex = STAGES.indexOf(currentStage);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 4 }}>
      {STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={stage} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              minWidth: 80,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: done ? "#16a34a" : active ? stageColor[stage] : "#e2e8f0",
                color: done || active ? "white" : "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700,
                border: active ? `3px solid ${stageColor[stage]}40` : "none",
                boxShadow: active ? `0 0 0 4px ${stageColor[stage]}20` : "none",
              }}>
                {done ? "✓" : i + 1}
              </div>
              <div style={{
                fontSize: 9, fontWeight: 600, textAlign: "center",
                color: done ? "#16a34a" : active ? stageColor[stage] : "#94a3b8",
                lineHeight: 1.2, maxWidth: 70,
              }}>{stage}</div>
            </div>
            {i < STAGES.length - 1 && (
              <div style={{
                height: 2, width: 20, flexShrink: 0,
                background: done ? "#16a34a" : "#e2e8f0",
                marginBottom: 20,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function AddCertModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    clientId: "", certificationType: "", productName: "",
    modelNo: "", applicableStandard: "", applicationDate: "",
    renewalDate: "", remarks: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/certifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { onSave(); onClose(); }
    setSaving(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{
        background: "white", borderRadius: 16, padding: 32,
        width: "100%", maxWidth: 580, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>New Certification Application</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Client ID</label>
              <input value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })}
                className="form-input" placeholder="Client MongoDB ID" required />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Certification Type</label>
              <select value={form.certificationType} onChange={e => setForm({ ...form, certificationType: e.target.value })}
                className="form-input" required>
                <option value="">Select Type</option>
                {CERT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Product Name</label>
              <input value={form.productName} onChange={e => setForm({ ...form, productName: e.target.value })}
                className="form-input" placeholder="e.g. LED TV 43 inch" />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Model No.</label>
              <input value={form.modelNo} onChange={e => setForm({ ...form, modelNo: e.target.value })}
                className="form-input" placeholder="e.g. XYZ-43" />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Applicable Standard</label>
              <input value={form.applicableStandard} onChange={e => setForm({ ...form, applicableStandard: e.target.value })}
                className="form-input" placeholder="e.g. IS 13252" />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Application Date</label>
              <input type="date" value={form.applicationDate} onChange={e => setForm({ ...form, applicationDate: e.target.value })}
                className="form-input" />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Renewal Date</label>
              <input type="date" value={form.renewalDate} onChange={e => setForm({ ...form, renewalDate: e.target.value })}
                className="form-input" />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Remarks</label>
            <textarea value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })}
              className="form-input" rows={2} />
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? "Saving..." : "Create Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CertificationsClient({ certs: initialCerts }) {
  const router = useRouter();
  const [certs, setCerts] = useState(initialCerts);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("");
  const [filterType, setFilterType] = useState("");
  const [view, setView] = useState("table"); // table | cards

  const filtered = certs.filter(c => {
    const matchSearch = !search ||
      c.client?.companyLegalName?.toLowerCase().includes(search.toLowerCase()) ||
      c.productName?.toLowerCase().includes(search.toLowerCase()) ||
      c.applicationId?.toLowerCase().includes(search.toLowerCase());
    const matchStage = !filterStage || c.currentStage === filterStage;
    const matchType = !filterType || c.certificationType === filterType;
    return matchSearch && matchStage && matchType;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Certifications</h1>
          <p style={{ color: "#64748b", fontSize: 14 }}>{certs.length} applications tracked</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setView(view === "table" ? "cards" : "table")}
            className="btn btn-outline"
          >
            {view === "table" ? "🗂️ Card View" : "📋 Table View"}
          </button>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            ➕ New Application
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          placeholder="Search client, product, app ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input"
          style={{ maxWidth: 280 }}
        />
        <select value={filterStage} onChange={e => setFilterStage(e.target.value)} className="form-input" style={{ maxWidth: 220 }}>
          <option value="">All Stages</option>
          {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="form-input" style={{ maxWidth: 180 }}>
          <option value="">All Types</option>
          {CERT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Card View */}
      {view === "cards" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
          {filtered.map(cert => (
            <div key={cert._id} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#2563eb", fontWeight: 700, marginBottom: 4 }}>{cert.applicationId}</div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{cert.client?.companyLegalName || "—"}</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>{cert.productName} {cert.modelNo && `• ${cert.modelNo}`}</div>
                </div>
                <span style={{
                  background: stageColor[cert.currentStage] + "18",
                  color: stageColor[cert.currentStage],
                  padding: "4px 10px", borderRadius: 8,
                  fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                }}>{cert.certificationType}</span>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>{cert.currentStage}</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{stageProgress[cert.currentStage] || 0}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${stageProgress[cert.currentStage] || 0}%` }} />
                </div>
              </div>

              {cert.renewalDate && (
                <div style={{ fontSize: 12, color: "#f97316" }}>
                  🔄 Renewal: {new Date(cert.renewalDate).toLocaleDateString("en-IN")}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Client</th>
                <th>Type</th>
                <th>Product</th>
                <th>Stage</th>
                <th>Progress</th>
                <th>Consultant</th>
                <th>Renewal</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>No certifications found</td></tr>
              ) : filtered.map(cert => (
                <tr key={cert._id}>
                  <td style={{ fontWeight: 700, color: "#2563eb", fontSize: 12 }}>{cert.applicationId}</td>
                  <td style={{ fontWeight: 600 }}>{cert.client?.companyLegalName || "—"}</td>
                  <td>
                    <span style={{
                      background: "#eff6ff", color: "#2563eb",
                      padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                    }}>{cert.certificationType}</span>
                  </td>
                  <td style={{ fontSize: 13, color: "#374151" }}>
                    {cert.productName || "—"}
                    {cert.modelNo && <div style={{ fontSize: 11, color: "#94a3b8" }}>{cert.modelNo}</div>}
                  </td>
                  <td>
                    <span style={{
                      background: stageColor[cert.currentStage] + "18",
                      color: stageColor[cert.currentStage],
                      padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                    }}>{cert.currentStage}</span>
                  </td>
                  <td style={{ minWidth: 120 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{ width: `${stageProgress[cert.currentStage] || 0}%` }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
                        {stageProgress[cert.currentStage] || 0}%
                      </span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: "#64748b" }}>{cert.assignedConsultant?.name || "—"}</td>
                  <td style={{ fontSize: 13, color: cert.renewalDate ? "#f97316" : "#94a3b8" }}>
                    {cert.renewalDate ? new Date(cert.renewalDate).toLocaleDateString("en-IN") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && <AddCertModal onClose={() => setShowModal(false)} onSave={() => router.refresh()} />}
    </div>
  );
}