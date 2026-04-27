// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const SERVICES = ["BIS-CRS", "BIS-ISI", "WPC-ETA", "EPR", "LMPC", "CDSCO", "ISO", "BEE", "Other"];
// const SOURCES = ["Website", "LinkedIn", "Referral", "Google", "WhatsApp", "Cold Call", "Other"];
// const STATUSES = ["New", "Contacted", "Proposal Sent", "Converted", "Lost"];
// const PRIORITIES = ["Hot", "Warm", "Cold"];

// function LeadModal({ onClose, onSave }) {
//   const [form, setForm] = useState({
//     companyName: "", contactPerson: "", email: "", mobile: "",
//     country: "India", source: "", interestedService: "",
//     productName: "", priority: "Warm", status: "New", remarks: "", followUpDate: "",
//   });
//   const [saving, setSaving] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     const res = await fetch("/api/leads", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     if (res.ok) { onSave(); onClose(); }
//     setSaving(false);
//   };

//   const Field = ({ label, name, type = "text", options }) => (
//     <div>
//       <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
//       {options ? (
//         <select
//           value={form[name]}
//           onChange={(e) => setForm({ ...form, [name]: e.target.value })}
//           className="form-input"
//         >
//           <option value="">Select {label}</option>
//           {options.map(o => <option key={o} value={o}>{o}</option>)}
//         </select>
//       ) : (
//         <input
//           type={type}
//           value={form[name]}
//           onChange={(e) => setForm({ ...form, [name]: e.target.value })}
//           className="form-input"
//           placeholder={label}
//         />
//       )}
//     </div>
//   );

//   return (
//     <div style={{
//       position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
//       display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
//     }}>
//       <div style={{
//         background: "white", borderRadius: 16, padding: 32,
//         width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto",
//         boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
//       }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
//           <h2 style={{ fontSize: 20, fontWeight: 800 }}>Add New Lead</h2>
//           <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#64748b" }}>✕</button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
//             <Field label="Company Name" name="companyName" />
//             <Field label="Contact Person" name="contactPerson" />
//             <Field label="Email" name="email" type="email" />
//             <Field label="Mobile" name="mobile" />
//             <Field label="Source" name="source" options={SOURCES} />
//             <Field label="Interested Service" name="interestedService" options={SERVICES} />
//             <Field label="Product Name" name="productName" />
//             <Field label="Country" name="country" />
//             <Field label="Priority" name="priority" options={PRIORITIES} />
//             <Field label="Status" name="status" options={STATUSES} />
//             <Field label="Follow-up Date" name="followUpDate" type="date" />
//           </div>
//           <div style={{ marginBottom: 20 }}>
//             <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Remarks</label>
//             <textarea
//               value={form.remarks}
//               onChange={(e) => setForm({ ...form, remarks: e.target.value })}
//               className="form-input"
//               rows={3}
//               placeholder="Any additional notes..."
//             />
//           </div>
//           <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
//             <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
//             <button type="submit" disabled={saving} className="btn btn-primary">
//               {saving ? "Saving..." : "Add Lead"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function LeadsClient({ leads: initialLeads }) {
//   const router = useRouter();
//   const [leads, setLeads] = useState(initialLeads);
//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterPriority, setFilterPriority] = useState("");

//   const filtered = leads.filter(l => {
//     const matchSearch = !search || l.companyName?.toLowerCase().includes(search.toLowerCase()) ||
//       l.contactPerson?.toLowerCase().includes(search.toLowerCase());
//     const matchStatus = !filterStatus || l.status === filterStatus;
//     const matchPriority = !filterPriority || l.priority === filterPriority;
//     return matchSearch && matchStatus && matchPriority;
//   });

//   const refresh = () => router.refresh();

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
//         <div>
//           <h1 style={{ fontSize: 24, fontWeight: 800 }}>Leads</h1>
//           <p style={{ color: "#64748b", fontSize: 14 }}>{leads.length} total leads</p>
//         </div>
//         <button onClick={() => setShowModal(true)} className="btn btn-primary">
//           ➕ Add Lead
//         </button>
//       </div>

//       {/* Filters */}
//       <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
//         <input
//           placeholder="Search company or contact..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="form-input"
//           style={{ maxWidth: 280 }}
//         />
//         <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="form-input" style={{ maxWidth: 180 }}>
//           <option value="">All Statuses</option>
//           {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
//         </select>
//         <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="form-input" style={{ maxWidth: 160 }}>
//           <option value="">All Priorities</option>
//           {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
//         </select>
//       </div>

//       {/* Table */}
//       <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Lead ID</th>
//               <th>Company</th>
//               <th>Contact</th>
//               <th>Service</th>
//               <th>Source</th>
//               <th>Priority</th>
//               <th>Status</th>
//               <th>Follow-up</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length === 0 ? (
//               <tr>
//                 <td colSpan={8} style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>
//                   No leads found
//                 </td>
//               </tr>
//             ) : filtered.map((lead) => (
//               <tr key={lead._id}>
//                 <td style={{ fontWeight: 600, color: "#2563eb", fontSize: 12 }}>{lead.leadId}</td>
//                 <td style={{ fontWeight: 600 }}>{lead.companyName}</td>
//                 <td>
//                   <div>{lead.contactPerson}</div>
//                   <div style={{ fontSize: 12, color: "#94a3b8" }}>{lead.mobile}</div>
//                 </td>
//                 <td>
//                   <span style={{
//                     background: "#eff6ff", color: "#2563eb",
//                     padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600,
//                   }}>{lead.interestedService}</span>
//                 </td>
//                 <td style={{ color: "#64748b", fontSize: 13 }}>{lead.source}</td>
//                 <td><span className={`badge badge-${lead.priority?.toLowerCase()}`}>{lead.priority}</span></td>
//                 <td><span className={`badge badge-${lead.status === "New" ? "new" : lead.status === "Converted" ? "converted" : lead.status === "Lost" ? "lost" : "warm"}`}>{lead.status}</span></td>
//                 <td style={{ color: "#64748b", fontSize: 13 }}>
//                   {lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString("en-IN") : "—"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <LeadModal
//           onClose={() => setShowModal(false)}
//           onSave={refresh}
//         />
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SERVICES = ["BIS-CRS","BIS-ISI","WPC-ETA","EPR","LMPC","CDSCO","ISO","BEE","Other"];
const SOURCES = ["Website","LinkedIn","Referral","Google","WhatsApp","Cold Call","Other"];
const STATUSES = ["New","Contacted","Proposal Sent","Converted","Lost"];
const PRIORITIES = ["Hot","Warm","Cold"];

function LeadModal({ onClose, onSave }) {
  const [form, setForm] = useState({ companyName:"", contactPerson:"", email:"", mobile:"", country:"India", source:"", interestedService:"", productName:"", priority:"Warm", status:"New", remarks:"", followUpDate:"" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    const res = await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    if (res.ok) { onSave(); onClose(); }
    setSaving(false);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }}>
      <div style={{ background:"white", borderRadius:16, padding:32, width:"100%", maxWidth:640, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 25px 50px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:24 }}>
          <h2 style={{ fontSize:20, fontWeight:800 }}>Add New Lead</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
            {[{ label:"Company Name *", name:"companyName", req:true },{ label:"Contact Person *", name:"contactPerson", req:true },{ label:"Email", name:"email", type:"email" },{ label:"Mobile", name:"mobile" },{ label:"Product Name", name:"productName" },{ label:"Country", name:"country" },{ label:"Follow-up Date", name:"followUpDate", type:"date" }].map(f => (
              <div key={f.name}>
                <label style={{ fontSize:13, fontWeight:600, display:"block", marginBottom:6 }}>{f.label}</label>
                <input type={f.type||"text"} value={form[f.name]} onChange={e => setForm({...form,[f.name]:e.target.value})} className="form-input" required={f.req} />
              </div>
            ))}
            {[{ label:"Source", name:"source", opts:SOURCES },{ label:"Service", name:"interestedService", opts:SERVICES },{ label:"Priority", name:"priority", opts:PRIORITIES },{ label:"Status", name:"status", opts:STATUSES }].map(f => (
              <div key={f.name}>
                <label style={{ fontSize:13, fontWeight:600, display:"block", marginBottom:6 }}>{f.label}</label>
                <select value={form[f.name]} onChange={e => setForm({...form,[f.name]:e.target.value})} className="form-input">
                  <option value="">Select</option>
                  {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ fontSize:13, fontWeight:600, display:"block", marginBottom:6 }}>Remarks</label>
            <textarea value={form.remarks} onChange={e => setForm({...form,remarks:e.target.value})} className="form-input" rows={2} />
          </div>
          <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" disabled={saving} className="btn btn-primary">{saving?"Saving...":"Add Lead"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LeadsClient({ leads }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const filtered = leads.filter(l => {
    const ms = !search || l.companyName?.toLowerCase().includes(search.toLowerCase()) || l.contactPerson?.toLowerCase().includes(search.toLowerCase());
    return ms && (!filterStatus||l.status===filterStatus) && (!filterPriority||l.priority===filterPriority);
  });

  const handleStatusChange = async (leadId, status) => {
    await fetch(`/api/leads/${leadId}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({status}) });
    router.refresh();
  };

  const handleProposal = (lead) => {
    const svc = lead.interestedService || "BIS-CRS";
    window.open(`/api/proposals/generate?leadId=${lead._id}&service=${encodeURIComponent(svc)}`, "_blank");
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:24, fontWeight:800 }}>Leads</h1>
          <p style={{ color:"#64748b", fontSize:14 }}>{leads.length} total</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">+ Add Lead</button>
      </div>

      {/* Status filter pills */}
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilterStatus(filterStatus===s?"":s)}
            style={{ padding:"6px 14px", borderRadius:8, border:"1px solid #e2e8f0", cursor:"pointer", fontWeight:600, fontSize:13, transition:"all 0.15s",
              background:filterStatus===s?"#1a3c6e":"white", color:filterStatus===s?"white":"#374151" }}>
            {s} <span style={{ opacity:0.65 }}>{leads.filter(l=>l.status===s).length}</span>
          </button>
        ))}
        {filterStatus && <button onClick={() => setFilterStatus("")} style={{ padding:"6px 12px", borderRadius:8, border:"1px solid #fecaca", background:"#fef2f2", color:"#dc2626", cursor:"pointer", fontSize:12, fontWeight:600 }}>Clear</button>}
      </div>

      <div style={{ display:"flex", gap:12, marginBottom:20 }}>
        <input placeholder="Search company or contact..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" style={{ maxWidth:280 }} />
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="form-input" style={{ maxWidth:160 }}>
          <option value="">All Priorities</option>
          {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div style={{ background:"white", borderRadius:12, border:"1px solid #e2e8f0", overflow:"hidden" }}>
        <table className="data-table">
          <thead>
            <tr><th>Lead ID</th><th>Company</th><th>Contact</th><th>Service</th><th>Source</th><th>Priority</th><th>Status</th><th>Follow-up</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length===0 ? (
              <tr><td colSpan={9} style={{ textAlign:"center", color:"#94a3b8", padding:40 }}>No leads found</td></tr>
            ) : filtered.map(lead => (
              <tr key={lead._id}>
                <td style={{ fontWeight:700, color:"#2563eb", fontSize:12 }}>{lead.leadId}</td>
                <td style={{ fontWeight:600 }}>{lead.companyName}</td>
                <td>
                  <div style={{ fontSize:13 }}>{lead.contactPerson}</div>
                  <div style={{ fontSize:11, color:"#94a3b8" }}>{lead.mobile}</div>
                </td>
                <td><span style={{ background:"#eff6ff", color:"#2563eb", padding:"2px 8px", borderRadius:6, fontSize:12, fontWeight:600 }}>{lead.interestedService||"—"}</span></td>
                <td style={{ fontSize:13, color:"#64748b" }}>{lead.source||"—"}</td>
                <td><span className={`badge badge-${lead.priority?.toLowerCase()}`}>{lead.priority}</span></td>
                <td>
                  <select value={lead.status} onChange={e => handleStatusChange(lead._id, e.target.value)}
                    style={{ padding:"3px 8px", borderRadius:6, fontSize:12, fontWeight:600, border:"1px solid #e2e8f0", cursor:"pointer", background:"white" }}>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ fontSize:13, color:"#64748b" }}>{lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString("en-IN") : "—"}</td>
                <td>
                  <button onClick={() => handleProposal(lead)}
                    style={{ padding:"4px 10px", borderRadius:6, fontSize:11, fontWeight:600, background:"#fef3c7", color:"#d97706", border:"none", cursor:"pointer", whiteSpace:"nowrap" }}>
                    Proposal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <LeadModal onClose={() => setShowModal(false)} onSave={() => router.refresh()} />}
    </div>
  );
}