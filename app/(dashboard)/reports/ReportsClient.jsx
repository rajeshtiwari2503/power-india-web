"use client";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area, CartesianGrid, RadialBarChart, RadialBar,
} from "recharts";
import { useState } from "react";

const COLORS = ["#2563eb", "#f97316", "#16a34a", "#dc2626", "#9333ea", "#0891b2", "#ca8a04", "#db2777"];

const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
      <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 6, fontSize: 13 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
          <span style={{ color: "#64748b" }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: "#0f172a" }}>{prefix}{typeof p.value === "number" ? p.value.toLocaleString("en-IN") : p.value}{suffix}</span>
        </div>
      ))}
    </div>
  );
};

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{title}</h2>
      {subtitle && <p style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>{subtitle}</p>}
    </div>
  );
}

function KPICard({ label, value, sub, color = "#2563eb", icon }) {
  return (
    <div style={{
      background: "white", borderRadius: 14, padding: "20px 22px",
      border: "1px solid #e2e8f0",
      borderTop: `3px solid ${color}`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>{sub}</div>}
        </div>
        <div style={{ fontSize: 28 }}>{icon}</div>
      </div>
    </div>
  );
}

export default function ReportsClient({ data }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "leads", label: "Lead Analytics" },
    { id: "revenue", label: "Revenue" },
    { id: "certifications", label: "Certifications" },
    { id: "renewals", label: "Renewal Alerts" },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>Reports & Analytics</h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>Comprehensive business intelligence for Power India Services</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "#f1f5f9", padding: 4, borderRadius: 10, width: "fit-content" }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 13, transition: "all 0.2s",
              background: activeTab === tab.id ? "white" : "transparent",
              color: activeTab === tab.id ? "#0f172a" : "#64748b",
              boxShadow: activeTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <KPICard label="Total Leads" value={data.totals.leads} icon="🎯" color="#2563eb" sub={`${data.conversionRate}% conversion rate`} />
            <KPICard label="Active Clients" value={data.totals.clients} icon="👥" color="#16a34a" />
            <KPICard label="Certifications" value={data.totals.certs} icon="📜" color="#f97316" />
            <KPICard label="Revenue Collected" value={`₹${(data.totals.revenue / 1000).toFixed(0)}K`} icon="💰" color="#9333ea" sub="Last 6 months" />
          </div>

          {/* Lead + Revenue combined */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
              <SectionHeader title="Monthly Leads" subtitle="Last 6 months performance" />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.monthlyLeads}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="total" name="Total" fill="#2563eb" radius={[4,4,0,0]} />
                  <Bar dataKey="converted" name="Converted" fill="#16a34a" radius={[4,4,0,0]} />
                  <Bar dataKey="lost" name="Lost" fill="#ef4444" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
              <SectionHeader title="Revenue Trend" subtitle="Collected vs invoiced" />
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={data.monthlyRevenue}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip prefix="₹" />} />
                  <Legend />
                  <Area type="monotone" dataKey="invoiced" name="Invoiced" stroke="#e2e8f0" fill="#f1f5f9" strokeWidth={2} />
                  <Area type="monotone" dataKey="revenue" name="Collected" stroke="#2563eb" fill="url(#revGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Clients */}
          <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
            <SectionHeader title="Top Clients by Certifications" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {data.topClients.map((client, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: COLORS[i % COLORS.length] + "18",
                    color: COLORS[i % COLORS.length],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 12,
                  }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{client.name || "Unknown Client"}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: COLORS[i % COLORS.length] }}>{client.certCount} certs</span>
                    </div>
                    <div style={{ height: 6, background: "#f1f5f9", borderRadius: 999 }}>
                      <div style={{
                        height: "100%", borderRadius: 999,
                        background: COLORS[i % COLORS.length],
                        width: `${(client.certCount / (data.topClients[0]?.certCount || 1)) * 100}%`,
                        transition: "width 0.5s ease",
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEADS TAB */}
      {activeTab === "leads" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {/* By Source */}
            <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
              <SectionHeader title="Lead Sources" />
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={data.leadsBySource.map(s => ({ name: s._id || "Unknown", value: s.count }))}
                    cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}>
                    {data.leadsBySource.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* By Priority */}
            <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
              <SectionHeader title="Priority Distribution" />
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={data.leadsByPriority.map(p => ({ name: p._id || "Unknown", value: p.count }))}
                    cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value"
                  >
                    {data.leadsByPriority.map((item) => {
                      const colors = { Hot: "#dc2626", Warm: "#f97316", Cold: "#2563eb" };
                      return <Cell key={item._id} fill={colors[item._id] || "#64748b"} />;
                    })}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Conversion Funnel */}
            <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
              <SectionHeader title="Conversion Rate" subtitle={`Overall: ${data.conversionRate}%`} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 180 }}>
                <div style={{
                  width: 120, height: 120, borderRadius: "50%",
                  background: `conic-gradient(#16a34a ${data.conversionRate * 3.6}deg, #f1f5f9 0deg)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <div style={{
                    width: 84, height: 84, borderRadius: "50%", background: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column",
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#16a34a" }}>{data.conversionRate}%</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>converted</div>
                  </div>
                </div>
                <div style={{ marginTop: 16, fontSize: 13, color: "#64748b", textAlign: "center" }}>
                  Out of <strong>{data.totals.leads}</strong> total leads
                </div>
              </div>
            </div>
          </div>

          {/* Monthly trend */}
          <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
            <SectionHeader title="Lead Trend — Last 6 Months" />
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data.monthlyLeads}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="total" name="Total Leads" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="converted" name="Converted" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="lost" name="Lost" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* REVENUE TAB */}
      {activeTab === "revenue" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {data.paymentSummary.map(ps => (
              <div key={ps._id} style={{ background: "white", borderRadius: 14, padding: 20, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: 8 }}>{ps._id}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: ps._id === "Paid" ? "#16a34a" : ps._id === "Pending" ? "#f97316" : "#dc2626" }}>
                  ₹{(ps.amount / 1000).toFixed(1)}K
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{ps.count} invoices</div>
              </div>
            ))}
          </div>

          <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
            <SectionHeader title="Revenue vs Invoiced — 6 Months" subtitle="Gap shows pending collections" />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.monthlyRevenue} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip prefix="₹" />} />
                <Legend />
                <Bar dataKey="invoiced" name="Invoiced" fill="#bfdbfe" radius={[4,4,0,0]} />
                <Bar dataKey="revenue" name="Collected" fill="#2563eb" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* CERTIFICATIONS TAB */}
      {activeTab === "certifications" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
              <SectionHeader title="By Certification Type" />
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.certsByType.map(c => ({ name: c._id, count: c.count }))} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Applications" radius={[0,4,4,0]}>
                    {data.certsByType.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
              <SectionHeader title="By Current Stage" />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.certsByStage.map((s, i) => {
                  const max = data.certsByStage[0]?.count || 1;
                  return (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{s._id}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS[i % COLORS.length] }}>{s.count}</span>
                      </div>
                      <div style={{ height: 6, background: "#f1f5f9", borderRadius: 999 }}>
                        <div style={{ height: "100%", borderRadius: 999, background: COLORS[i % COLORS.length], width: `${(s.count / max) * 100}%`, transition: "width 0.5s" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENEWALS TAB */}
      {activeTab === "renewals" && (
        <div>
          <div style={{ background: "white", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", background: "linear-gradient(135deg, #fef3c7, #fef9c3)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#92400e" }}>⚠️ Upcoming Certificate Renewals</h3>
              <p style={{ fontSize: 13, color: "#a16207" }}>Next 90 days — {data.renewalSoon.length} certificates need renewal</p>
            </div>
            {data.renewalSoon.length === 0 ? (
              <div style={{ padding: 48, textAlign: "center", color: "#94a3b8" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <div>No renewals due in the next 90 days</div>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["Client", "Type", "App ID", "Renewal Date", "Days Left", "Status"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.renewalSoon.map(cert => {
                    const daysLeft = Math.ceil((new Date(cert.renewalDate) - new Date()) / (1000 * 60 * 60 * 24));
                    const urgency = daysLeft <= 15 ? "#dc2626" : daysLeft <= 30 ? "#f97316" : "#ca8a04";
                    return (
                      <tr key={cert._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 14 }}>{cert.client?.companyLegalName || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13 }}>
                          <span style={{ background: "#eff6ff", color: "#2563eb", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{cert.certificationType}</span>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 12, color: "#2563eb", fontWeight: 700 }}>{cert.applicationId}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13 }}>{new Date(cert.renewalDate).toLocaleDateString("en-IN")}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ background: urgency + "18", color: urgency, padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                            {daysLeft} days
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontSize: 12, color: urgency, fontWeight: 600 }}>
                            {daysLeft <= 15 ? "🔴 URGENT" : daysLeft <= 30 ? "🟠 Soon" : "🟡 Upcoming"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}