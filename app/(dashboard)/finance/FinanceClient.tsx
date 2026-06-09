"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api-client";

const SERVICES = ["BIS-CRS","BIS-ISI","WPC-ETA","EPR","LMPC","CDSCO","ISO","BEE","Other"];
const PAYMENT_MODES = ["Bank Transfer","UPI","Cash","Cheque","Online"];

type PaymentStatus = "Paid" | "Partial" | "Pending";
type Invoice = {
  _id: string;
  invoiceNumber: string;
  client?: { _id: string; companyLegalName: string; clientId?: string };
  serviceType?: string;
  professionalFees: number;
  governmentFees: number;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  paymentMode?: string;
  dueDate?: string;
  notes?: string;
  createdAt: string;
};

const STATUS_STYLE: Record<PaymentStatus, string> = {
  Paid:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Partial: "bg-amber-50 text-amber-700 border border-amber-200",
  Pending: "bg-red-50 text-red-700 border border-red-200",
};

const STATUS_DOT: Record<PaymentStatus, string> = {
  Paid:    "bg-emerald-500",
  Partial: "bg-amber-400",
  Pending: "bg-red-500",
};

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

/* ── ADD INVOICE MODAL ─────────────────────────────────────── */
function AddInvoiceModal({
  clients,
  onClose,
  onSave,
}: {
  clients: any[];
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    client: "",
    serviceType: "",
    professionalFees: "",
    governmentFees: "",
    dueDate: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const total =
    (Number(form.professionalFees) || 0) + (Number(form.governmentFees) || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await apiFetch("/api/finance", {
        method: "POST",
        body: {
          ...form,
          professionalFees: Number(form.professionalFees) || 0,
          governmentFees: Number(form.governmentFees) || 0,
        },
      });
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create invoice.");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-lg">New Invoice / PI</h2>
            <p className="text-slate-400 text-xs mt-0.5">Create proforma invoice for client</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">Client *</label>
            <select
              required
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">— Select Client —</option>
              {clients.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.companyLegalName} {c.clientId ? `(${c.clientId})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">Service Type</label>
            <select
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">— Select Service —</option>
              {SERVICES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">Professional Fees (₹)</label>
              <input
                type="number"
                min="0"
                value={form.professionalFees}
                onChange={(e) => setForm({ ...form, professionalFees: e.target.value })}
                placeholder="0"
                className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">Govt. Fees (₹)</label>
              <input
                type="number"
                min="0"
                value={form.governmentFees}
                onChange={(e) => setForm({ ...form, governmentFees: e.target.value })}
                placeholder="0"
                className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Total preview */}
          {total > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-blue-600 font-medium">Total Amount</span>
              <span className="text-lg font-bold text-blue-700">{fmt(total)}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
          )}

          <div className="flex justify-end gap-3 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-600 disabled:opacity-50"
            >
              {saving ? "Creating…" : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── PAYMENT UPDATE MODAL ──────────────────────────────────── */
function PaymentModal({
  invoice,
  onClose,
  onSave,
}: {
  invoice: Invoice;
  onClose: () => void;
  onSave: () => void;
}) {
  const [paidAmount, setPaidAmount] = useState(String(invoice.paidAmount || 0));
  const [paymentMode, setPaymentMode] = useState(invoice.paymentMode || "");
  const [notes, setNotes] = useState(invoice.notes || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const paid = Number(paidAmount) || 0;
  const balance = Math.max(0, invoice.totalAmount - paid);
  const autoStatus: PaymentStatus = paid >= invoice.totalAmount ? "Paid" : paid > 0 ? "Partial" : "Pending";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await apiFetch(`/api/finance/${invoice._id}`, {
        method: "PATCH",
        body: { paidAmount: paid, paymentMode, notes },
      });
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update payment.");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-lg">Record Payment</h2>
            <p className="text-slate-400 text-xs mt-0.5">{invoice.invoiceNumber} · {invoice.client?.companyLegalName}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Invoice summary */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Invoice Total</span>
              <span className="font-bold">{fmt(invoice.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Previously Paid</span>
              <span className="text-emerald-600 font-medium">{fmt(invoice.paidAmount)}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-slate-500">Balance Due</span>
              <span className="font-bold text-red-600">{fmt(balance)}</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">Amount Paid (₹)</label>
            <input
              type="number"
              min="0"
              max={invoice.totalAmount}
              required
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Auto status preview */}
          <div className={`px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 ${STATUS_STYLE[autoStatus]}`}>
            <span className={`w-2 h-2 rounded-full ${STATUS_DOT[autoStatus]}`} />
            Status will be: {autoStatus}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">— Select Mode —</option>
              {PAYMENT_MODES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
          )}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm">Cancel</button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50"
            >
              {saving ? "Saving…" : "Record Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── MAIN ─────────────────────────────────────────────────── */
export default function FinanceClient({
  invoices: initial,
  clients,
  summary,
}: {
  invoices: Invoice[];
  clients: any[];
  summary: any;
}) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [payInvoice, setPayInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const refresh = () => router.refresh();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this invoice?")) return;
    setError("");
    try {
      await apiFetch(`/api/finance/${id}`, { method: "DELETE" });
      refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Delete failed.");
    }
  };

  const filtered = initial.filter((inv) => {
    const matchSearch =
      !search ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.client?.companyLegalName?.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (!filterStatus || inv.paymentStatus === filterStatus);
  });

  const outstanding = (summary.totalRevenue || 0) - (summary.totalPaid || 0);
  const collectionRate = summary.totalRevenue
    ? Math.round((summary.totalPaid / summary.totalRevenue) * 100)
    : 0;

  return (
    <div className="space-y-6 text-black">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance</h1>
          <p className="text-sm text-slate-500">{initial.length} invoices · {collectionRate}% collected</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow hover:from-blue-700"
        >
          + New Invoice
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Invoiced",
            value: fmt(summary.totalRevenue || 0),
            icon: "📄",
            bg: "from-slate-50 to-slate-100",
            border: "border-slate-200",
          },
          {
            label: "Total Collected",
            value: fmt(summary.totalPaid || 0),
            icon: "✅",
            bg: "from-emerald-50 to-green-50",
            border: "border-emerald-200",
          },
          {
            label: "Outstanding",
            value: fmt(outstanding),
            icon: "⏳",
            bg: "from-red-50 to-orange-50",
            border: "border-red-200",
          },
          {
            label: "Collection Rate",
            value: `${collectionRate}%`,
            icon: "📊",
            bg: "from-blue-50 to-indigo-50",
            border: "border-blue-200",
          },
        ].map((card) => (
          <div key={card.label} className={`bg-gradient-to-br ${card.bg} border ${card.border} rounded-2xl p-5`}>
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="text-xl font-extrabold text-slate-900">{card.value}</div>
            <div className="text-xs text-slate-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Status summary pills */}
      <div className="flex gap-3 flex-wrap">
        {(["Paid","Partial","Pending"] as PaymentStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filterStatus === s ? STATUS_STYLE[s] + " ring-2 ring-offset-1" :
              "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${STATUS_DOT[s]}`} />
            {s} ({initial.filter((i) => i.paymentStatus === s).length})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <input
          placeholder="Search invoice or client…"
          className="border border-slate-200 rounded-xl p-2.5 text-sm w-64 outline-none focus:ring-2 focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {(search || filterStatus) && (
          <button
            onClick={() => { setSearch(""); setFilterStatus(""); }}
            className="text-xs px-3 py-2 text-slate-500 border rounded-xl hover:bg-slate-50"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Invoice table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wide text-left">
            <tr>
              <th className="px-5 py-3.5">Invoice #</th>
              <th className="px-5 py-3.5">Client</th>
              <th className="px-5 py-3.5">Service</th>
              <th className="px-5 py-3.5 text-right">Total</th>
              <th className="px-5 py-3.5 text-right">Paid</th>
              <th className="px-5 py-3.5 text-right">Balance</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Due</th>
              <th className="px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-5 py-12 text-center text-slate-400">
                  No invoices found
                </td>
              </tr>
            )}
            {filtered.map((inv) => {
              const balance = inv.totalAmount - inv.paidAmount;
              const isOverdue = inv.dueDate && new Date(inv.dueDate) < new Date() && inv.paymentStatus !== "Paid";
              return (
                <tr key={inv._id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-slate-600 font-semibold">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{inv.client?.companyLegalName || "—"}</div>
                    {inv.client?.clientId && (
                      <div className="text-xs text-slate-400 mt-0.5">{inv.client.clientId}</div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {inv.serviceType ? (
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded text-xs font-medium">
                        {inv.serviceType}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-4 text-right font-semibold">{fmt(inv.totalAmount)}</td>
                  <td className="px-5 py-4 text-right text-emerald-700 font-medium">{fmt(inv.paidAmount)}</td>
                  <td className="px-5 py-4 text-right text-red-600 font-semibold">
                    {balance > 0 ? fmt(balance) : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[inv.paymentStatus]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[inv.paymentStatus]}`} />
                      {inv.paymentStatus}
                    </span>
                  </td>
                  <td className={`px-5 py-4 text-xs ${isOverdue ? "text-red-600 font-semibold" : "text-slate-500"}`}>
                    {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("en-IN") : "—"}
                    {isOverdue && " ⚠️"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      {inv.paymentStatus !== "Paid" && (
                        <button
                          onClick={() => setPayInvoice(inv)}
                          className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-medium hover:bg-emerald-100 transition"
                        >
                          💰 Pay
                        </button>
                      )}
                      <a
                        href={`/api/finance/${inv._id}/pdf`}
                        target="_blank"
                        className="px-2.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-medium hover:bg-blue-100 transition"
                      >
                        📄 PDF
                      </a>
                      <button
                        onClick={() => handleDelete(inv._id)}
                        className="px-2.5 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-medium hover:bg-red-100 transition"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <AddInvoiceModal clients={clients} onClose={() => setShowAdd(false)} onSave={refresh} />
      )}
      {payInvoice && (
        <PaymentModal invoice={payInvoice} onClose={() => setPayInvoice(null)} onSave={refresh} />
      )}
    </div>
  );
}
