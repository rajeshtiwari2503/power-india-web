 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PAYMENT_MODES = ["Cash", "Bank Transfer", "UPI", "Cheque", "Online"];
const PAYMENT_STATUSES = ["Paid", "Pending", "Partial"];

function PaymentUpdateModal({ invoice, onClose, onSave }) {
  const [paidAmount, setPaidAmount] = useState(invoice.paidAmount || 0);
  const [paymentMode, setPaymentMode] = useState(invoice.paymentMode || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/finance/${invoice._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paidAmount: Number(paidAmount), paymentMode }),
    });
    onSave();
    onClose();
    setSaving(false);
  };

  const balance = Math.max(0, (invoice.totalAmount || 0) - Number(paidAmount));
  const status = Number(paidAmount) >= invoice.totalAmount ? "Paid" : Number(paidAmount) > 0 ? "Partial" : "Pending";
  const statusColors = { Paid: "#16a34a", Partial: "#f97316", Pending: "#dc2626" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "white", borderRadius: 16, padding: 32, width: "100%", maxWidth: 420, boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800 }}>Update Payment</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{invoice.invoiceNumber}</div>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>{invoice.client?.companyLegalName}</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: "#64748b" }}>Total Invoice</span>
            <span style={{ fontWeight: 700 }}>Rs {(invoice.totalAmount || 0).toLocaleString("en-IN")}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Amount Paid (Rs)</label>
            <input type="number" value={paidAmount} onChange={e => setPaidAmount(e.target.value)}
              className="form-input" max={invoice.totalAmount} min={0} step={100} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Payment Mode</label>
            <select value={paymentMode} onChange={e => setPaymentMode(e.target.value)} className="form-input">
              <option value="">Select Mode</option>
              {PAYMENT_MODES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
              <span style={{ color: "#64748b" }}>Balance Due</span>
              <span style={{ fontWeight: 700, color: balance > 0 ? "#dc2626" : "#16a34a" }}>Rs {balance.toLocaleString("en-IN")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#64748b" }}>New Status</span>
              <span style={{ fontWeight: 700, color: statusColors[status] }}>{status}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" disabled={saving} className="btn btn-primary">{saving ? "Updating..." : "Update Payment"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InvoiceModal({ onClose, onSave }) {
  const [form, setForm] = useState({ clientId: "", serviceType: "", professionalFees: "", governmentFees: "", paymentMode: "", dueDate: "", notes: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/finance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, professionalFees: Number(form.professionalFees), governmentFees: Number(form.governmentFees) }),
    });
    if (res.ok) { onSave(); onClose(); }
    setSaving(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "white", borderRadius: 16, padding: 32, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>Create Invoice</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[
              { label: "Client ID *", name: "clientId", placeholder: "MongoDB Client _id" },
              { label: "Service Type", name: "serviceType", placeholder: "e.g. BIS-CRS" },
              { label: "Professional Fees (Rs)", name: "professionalFees", type: "number" },
              { label: "Government Fees (Rs)", name: "governmentFees", type: "number" },
              { label: "Due Date", name: "dueDate", type: "date" },
            ].map(f => (
              <div key={f.name}>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label}</label>
                <input type={f.type || "text"} value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })} className="form-input" placeholder={f.placeholder} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Payment Mode</label>
              <select value={form.paymentMode} onChange={e => setForm({ ...form, paymentMode: e.target.value })} className="form-input">
                <option value="">Select Mode</option>
                {PAYMENT_MODES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Notes</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="form-input" rows={2} />
          </div>
          {(form.professionalFees || form.governmentFees) && (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
              Total: <strong>Rs {((Number(form.professionalFees) || 0) + (Number(form.governmentFees) || 0)).toLocaleString("en-IN")}</strong>
            </div>
          )}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" disabled={saving} className="btn btn-primary">{saving ? "Saving..." : "Create Invoice"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function FinanceClient({ invoices: initialInvoices }) {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  const invoices = initialInvoices;
  const totalRevenue = invoices.reduce((s, i) => s + (i.paidAmount || 0), 0);
  const totalPending = invoices.reduce((s, i) => s + Math.max(0, (i.totalAmount || 0) - (i.paidAmount || 0)), 0);
  const totalInvoiced = invoices.reduce((s, i) => s + (i.totalAmount || 0), 0);

  const filtered = invoices.filter(inv => {
    const matchSearch = !search || inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) || inv.client?.companyLegalName?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || inv.paymentStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Finance & Invoices</h1>
          <p style={{ color: "#64748b", fontSize: 14 }}>{invoices.length} invoices total</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">+ Create Invoice</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <div className="stat-card">
          <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Total Invoiced</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>Rs {(totalInvoiced/1000).toFixed(1)}K</div>
        </div>
        <div className="stat-card">
          <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Collected</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#16a34a" }}>Rs {(totalRevenue/1000).toFixed(1)}K</div>
          <div style={{ height: 4, background: "#f1f5f9", borderRadius: 999, marginTop: 8 }}>
            <div style={{ height: "100%", background: "#16a34a", borderRadius: 999, width: totalInvoiced > 0 ? `${(totalRevenue/totalInvoiced)*100}%` : "0%" }} />
          </div>
        </div>
        <div className="stat-card">
          <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Pending</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#f97316" }}>Rs {(totalPending/1000).toFixed(1)}K</div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{invoices.filter(i => i.paymentStatus !== "Paid").length} unpaid</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input placeholder="Search invoice or client..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" style={{ maxWidth: 280 }} />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="form-input" style={{ maxWidth: 180 }}>
          <option value="">All Statuses</option>
          {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th><th>Client</th><th>Service</th><th>Total</th>
              <th>Paid</th><th>Balance</th><th>Status</th><th>Due Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>No invoices found</td></tr>
            ) : filtered.map(inv => {
              const balance = Math.max(0, (inv.totalAmount || 0) - (inv.paidAmount || 0));
              const isOverdue = inv.paymentStatus !== "Paid" && inv.dueDate && new Date(inv.dueDate) < new Date();
              return (
                <tr key={inv._id}>
                  <td style={{ fontWeight: 700, color: "#2563eb", fontSize: 12 }}>{inv.invoiceNumber}</td>
                  <td style={{ fontWeight: 600 }}>{inv.client?.companyLegalName || "—"}</td>
                  <td style={{ fontSize: 13, color: "#64748b" }}>{inv.serviceType || "—"}</td>
                  <td style={{ fontWeight: 700 }}>Rs {(inv.totalAmount || 0).toLocaleString("en-IN")}</td>
                  <td style={{ color: "#16a34a", fontWeight: 600 }}>Rs {(inv.paidAmount || 0).toLocaleString("en-IN")}</td>
                  <td style={{ color: balance > 0 ? "#dc2626" : "#16a34a", fontWeight: 600 }}>Rs {balance.toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`badge badge-${inv.paymentStatus?.toLowerCase()}`}>{inv.paymentStatus}</span>
                    {isOverdue && <span style={{ marginLeft: 4, fontSize: 10, color: "#dc2626", fontWeight: 700 }}>OVERDUE</span>}
                  </td>
                  <td style={{ fontSize: 13, color: isOverdue ? "#dc2626" : "#64748b", fontWeight: isOverdue ? 700 : 400 }}>
                    {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("en-IN") : "—"}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setPaymentModal(inv)} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: "#eff6ff", color: "#2563eb", border: "none", cursor: "pointer" }}>
                        Pay
                      </button>
                      <button onClick={() => window.open(`/api/finance/${inv._id}/pdf`, "_blank")} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: "#f0fdf4", color: "#16a34a", border: "none", cursor: "pointer" }}>
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showCreateModal && <InvoiceModal onClose={() => setShowCreateModal(false)} onSave={() => router.refresh()} />}
      {paymentModal && <PaymentUpdateModal invoice={paymentModal} onClose={() => setPaymentModal(null)} onSave={() => router.refresh()} />}
    </div>
  );
}