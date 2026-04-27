"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Manufacturer", "Importer", "Trader"];
const SERVICES = ["BIS-CRS", "BIS-ISI", "WPC-ETA", "EPR", "LMPC", "CDSCO", "ISO", "BEE"];

function AddClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    companyLegalName: "", gstNumber: "", panNumber: "", iec: "",
    officeAddress: "", factoryAddress: "", contactPerson: "",
    mobile: "", email: "", category: "", servicesTaken: [],
  });
  const [saving, setSaving] = useState(false);

  const toggleService = (svc) => {
    setForm(f => ({
      ...f,
      servicesTaken: f.servicesTaken.includes(svc)
        ? f.servicesTaken.filter(s => s !== svc)
        : [...f.servicesTaken, svc],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, emails: [form.email] }),
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
        width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>Add New Client</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[
              { label: "Company Legal Name *", name: "companyLegalName", required: true },
              { label: "GST Number", name: "gstNumber" },
              { label: "PAN Number", name: "panNumber" },
              { label: "IEC (If Importer)", name: "iec" },
              { label: "Contact Person", name: "contactPerson" },
              { label: "Mobile", name: "mobile" },
              { label: "Email", name: "email", type: "email" },
            ].map(f => (
              <div key={f.name}>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label}</label>
                <input
                  type={f.type || "text"}
                  value={form[f.name]}
                  onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                  className="form-input"
                  required={f.required}
                />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="form-input">
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Address fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Office Address</label>
              <textarea value={form.officeAddress} onChange={e => setForm({ ...form, officeAddress: e.target.value })}
                className="form-input" rows={2} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Factory Address</label>
              <textarea value={form.factoryAddress} onChange={e => setForm({ ...form, factoryAddress: e.target.value })}
                className="form-input" rows={2} />
            </div>
          </div>

          {/* Services */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 10 }}>Services Taken</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SERVICES.map(svc => (
                <button
                  key={svc}
                  type="button"
                  onClick={() => toggleService(svc)}
                  style={{
                    padding: "5px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", border: "1px solid",
                    borderColor: form.servicesTaken.includes(svc) ? "#2563eb" : "#e2e8f0",
                    background: form.servicesTaken.includes(svc) ? "#eff6ff" : "white",
                    color: form.servicesTaken.includes(svc) ? "#2563eb" : "#64748b",
                  }}
                >{svc}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? "Saving..." : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ClientsClient({ clients }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filtered = clients.filter(c => {
    const matchSearch = !search ||
      c.companyLegalName?.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson?.toLowerCase().includes(search.toLowerCase()) ||
      c.gstNumber?.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCategory || c.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Clients</h1>
          <p style={{ color: "#64748b", fontSize: 14 }}>{clients.length} active clients</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">➕ Add Client</button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Search company, contact, GST..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input"
          style={{ maxWidth: 300 }}
        />
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="form-input" style={{ maxWidth: 200 }}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtered.length === 0 ? (
          <div style={{ color: "#94a3b8", padding: 40, gridColumn: "1/-1", textAlign: "center" }}>No clients found</div>
        ) : filtered.map(client => (
          <div key={client._id} className="stat-card" style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{client.companyLegalName}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{client.clientId}</div>
              </div>
              {client.category && (
                <span style={{
                  background: "#f0fdf4", color: "#16a34a",
                  padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
                }}>{client.category}</span>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
              {client.contactPerson && <div style={{ fontSize: 13, color: "#374151" }}>👤 {client.contactPerson}</div>}
              {client.mobile && <div style={{ fontSize: 13, color: "#64748b" }}>📞 {client.mobile}</div>}
              {client.gstNumber && <div style={{ fontSize: 12, color: "#64748b" }}>GST: {client.gstNumber}</div>}
            </div>

            {client.servicesTaken?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {client.servicesTaken.map(svc => (
                  <span key={svc} style={{
                    background: "#eff6ff", color: "#2563eb",
                    padding: "2px 6px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                  }}>{svc}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && <AddClientModal onClose={() => setShowModal(false)} onSave={() => router.refresh()} />}
    </div>
  );
}