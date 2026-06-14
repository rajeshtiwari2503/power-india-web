"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api-client";

/* ─── Constants ─────────────────────────────────────────────── */
const SERVICES   = ["BIS-CRS","BIS-ISI","WPC-ETA","EPR","LMPC","CDSCO","ISO","BEE","Other"];
const SOURCES    = ["Website","LinkedIn","Referral","Google","WhatsApp","Cold Call","Other"];
const PRIORITIES = ["Hot","Warm","Cold"];

const STAGE_LABELS: Record<number,string> = {
  1:"Lead Created", 2:"Task Assigned", 3:"Follow-up",
  4:"Client Response", 5:"Client Created", 6:"PI Generated",
  7:"Payment Done", 8:"Certificate", 9:"Lead Complete",
};

const STAGE_ICONS: Record<number,string> = {
  1:"🆕", 2:"📋", 3:"📞", 4:"💬", 5:"🏢", 6:"📄", 7:"💰", 8:"🏆", 9:"✅",
};

const STAGE_BG: Record<number,string> = {
  1:"bg-slate-100 text-slate-700 border-slate-300",
  2:"bg-blue-100 text-blue-700 border-blue-300",
  3:"bg-yellow-100 text-yellow-700 border-yellow-300",
  4:"bg-orange-100 text-orange-700 border-orange-300",
  5:"bg-purple-100 text-purple-700 border-purple-300",
  6:"bg-indigo-100 text-indigo-700 border-indigo-300",
  7:"bg-green-100 text-green-700 border-green-300",
  8:"bg-teal-100 text-teal-700 border-teal-300",
  9:"bg-emerald-100 text-emerald-800 border-emerald-400",
};

const STAGE_LINE: Record<number,string> = {
  1:"#94a3b8", 2:"#3b82f6", 3:"#eab308", 4:"#f97316",
  5:"#9333ea", 6:"#6366f1", 7:"#22c55e", 8:"#14b8a6", 9:"#10b981",
};

const STATUS_STYLE: Record<string,string> = {
  "New":"bg-slate-100 text-slate-600","Assigned":"bg-blue-100 text-blue-700",
  "In Progress":"bg-sky-100 text-sky-700","Contacted":"bg-yellow-100 text-yellow-700",
  "Proposal Sent":"bg-amber-100 text-amber-700","Nurturing":"bg-pink-100 text-pink-700",
  "Matured":"bg-orange-100 text-orange-700","Convinced":"bg-violet-100 text-violet-700",
  "Converted":"bg-green-100 text-green-700","Rejected":"bg-red-100 text-red-600",
  "Lost":"bg-red-100 text-red-600",
};

type Lead = any;
type User = { _id:string; name:string; role:string };

/* ─── Shared Styles ─────────────────────────────────────────── */
const inp = "w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white";
const lbl = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

/* ─── NOTE FIELD component (reused in every modal) ──────────── */
function NoteField({
  value, onChange, required = true, label = "Note / Remarks",
  placeholder = "Yahan note likhein — kya hua, kya discuss hua...",
  rows = 3,
}: {
  value: string; onChange: (v: string) => void;
  required?: boolean; label?: string; placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className={lbl}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        required={required}
        rows={rows}
        className={inp + " resize-none"}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {required && value.trim().length < 3 && value.length > 0 && (
        <p className="text-xs text-red-500 mt-1">Kam se kam 3 characters likhein</p>
      )}
    </div>
  );
}

/* ─── Modal Shell ───────────────────────────────────────────── */
function Modal({ title, sub, color = "#1e293b", onClose, children }: {
  title: string; sub?: string; color?: string; onClose: () => void; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl">
        <div className="px-6 py-5 flex justify-between items-center rounded-t-2xl sticky top-0 z-10"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
          <div>
            <h2 className="text-white font-bold text-lg">{title}</h2>
            {sub && <p className="text-white/60 text-xs mt-0.5">{sub}</p>}
          </div>
          <button onClick={onClose}
            className="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition">✕</button>
        </div>
        <div className="p-6 space-y-4">{children}</div>
      </div>
    </div>
  );
}

/* ─── Submit Buttons ────────────────────────────────────────── */
function SubmitRow({ saving, label, color, onCancel }: {
  saving: boolean; label: string; color: string; onCancel: () => void;
}) {
  return (
    <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
      <button type="button" onClick={onCancel}
        className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">
        Cancel
      </button>
      <button disabled={saving}
        className="px-5 py-2.5 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition flex items-center gap-2"
        style={{ background: saving ? "#94a3b8" : color }}>
        {saving && (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
          </svg>
        )}
        {saving ? "Saving…" : label}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STAGE 1 — CREATE LEAD
═══════════════════════════════════════════════════ */
function AddLeadModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    companyName:"", contactPerson:"", email:"", mobile:"", country:"India",
    source:"", interestedService:"", productName:"", priority:"Warm",
    followUpDate:"",
  });
  const [note, setNote]     = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");
  const s = (k: string, v: string) => setForm(f => ({...f, [k]: v}));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) { setError("Note likhna zaroori hai"); return; }
    setSaving(true); setError("");
    try {
      await apiFetch("/api/leads", { method:"POST", body: { ...form, remarks: note } });
      onSave(); onClose();
    } catch(err) { setError(err instanceof ApiError ? err.message : "Failed to create lead."); }
    setSaving(false);
  };

  return (
    <Modal title="🆕 New Lead Create Karo" sub="Stage 1 — Lead Management Start" color="#1d4ed8" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className={lbl}>Company Name *</label>
            <input required className={inp} placeholder="ABC Technologies Pvt Ltd" value={form.companyName} onChange={e=>s("companyName",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Contact Person *</label>
            <input required className={inp} value={form.contactPerson} onChange={e=>s("contactPerson",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Mobile</label>
            <input className={inp} value={form.mobile} onChange={e=>s("mobile",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Email</label>
            <input type="email" className={inp} value={form.email} onChange={e=>s("email",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Product Name</label>
            <input className={inp} value={form.productName} onChange={e=>s("productName",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Service Required</label>
            <select className={inp} value={form.interestedService} onChange={e=>s("interestedService",e.target.value)}>
              <option value="">— Select —</option>
              {SERVICES.map(x=><option key={x}>{x}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Source</label>
            <select className={inp} value={form.source} onChange={e=>s("source",e.target.value)}>
              <option value="">— Select —</option>
              {SOURCES.map(x=><option key={x}>{x}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Priority</label>
            <select className={inp} value={form.priority} onChange={e=>s("priority",e.target.value)}>
              {PRIORITIES.map(x=><option key={x}>{x}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className={lbl}>Follow-up Date</label>
            <input type="date" className={inp} value={form.followUpDate} onChange={e=>s("followUpDate",e.target.value)} />
          </div>
        </div>

        <NoteField value={note} onChange={setNote} label="Lead Create Note *"
          placeholder="Lead kahan se aaya? Kya discuss hua? Koi additional info?" />

        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}
        <SubmitRow saving={saving} label="✅ Lead Create Karo" color="#1d4ed8" onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════
   STAGE 2 — TASK ASSIGN TO EMPLOYEE
═══════════════════════════════════════════════════ */
function AssignTaskModal({ lead, users, onClose, onSave }: {
  lead: Lead; users: User[]; onClose: () => void; onSave: () => void;
}) {
  const [assignedTo, setAssignedTo] = useState(lead.assignedTo?._id || "");
  const [title, setTitle]           = useState(`Follow up: ${lead.companyName}`);
  const [priority, setPriority]     = useState(lead.priority==="Hot"?"High":lead.priority==="Cold"?"Low":"Medium");
  const [dueDate, setDueDate]       = useState(lead.followUpDate ? String(lead.followUpDate).split("T")[0] : "");
  const [note, setNote]             = useState("");
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState("");

  const employees = users.filter(u=>["Sales","Documentation","Accounts","Management"].includes(u.role));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignedTo)       { setError("Employee select karna zaroori hai"); return; }
    if (!note.trim())      { setError("Note likhna zaroori hai"); return; }
    setSaving(true); setError("");
    try {
      await apiFetch("/api/tasks", { method:"POST", body:{ title, assignedTo, lead:lead._id, priority, dueDate, notes: note } });
      // Also log the assignment note on the lead
      await apiFetch(`/api/leads/${lead._id}`, {
        method:"PATCH",
        body:{ stage:2, status:"Assigned", note: `Task assigned to ${employees.find(e=>e._id===assignedTo)?.name || "employee"}: ${note}` }
      });
      onSave(); onClose();
    } catch(err) { setError(err instanceof ApiError ? err.message : "Failed."); }
    setSaving(false);
  };

  return (
    <Modal title="📋 Task Assign — Employee ko" sub={`Stage 2 · ${lead.leadId} · ${lead.companyName}`} color="#2563eb" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={lbl}>Employee Select karo *</label>
          <select required className={inp} value={assignedTo} onChange={e=>setAssignedTo(e.target.value)}>
            <option value="">—  Choose Employee —</option>
            {employees.map(u=><option key={u._id} value={u._id}>{u.name} ({u.role})</option>)}
          </select>
          {employees.length===0 && <p className="text-xs text-orange-500 mt-1">⚠  Any employee not available.</p>}
        </div>
        <div>
          <label className={lbl}>Task Title *</label>
          <input required className={inp} value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Priority</label>
            <select className={inp} value={priority} onChange={e=>setPriority(e.target.value)}>
              {["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Due Date</label>
            <input type="date" className={inp} value={dueDate} onChange={e=>setDueDate(e.target.value)} />
          </div>
        </div>
        <NoteField value={note} onChange={setNote} label="Assignment Note *"
          placeholder="Employee ko kya karna hai? Kya instructions diye? Client ke baare mein kya bataya?" />
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}
        <SubmitRow saving={saving} label="📋 Task Assign Karo" color="#2563eb" onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════
   STAGE 3 — FOLLOW UP DONE
═══════════════════════════════════════════════════ */
function FollowUpModal({ lead, onClose, onSave }: {
  lead: Lead; onClose: () => void; onSave: () => void;
}) {
  const [note, setNote]         = useState("");
  const [nextDate, setNextDate] = useState("");
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) { setError("Follow-up ka note likhna zaroori hai"); return; }
    setSaving(true); setError("");
    try {
      await apiFetch(`/api/leads/${lead._id}`, {
        method:"PATCH",
        body: {
          stage:3, status:"Contacted",
          note,
          ...(nextDate && { followUpDate: nextDate }),
        },
      });
      onSave(); onClose();
    } catch(err) { setError(err instanceof ApiError ? err.message : "Failed."); }
    setSaving(false);
  };

  return (
    <Modal title="📞 Follow-up Done" sub={`Stage 3 · ${lead.leadId} · ${lead.companyName}`} color="#ca8a04" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
          📌 Client se baat hui — us baat ka full record yahan likhein
        </div>
        <NoteField value={note} onChange={setNote} label="Follow-up Note *" rows={4}
          placeholder="Client ne kya kaha? Kya interest show kiya? Kya objections the? Kya next step discuss hua?" />
        <div>
          <label className={lbl}>Next Follow-up Date</label>
          <input type="date" className={inp} value={nextDate} onChange={e=>setNextDate(e.target.value)} />
        </div>
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}
        <SubmitRow saving={saving} label="📞 Follow-up Mark Karo" color="#ca8a04" onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════
   STAGE 4 — CLIENT RESPONSE
═══════════════════════════════════════════════════ */
function ClientResponseModal({ lead, onClose, onSave, onConvince }: {
  lead: Lead; onClose: () => void; onSave: () => void; onConvince: () => void;
}) {
  const [response, setResponse] = useState<"convinced"|"rejected"|"waiting"|"">("");
  const [note, setNote]         = useState("");
  const [nextDate, setNextDate] = useState("");
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response)    { setError("Client ka response select karo"); return; }
    if (!note.trim()) { setError("Note likhna zaroori hai"); return; }

    if (response==="convinced") {
      // Save the note first, then open convert modal
      try {
        await apiFetch(`/api/leads/${lead._id}`, {
          method:"PATCH",
          body:{ stage:4, status:"Convinced", note: `Client Convinced! ${note}` },
        });
      } catch {}
      onClose();
      onConvince();
      return;
    }

    setSaving(true); setError("");
    try {
      await apiFetch(`/api/leads/${lead._id}`, {
        method:"PATCH",
        body:{
          stage:4,
          status: response==="rejected" ? "Rejected" : "Matured",
          note,
          ...(nextDate && { followUpDate: nextDate }),
        },
      });
      onSave(); onClose();
    } catch(err) { setError(err instanceof ApiError ? err.message : "Failed."); }
    setSaving(false);
  };

  return (
    <Modal title="💬 Client Response Update" sub={`Stage 4 · ${lead.leadId} · ${lead.companyName}`} color="#ea580c" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={lbl}>Client ka Response *</label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              {val:"convinced", icon:"✅", label:"Convinced",  bg:"border-green-400 bg-green-50 text-green-700"},
              {val:"rejected",  icon:"❌", label:"Rejected",   bg:"border-red-400 bg-red-50 text-red-700"},
              {val:"waiting",   icon:"⏳", label:"Waiting",    bg:"border-amber-400 bg-amber-50 text-amber-700"},
            ].map(opt=>(
              <button key={opt.val} type="button" onClick={()=>setResponse(opt.val as any)}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all font-semibold text-sm ${
                  response===opt.val ? opt.bg+" ring-2 ring-offset-1" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}>
                <span className="text-2xl">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {response==="convinced" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-800">
            🎉 "Submit" karne ke baad Client ID create karne ka form open hoga
          </div>
        )}
        {(response==="rejected"||response==="waiting") && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
            📌 Lead <strong>Matured</strong> ho jaayega — future follow-up ke liye save rahega
          </div>
        )}

        <NoteField value={note} onChange={setNote} label="Response Note *" rows={4}
          placeholder={
            response==="convinced" ? "Client ne kyun agree kiya? Kya convince hua? Service details?"
            : response==="rejected" ? "Client ne kyun reject kiya? Kya reasons diye? Future scope hai?"
            : "Client ne kya kaha? Kab tak ka wait hai? Next follow-up plan?"
          } />

        {response!=="convinced" && (
          <div>
            <label className={lbl}>Next Follow-up Date</label>
            <input type="date" className={inp} value={nextDate} onChange={e=>setNextDate(e.target.value)} />
          </div>
        )}

        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}
        <SubmitRow
          saving={saving}
          label={response==="convinced" ? "✅ Convinced → Create Client ID" : response==="rejected" ? "❌ Mark Rejected" : "⏳ Mark as Matured"}
          color={response==="convinced" ? "#16a34a" : response==="rejected" ? "#dc2626" : "#d97706"}
          onCancel={onClose}
        />
      </form>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════
   STAGE 5 — CREATE CLIENT ID + DOCS + PAYMENT
═══════════════════════════════════════════════════ */
function ConvertToClientModal({ lead, onClose, onSave }: {
  lead: Lead; onClose: () => void; onSave: () => void;
}) {
  const [form, setForm] = useState({
    companyLegalName: lead.companyName||"", contactPerson:lead.contactPerson||"",
    mobile:lead.mobile||"", email:lead.email||"",
    gstNumber:"", panNumber:"", iec:"", officeAddress:"", category:"", paymentAmount:"",
  });
  const [note, setNote]     = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");
  const s = (k:string,v:string)=>setForm(f=>({...f,[k]:v}));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.paymentAmount) { setError("Payment amount enter karna zaroori hai"); return; }
    if (!note.trim())        { setError("Note likhna zaroori hai"); return; }
    setSaving(true); setError("");
    try {
      await apiFetch("/api/clients", {
        method:"POST",
        body:{ ...form, emails:form.email?[form.email]:[], leadId:lead._id, paymentAmount:Number(form.paymentAmount) },
      });
      // Log on lead
      await apiFetch(`/api/leads/${lead._id}`, {
        method:"PATCH",
        body:{ note: `Client ID created. Payment: ₹${form.paymentAmount}. ${note}` }
      });
      onSave(); onClose();
    } catch(err) { setError(err instanceof ApiError ? err.message : "Failed."); }
    setSaving(false);
  };

  return (
    <Modal title="🏢 Client ID + Documents + Payment" sub={`Stage 5 · ${lead.leadId} — Client Convinced!`} color="#7c3aed" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-800">
          ✅ Client convinced — ab Client ID generate karein aur details record karein
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className={lbl}>Company Legal Name *</label>
            <input required className={inp} value={form.companyLegalName} onChange={e=>s("companyLegalName",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Contact Person</label>
            <input className={inp} value={form.contactPerson} onChange={e=>s("contactPerson",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Mobile</label>
            <input className={inp} value={form.mobile} onChange={e=>s("mobile",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>GST Number</label>
            <input className={inp+" font-mono"} value={form.gstNumber} onChange={e=>s("gstNumber",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>PAN Number</label>
            <input className={inp+" font-mono"} value={form.panNumber} onChange={e=>s("panNumber",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>IEC Code</label>
            <input className={inp+" font-mono"} value={form.iec} onChange={e=>s("iec",e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Category</label>
            <select className={inp} value={form.category} onChange={e=>s("category",e.target.value)}>
              <option value="">— Select —</option>
              {["Manufacturer","Importer","Trader"].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className={lbl}>💰 Payment Amount (₹) *</label>
            <input required type="number" min="1" className={inp+" text-lg font-bold"} placeholder="e.g. 25000" value={form.paymentAmount} onChange={e=>s("paymentAmount",e.target.value)} />
          </div>
        </div>
        <div>
          <label className={lbl}>Office Address</label>
          <textarea rows={2} className={inp+" resize-none"} value={form.officeAddress} onChange={e=>s("officeAddress",e.target.value)} />
        </div>
        <NoteField value={note} onChange={setNote} label="Client Creation Note *"
          placeholder="Client ID kyun create ki? Payment kab milega? Koi special instructions?" />
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}
        <SubmitRow saving={saving} label="🏢 Client ID Create Karo →" color="#7c3aed" onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════
   STAGE 6 — PI / INVOICE GENERATE
═══════════════════════════════════════════════════ */
function GeneratePIModal({ lead, onClose, onSave }: {
  lead: Lead; onClose: () => void; onSave: () => void;
}) {
  const [professionalFees, setPF] = useState("");
  const [governmentFees,   setGF] = useState("");
  const [dueDate,   setDueDate]   = useState("");
  const [note,      setNote]      = useState("");
  const [saving,    setSaving]    = useState(false);
  const [error,     setError]     = useState("");

  const total = (Number(professionalFees)||0) + (Number(governmentFees)||0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) { setError("Note likhna zaroori hai"); return; }
    setSaving(true); setError("");
    try {
      await apiFetch("/api/finance", {
        method:"POST",
        body:{
          client: lead.clientId?._id || lead.clientId,
          serviceType: lead.interestedService,
          professionalFees: Number(professionalFees)||0,
          governmentFees:   Number(governmentFees)||0,
          dueDate, notes: note,
        },
      });
      await apiFetch(`/api/leads/${lead._id}`, {
        method:"PATCH",
        body:{ stage:6, note: `PI Generated: ₹${total.toLocaleString("en-IN")} (Prof: ₹${professionalFees||0}, Govt: ₹${governmentFees||0}). ${note}` },
      });
      onSave(); onClose();
    } catch(err) { setError(err instanceof ApiError ? err.message : "Failed."); }
    setSaving(false);
  };

  return (
    <Modal title="📄 PI / Invoice Generate" sub={`Stage 6 · ${lead.leadId} · ${lead.companyName}`} color="#4338ca" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-sm text-indigo-800">
          Client: <strong>{lead.clientId?.companyLegalName || lead.companyName}</strong> · {lead.interestedService}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Professional Fees (₹)</label>
            <input type="number" min="0" className={inp} placeholder="0" value={professionalFees} onChange={e=>setPF(e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Government Fees (₹)</label>
            <input type="number" min="0" className={inp} placeholder="0" value={governmentFees} onChange={e=>setGF(e.target.value)} />
          </div>
        </div>
        {total>0 && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-sm text-blue-700 font-medium">Total Invoice Amount</span>
            <span className="text-xl font-black text-blue-800">₹{total.toLocaleString("en-IN")}</span>
          </div>
        )}
        <div>
          <label className={lbl}>Payment Due Date</label>
          <input type="date" className={inp} value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        </div>
        <NoteField value={note} onChange={setNote} label="Invoice Note *"
          placeholder="Invoice kyun generate ki? Kya included hai? Client ko kab bheja? Koi special terms?" />
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}
        <SubmitRow saving={saving} label="📄 Invoice Generate Karo" color="#4338ca" onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════
   STAGE 7 — PAYMENT DONE
═══════════════════════════════════════════════════ */
function PaymentDoneModal({ lead, onClose, onSave }: {
  lead: Lead; onClose: () => void; onSave: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [mode,   setMode]   = useState("");
  const [txnId,  setTxnId]  = useState("");
  const [date,   setDate]   = useState(new Date().toISOString().split("T")[0]);
  const [note,   setNote]   = useState("");
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount)      { setError("Amount enter karo"); return; }
    if (!mode)        { setError("Payment mode select karo"); return; }
    if (!note.trim()) { setError("Note likhna zaroori hai"); return; }
    setSaving(true); setError("");
    try {
      await apiFetch(`/api/leads/${lead._id}`, {
        method:"PATCH",
        body:{
          stage:7,
          note: `Payment Received: ₹${amount} via ${mode}${txnId?` | TXN: ${txnId}`:""} on ${date}. ${note}`,
        },
      });
      onSave(); onClose();
    } catch(err) { setError(err instanceof ApiError ? err.message : "Failed."); }
    setSaving(false);
  };

  return (
    <Modal title="💰 Invoice Payment Done" sub={`Stage 7 · ${lead.leadId} · ${lead.companyName}`} color="#15803d" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={lbl}>Amount Received (₹) *</label>
          <input required type="number" className={inp+" text-lg font-bold"} placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Payment Mode *</label>
            <select required className={inp} value={mode} onChange={e=>setMode(e.target.value)}>
              <option value="">— Select —</option>
              {["Bank Transfer","UPI","Cash","Cheque","Online"].map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Payment Date</label>
            <input type="date" className={inp} value={date} onChange={e=>setDate(e.target.value)} />
          </div>
        </div>
        <div>
          <label className={lbl}>Transaction ID / Reference</label>
          <input className={inp+" font-mono"} placeholder="UTR / Cheque No." value={txnId} onChange={e=>setTxnId(e.target.value)} />
        </div>
        <NoteField value={note} onChange={setNote} label="Payment Note *"
          placeholder="Payment kaise mili? Koi discount diya? Partial ya full? Receipt sent?" />
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}
        <SubmitRow saving={saving} label="💰 Payment Mark Karo" color="#15803d" onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════
   STAGE 8 — CERTIFICATE DONE
═══════════════════════════════════════════════════ */
function CertificateModal({ lead, onClose, onSave }: {
  lead: Lead; onClose: () => void; onSave: () => void;
}) {
  const [certNo,    setCertNo]    = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [validity,  setValidity]  = useState("");
  const [note,      setNote]      = useState("");
  const [saving,    setSaving]    = useState(false);
  const [error,     setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) { setError("Note likhna zaroori hai"); return; }
    setSaving(true); setError("");
    try {
      await apiFetch(`/api/leads/${lead._id}`, {
        method:"PATCH",
        body:{
          stage:8,
          note: `Certificate Issued: ${certNo||"N/A"} on ${issueDate}${validity?` | Valid till: ${validity}`:""}.${note?` ${note}`:""}`,
        },
      });
      onSave(); onClose();
    } catch(err) { setError(err instanceof ApiError ? err.message : "Failed."); }
    setSaving(false);
  };

  return (
    <Modal title="🏆 Certificate / Service Complete" sub={`Stage 8 · ${lead.leadId} · ${lead.companyName}`} color="#0f766e" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-sm text-teal-800">
          Certificate grant hua ya service complete hui — details record karein
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Certificate Number</label>
            <input className={inp+" font-mono"} placeholder="CERT-2026-XXXXX" value={certNo} onChange={e=>setCertNo(e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Issue Date</label>
            <input type="date" className={inp} value={issueDate} onChange={e=>setIssueDate(e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className={lbl}>Validity / Expiry Date</label>
            <input type="date" className={inp} value={validity} onChange={e=>setValidity(e.target.value)} />
          </div>
        </div>
        <NoteField value={note} onChange={setNote} label="Certificate Note *"
          placeholder="Certificate kaise mila? BIS/WPC se kya response aaya? Client ko deliver kiya? Koi pending kaam?" />
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}
        <SubmitRow saving={saving} label="🏆 Certificate Mark Karo" color="#0f766e" onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════
   STAGE 9 — LEAD COMPLETE
═══════════════════════════════════════════════════ */
function CompleteLeadModal({ lead, onClose, onSave }: {
  lead: Lead; onClose: () => void; onSave: () => void;
}) {
  const [note, setNote]     = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) { setError("Final note likhna zaroori hai"); return; }
    setSaving(true); setError("");
    try {
      await apiFetch(`/api/leads/${lead._id}`, {
        method:"PATCH",
        body:{ stage:9, status:"Converted", isConverted:true, note },
      });
      onSave(); onClose();
    } catch(err) { setError(err instanceof ApiError ? err.message : "Failed."); }
    setSaving(false);
  };

  return (
    <Modal title="✅ Lead Complete!" sub={`Stage 9 · ${lead.leadId} · ${lead.companyName}`} color="#059669" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-emerald-800 font-bold">Lead Successfully Completed!</p>
          <p className="text-emerald-600 text-sm mt-1">Certificate + Payment — sab complete</p>
        </div>
        <NoteField value={note} onChange={setNote} label="Final Closing Note *" rows={4}
          placeholder="Lead kaise complete hua? Client satisfied hai? Future scope? Referral milega? Koi lesson?" />
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}
        <SubmitRow saving={saving} label="🎉 Lead Complete Mark Karo" color="#059669" onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════
   LEAD DETAIL DRAWER — Full Activity Timeline
═══════════════════════════════════════════════════ */
function LeadDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const stage = lead.stage || 1;
  const log: any[] = [...(lead.activityLog || [])].reverse(); // newest first

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 px-5 py-5 flex-shrink-0">
          <div className="flex justify-between items-start mb-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${STAGE_BG[stage]}`}>
              {STAGE_ICONS[stage]} Stage {stage} — {STAGE_LABELS[stage]}
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
          </div>
          <h2 className="text-white font-bold text-lg leading-tight">{lead.companyName}</h2>
          <p className="text-slate-400 text-xs mt-0.5">{lead.leadId} · {lead.interestedService||"—"} · {lead.priority}</p>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Pipeline Progress</span>
              <span className="font-bold text-white">{Math.round(((stage-1)/8)*100)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width:`${Math.round(((stage-1)/8)*100)}%`, background:"linear-gradient(90deg,#3b82f6,#10b981)" }} />
            </div>
          </div>
        </div>

        {/* Stage checklist */}
        <div className="bg-slate-50 border-b px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Pipeline Steps</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[1,2,3,4,5,6,7,8,9].map(s=>(
              <div key={s} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition ${
                s<stage  ? "bg-emerald-100 text-emerald-700"
                :s===stage ? "bg-blue-100 text-blue-700 ring-1 ring-blue-400"
                : "bg-white text-slate-400 border border-slate-200"
              }`}>
                <span>{s<stage?"✓":s===stage?"▶":s}</span>
                <span className="truncate text-[10px]">{STAGE_LABELS[s]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick info */}
        <div className="px-5 py-4 border-b grid grid-cols-2 gap-2">
          {[
            {l:"Contact", v:lead.contactPerson},
            {l:"Mobile",  v:lead.mobile||"—"},
            {l:"Assigned",v:lead.assignedTo?.name||"—"},
            {l:"Follow-up",v:lead.followUpDate?new Date(lead.followUpDate).toLocaleDateString("en-IN"):"—"},
            {l:"Status",  v:lead.status},
            {l:"Source",  v:lead.source||"—"},
          ].map(({l,v})=>(
            <div key={l} className="bg-slate-50 rounded-lg p-2.5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">{l}</div>
              <div className="text-xs font-semibold text-slate-800 truncate">{v}</div>
            </div>
          ))}
        </div>

        {/* ── Activity Log — Full Timeline ── */}
        <div className="flex-1 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <span>📝</span> Activity Log
            <span className="bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full">{log.length}</span>
          </p>

          {log.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">Koi activity log nahi hai abhi</div>
          ) : (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-slate-200" />

              <div className="space-y-5">
                {log.map((entry: any, i: number) => {
                  const s = entry.stage || 1;
                  const date = entry.createdAt ? new Date(entry.createdAt) : new Date();
                  return (
                    <div key={i} className="flex gap-3 relative">
                      {/* Stage dot */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 border-white shadow-sm z-10"
                        style={{ background: STAGE_LINE[s] + "20", borderColor: STAGE_LINE[s], color: STAGE_LINE[s] }}>
                        {STAGE_ICONS[s]}
                      </div>

                      {/* Entry body */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${STAGE_BG[s]}`}>
                            S{s} {STAGE_LABELS[s]}
                          </span>
                          {entry.status && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[entry.status]||"bg-slate-100 text-slate-600"}`}>
                              {entry.status}
                            </span>
                          )}
                        </div>

                        {/* Note */}
                        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{entry.note}</p>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                          <span>👤 {entry.doneBy || "System"}</span>
                          <span>·</span>
                          <span>🕐 {date.toLocaleDateString("en-IN")} {date.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PIPELINE SUMMARY
═══════════════════════════════════════════════════ */
function PipelineSummary({ leads }: { leads: Lead[] }) {
  const counts = [1,2,3,4,5,6,7,8,9].map(s=>({
    s, icon:STAGE_ICONS[s], label:STAGE_LABELS[s],
    count:leads.filter(l=>(l.stage||1)===s).length,
  }));
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Lead Pipeline Overview</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {counts.map(({s,icon,label,count})=>(
          <div key={s} className={`flex flex-col items-center px-3 py-2.5 rounded-xl min-w-[80px] border flex-shrink-0 ${STAGE_BG[s]}`}>
            <span className="text-lg">{icon}</span>
            <span className="text-xl font-black mt-1">{count}</span>
            <span className="text-[10px] text-center leading-tight mt-0.5 font-medium opacity-80">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ACTION BUTTONS per lead row
═══════════════════════════════════════════════════ */
function ActionButtons({ lead, onAction }: { lead: Lead; onAction: (t:string, l:Lead)=>void }) {
  const stage    = lead.stage || 1;
  const isLost   = lead.status==="Lost"||lead.status==="Rejected";
  const isMatured= lead.status==="Matured"||lead.status==="Nurturing";
  const isDone   = stage===9;

  if (isDone) return <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">🎉 Complete</span>;
  if (isLost) return (
    <div className="flex gap-1.5">
      <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-200">❌ Rejected</span>
      <button onClick={()=>onAction("followup",lead)} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 font-medium">🔄 Retry</button>
    </div>
  );
  if (isMatured&&stage<=4) return (
    <div className="flex gap-1.5 flex-wrap">
      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">⏳ Matured</span>
      <button onClick={()=>onAction("followup",lead)} className="text-xs px-2.5 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg hover:bg-yellow-100 font-medium">📞 Follow Again</button>
      <button onClick={()=>onAction("clientResponse",lead)} className="text-xs px-2.5 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded-lg hover:bg-violet-100 font-medium">💬 Update</button>
    </div>
  );

  const BTN: Record<number,{label:string;action:string;color:string}> = {
    1:{label:"📋 Assign Task",       action:"assignTask",     color:"bg-blue-600 hover:bg-blue-700 text-white"},
    2:{label:"📞 Follow-up Done",    action:"followup",       color:"bg-yellow-500 hover:bg-yellow-600 text-white"},
    3:{label:"💬 Client Response",   action:"clientResponse", color:"bg-orange-500 hover:bg-orange-600 text-white"},
    4:{label:"🏢 Create Client ID",  action:"convert",        color:"bg-purple-600 hover:bg-purple-700 text-white"},
    5:{label:"📄 Generate PI",       action:"generatePI",     color:"bg-indigo-600 hover:bg-indigo-700 text-white"},
    6:{label:"💰 Payment Done",      action:"paymentDone",    color:"bg-green-600 hover:bg-green-700 text-white"},
    7:{label:"🏆 Certificate Done",  action:"certificate",    color:"bg-teal-600 hover:bg-teal-700 text-white"},
    8:{label:"✅ Lead Complete",     action:"complete",       color:"bg-emerald-600 hover:bg-emerald-700 text-white"},
  };
  const btn = BTN[stage];
  if (!btn) return null;

  return (
    <button onClick={()=>onAction(btn.action,lead)}
      className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${btn.color}`}>
      {btn.label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN LEADS CLIENT
═══════════════════════════════════════════════════ */
export default function LeadsClient({
  leads, users=[], currentUserRole="Admin",
}: {
  leads: Lead[]; users: User[]; currentUserRole?: string;
}) {
  const router = useRouter();

  const [showAdd,       setShowAdd]       = useState(false);
  const [assignTask,    setAssignTask]    = useState<Lead|null>(null);
  const [followUp,      setFollowUp]      = useState<Lead|null>(null);
  const [clientResp,    setClientResp]    = useState<Lead|null>(null);
  const [convert,       setConvert]       = useState<Lead|null>(null);
  const [genPI,         setGenPI]         = useState<Lead|null>(null);
  const [payment,       setPayment]       = useState<Lead|null>(null);
  const [certificate,   setCertificate]   = useState<Lead|null>(null);
  const [complete,      setComplete]      = useState<Lead|null>(null);
  const [drawer,        setDrawer]        = useState<Lead|null>(null);

  const [search,        setSearch]        = useState("");
  const [filterStage,   setFilterStage]   = useState("");
  const [filterPriority,setFilterPriority]= useState("");

  const refresh = () => router.refresh();
  const isEmployee = currentUserRole==="Sales"||currentUserRole==="Documentation";

  const handle = (type: string, lead: Lead) => {
    if (type==="assignTask")     setAssignTask(lead);
    else if (type==="followup")  setFollowUp(lead);
    else if (type==="clientResponse") setClientResp(lead);
    else if (type==="convert")   setConvert(lead);
    else if (type==="generatePI") setGenPI(lead);
    else if (type==="paymentDone") setPayment(lead);
    else if (type==="certificate") setCertificate(lead);
    else if (type==="complete")  setComplete(lead);
  };

  const filtered = leads.filter(l=>{
    const q=search.toLowerCase();
    return (!search||l.companyName?.toLowerCase().includes(q)||l.contactPerson?.toLowerCase().includes(q)||l.leadId?.toLowerCase().includes(q)||l.mobile?.includes(q))
      && (!filterStage||String(l.stage||1)===filterStage)
      && (!filterPriority||l.priority===filterPriority);
  });

  return (
    <div className="space-y-5 text-black">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500">
            {leads.length} total · {leads.filter(l=>l.stage!==9&&l.status!=="Lost"&&l.status!=="Rejected").length} active
          </p>
        </div>
        {!isEmployee && (
          <button onClick={()=>setShowAdd(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:from-blue-700">
            + New Lead
          </button>
        )}
      </div>

      <PipelineSummary leads={leads} />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input placeholder="Search company, ID, mobile…"
            className="border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-300 w-56"
            value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <select className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none" value={filterStage} onChange={e=>setFilterStage(e.target.value)}>
          <option value="">All Stages</option>
          {[1,2,3,4,5,6,7,8,9].map(s=><option key={s} value={s}>{STAGE_ICONS[s]} S{s} — {STAGE_LABELS[s]}</option>)}
        </select>
        <select className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none" value={filterPriority} onChange={e=>setFilterPriority(e.target.value)}>
          <option value="">All Priority</option>
          {PRIORITIES.map(p=><option key={p}>{p}</option>)}
        </select>
        {(search||filterStage||filterPriority)&&(
          <button onClick={()=>{setSearch("");setFilterStage("");setFilterPriority("");}}
            className="text-xs px-3 py-2 text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50">Clear</button>
        )}
      </div>

      {/* Lead Cards */}
      <div className="space-y-3">
        {filtered.length===0&&(
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400">
            <div className="text-4xl mb-3">🎯</div><p>Koi lead nahi mili</p>
          </div>
        )}
        {filtered.map(lead=>{
          const stage=lead.stage||1;
          const isComplete=stage===9;
          const isLost=lead.status==="Lost"||lead.status==="Rejected";
          const lastNote=lead.activityLog&&lead.activityLog.length>0?lead.activityLog[lead.activityLog.length-1]:null;

          return (
            <div key={lead._id} className={`bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all ${
              isComplete?"border-emerald-200 bg-emerald-50/20":isLost?"border-red-100 opacity-80":"border-slate-200 hover:border-blue-200"
            }`}>
              {/* Progress stripe */}
              <div className="h-1 rounded-t-2xl overflow-hidden">
                <div className="h-full transition-all duration-700 rounded-t-2xl"
                  style={{width:`${Math.round(((stage-1)/8)*100)}%`, background:isComplete?"#10b981":isLost?"#ef4444":"linear-gradient(90deg,#3b82f6,#6366f1)"}} />
              </div>

              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Left */}
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={()=>setDrawer(lead)}>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${STAGE_BG[stage]}`}>
                        {STAGE_ICONS[stage]} S{stage} {STAGE_LABELS[stage]}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        lead.priority==="Hot"?"bg-red-100 text-red-600":lead.priority==="Cold"?"bg-blue-100 text-blue-600":"bg-orange-100 text-orange-600"
                      }`}>{lead.priority}</span>
                      <span className="text-xs font-mono text-slate-400">{lead.leadId}</span>
                      {lead.activityLog?.length>0&&(
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          📝 {lead.activityLog.length} notes
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-base hover:text-blue-600 transition leading-tight">{lead.companyName}</h3>

                    <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-500 flex-wrap">
                      <span>👤 {lead.contactPerson}</span>
                      {lead.mobile&&<span>📱 {lead.mobile}</span>}
                      {lead.interestedService&&<span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded font-medium">{lead.interestedService}</span>}
                      {lead.assignedTo?.name&&<span className="text-xs">🧑‍💼 {lead.assignedTo.name}</span>}
                    </div>

                    {/* Last note preview */}
                    {lastNote&&(
                      <div className="mt-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100 flex items-start gap-2">
                        <span className="text-slate-400 text-xs mt-0.5 flex-shrink-0">📝</span>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{lastNote.note}</p>
                        <span className="text-[10px] text-slate-400 flex-shrink-0 mt-0.5">
                          {lastNote.createdAt?new Date(lastNote.createdAt).toLocaleDateString("en-IN"):""}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: action */}
                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <ActionButtons lead={lead} onAction={handle} />
                    <button onClick={()=>setDrawer(lead)}
                      className="text-[10px] text-slate-400 hover:text-blue-500 transition flex items-center gap-1">
                      📋 Full History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {showAdd     && <AddLeadModal onClose={()=>setShowAdd(false)} onSave={refresh} />}
      {assignTask  && <AssignTaskModal lead={assignTask} users={users} onClose={()=>setAssignTask(null)} onSave={refresh} />}
      {followUp    && <FollowUpModal lead={followUp} onClose={()=>setFollowUp(null)} onSave={refresh} />}
      {clientResp  && (
        <ClientResponseModal
          lead={clientResp}
          onClose={()=>setClientResp(null)}
          onSave={refresh}
          onConvince={()=>{ const l=clientResp; setClientResp(null); setConvert(l); }}
        />
      )}
      {convert     && <ConvertToClientModal lead={convert} onClose={()=>setConvert(null)} onSave={refresh} />}
      {genPI       && <GeneratePIModal lead={genPI} onClose={()=>setGenPI(null)} onSave={refresh} />}
      {payment     && <PaymentDoneModal lead={payment} onClose={()=>setPayment(null)} onSave={refresh} />}
      {certificate && <CertificateModal lead={certificate} onClose={()=>setCertificate(null)} onSave={refresh} />}
      {complete    && <CompleteLeadModal lead={complete} onClose={()=>setComplete(null)} onSave={refresh} />}
      {drawer      && <LeadDrawer lead={drawer} onClose={()=>setDrawer(null)} />}
    </div>
  );
}
