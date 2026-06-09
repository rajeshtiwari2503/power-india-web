"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api-client";

const CATEGORIES = ["Manufacturer", "Importer", "Trader"];
const SERVICES   = ["BIS-CRS","BIS-ISI","WPC-ETA","EPR","LMPC","CDSCO","ISO","BEE","Other"];

type Client = {
  _id: string;
  clientId?: string;
  companyLegalName: string;
  gstNumber?: string;
  panNumber?: string;
  iec?: string;
  contactPerson?: string;
  mobile?: string;
  emails?: string[];
  category?: string;
  servicesTaken?: string[];
  officeAddress?: string;
  factoryAddress?: string;
  isActive: boolean;
  createdAt: string;
};

const CAT_STYLE: Record<string, string> = {
  Manufacturer: "bg-blue-50 text-blue-700 border-blue-200",
  Importer:     "bg-purple-50 text-purple-700 border-purple-200",
  Trader:       "bg-amber-50 text-amber-700 border-amber-200",
};

/* ── DETAIL DRAWER ─────────────────────────────────────────── */
function ClientDrawer({ client, onClose }: { client: Client; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-6 flex-shrink-0">
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl font-black text-white">
              {client.companyLegalName.charAt(0)}
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
          </div>
          <h2 className="text-white font-bold text-lg leading-tight">{client.companyLegalName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-slate-400 text-xs font-mono">{client.clientId}</span>
            {client.category && (
              <span className={`text-xs px-2 py-0.5 rounded border ${CAT_STYLE[client.category] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                {client.category}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 flex-1">
          {/* Contact */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Contact</h3>
            <div className="space-y-2">
              {client.contactPerson && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 text-slate-400">👤</span>
                  <span>{client.contactPerson}</span>
                </div>
              )}
              {client.mobile && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 text-slate-400">📱</span>
                  <a href={`tel:${client.mobile}`} className="text-blue-600 hover:underline">{client.mobile}</a>
                </div>
              )}
              {client.emails?.map((e, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-6 text-slate-400">✉</span>
                  <a href={`mailto:${e}`} className="text-blue-600 hover:underline">{e}</a>
                </div>
              ))}
            </div>
          </section>

          {/* Legal */}
          <section className="border-t pt-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Legal IDs</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "GST", value: client.gstNumber },
                { label: "PAN", value: client.panNumber },
                { label: "IEC", value: client.iec },
              ].map(({ label, value }) => value ? (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">{label}</div>
                  <div className="text-sm font-mono font-semibold text-slate-800 break-all">{value}</div>
                </div>
              ) : null)}
            </div>
          </section>

          {/* Services */}
          {client.servicesTaken && client.servicesTaken.length > 0 && (
            <section className="border-t pt-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Services Taken</h3>
              <div className="flex flex-wrap gap-2">
                {client.servicesTaken.map((s) => (
                  <span key={s} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Address */}
          {(client.officeAddress || client.factoryAddress) && (
            <section className="border-t pt-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Address</h3>
              {client.officeAddress && (
                <div className="text-sm text-slate-600 mb-2">
                  <span className="text-slate-400 text-xs block mb-1">Office</span>
                  {client.officeAddress}
                </div>
              )}
              {client.factoryAddress && (
                <div className="text-sm text-slate-600">
                  <span className="text-slate-400 text-xs block mb-1">Factory</span>
                  {client.factoryAddress}
                </div>
              )}
            </section>
          )}

          <div className="text-xs text-slate-400 border-t pt-4">
            Registered: {new Date(client.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ADD CLIENT MODAL ──────────────────────────────────────── */
function AddClientModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    companyLegalName: "", gstNumber: "", panNumber: "", iec: "",
    officeAddress: "", factoryAddress: "", contactPerson: "", mobile: "",
    email: "", category: "", servicesTaken: [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      servicesTaken: f.servicesTaken.includes(s)
        ? f.servicesTaken.filter((x) => x !== s)
        : [...f.servicesTaken, s],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await apiFetch("/api/clients", {
        method: "POST",
        body: { ...form, emails: form.email ? [form.email] : [] },
      });
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create client.");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-white font-bold text-lg">Add New Client</h2>
            <p className="text-slate-400 text-xs mt-0.5">Register a company in the system</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Company Legal Name *</label>
            <input
              required value={form.companyLegalName}
              onChange={(e) => setForm({ ...form, companyLegalName: e.target.value })}
              placeholder="ABC Technologies Pvt. Ltd."
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Contact Person", name: "contactPerson", placeholder: "Rajesh Kumar" },
              { label: "Mobile", name: "mobile", placeholder: "+91 98765 43210" },
              { label: "Email", name: "email", placeholder: "info@company.com" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                <input
                  value={form[f.name as keyof typeof form] as string}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">— Select —</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "GST Number", name: "gstNumber" },
              { label: "PAN Number", name: "panNumber" },
              { label: "IEC Code", name: "iec" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                <input
                  value={form[f.name as keyof typeof form] as string}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Services Required</label>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleService(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    form.servicesTaken.includes(s)
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Office Address", name: "officeAddress" },
              { label: "Factory Address", name: "factoryAddress" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                <textarea
                  rows={2}
                  value={form[f.name as keyof typeof form] as string}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium">Cancel</button>
            <button
              type="submit" disabled={saving}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-semibold shadow hover:from-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── MAIN ─────────────────────────────────────────────────── */
export default function ClientsClient({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [showAdd, setShowAdd]     = useState(false);
  const [selected, setSelected]   = useState<Client | null>(null);
  const [search, setSearch]       = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [error, setError]         = useState("");

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      c.companyLegalName.toLowerCase().includes(q) ||
      c.clientId?.toLowerCase().includes(q) ||
      c.contactPerson?.toLowerCase().includes(q) ||
      c.mobile?.includes(q);
    return matchSearch && (!filterCat || c.category === filterCat);
  });

  const handleDeactivate = async (id: string) => {
    if (!confirm("Deactivate this client?")) return;
    setError("");
    try {
      await apiFetch(`/api/clients/${id}`, { method: "PATCH", body: { isActive: false } });
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed.");
    }
  };

  return (
    <div className="space-y-6 text-black">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-sm text-slate-500">{clients.length} active clients</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:from-blue-700"
        >
          + Add Client
        </button>
      </div>

      {/* Category stat pills */}
      <div className="flex gap-3 flex-wrap">
        {CATEGORIES.map((cat) => {
          const count = clients.filter((c) => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilterCat(filterCat === cat ? "" : cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                filterCat === cat
                  ? CAT_STYLE[cat] + " ring-2 ring-offset-1"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
        <button
          onClick={() => setFilterCat("")}
          className={`px-4 py-2 rounded-xl text-sm border transition-all ${!filterCat ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
        >
          All ({clients.length})
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        <input
          placeholder="Search company, ID, mobile…"
          className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Client grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-slate-400">
            <div className="text-4xl mb-3">👥</div>
            <p>No clients found</p>
          </div>
        )}
        {filtered.map((client) => (
          <div
            key={client._id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
            onClick={() => setSelected(client)}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                  {client.companyLegalName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {client.companyLegalName}
                  </p>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">{client.clientId || "—"}</p>
                </div>
              </div>
              {client.category && (
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex-shrink-0 ${CAT_STYLE[client.category] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                  {client.category}
                </span>
              )}
            </div>

            {/* Contact row */}
            {(client.contactPerson || client.mobile) && (
              <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                <span className="text-slate-400">👤</span>
                <span className="truncate">{client.contactPerson}</span>
                {client.mobile && <span className="text-slate-400 ml-auto text-xs">{client.mobile}</span>}
              </div>
            )}

            {/* Services */}
            {client.servicesTaken && client.servicesTaken.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {client.servicesTaken.slice(0, 3).map((s) => (
                  <span key={s} className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                    {s}
                  </span>
                ))}
                {client.servicesTaken.length > 3 && (
                  <span className="text-[10px] text-slate-400">+{client.servicesTaken.length - 3}</span>
                )}
              </div>
            )}

            {/* Legal IDs */}
            <div className="flex gap-2 text-[10px]">
              {client.gstNumber && <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded font-mono">GST ✓</span>}
              {client.panNumber && <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded font-mono">PAN ✓</span>}
              {client.iec       && <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded font-mono">IEC ✓</span>}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">
                {new Date(client.createdAt).toLocaleDateString("en-IN")}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); handleDeactivate(client._id); }}
                className="text-xs text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
              >
                Deactivate
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && <AddClientModal onClose={() => setShowAdd(false)} onSave={() => router.refresh()} />}
      {selected && <ClientDrawer client={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
