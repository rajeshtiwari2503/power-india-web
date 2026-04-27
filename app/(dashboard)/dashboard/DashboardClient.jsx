"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#2563eb", "#f97316", "#16a34a", "#dc2626", "#9333ea", "#0891b2"];

function StatCard({ label, value, icon, color = "#2563eb", sub }) {
  return (
    <div className="stat-card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#64748b", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a" }}>{value}</div>
          {sub && <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>{sub}</div>}
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: color + "18",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
        }}>{icon}</div>
      </div>
    </div>
  );
}

export default function DashboardClient({ stats }) {
  const pieData = stats.certificationsByStage.map(s => ({ name: s._id, value: s.count }));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard label="Leads This Month" value={stats.leadsThisMonth} icon="🎯" color="#2563eb" sub={`${stats.totalLeads} total`} />
        <StatCard label="Active Clients" value={stats.activeClients} icon="👥" color="#16a34a" />
        <StatCard label="Active Certifications" value={stats.activeCertifications} icon="📜" color="#f97316" />
        <StatCard label="Pending Tasks" value={stats.pendingTasks} icon="✅" color="#9333ea" sub={stats.overdueTasks > 0 ? `⚠️ ${stats.overdueTasks} overdue` : "All on track"} />
        <StatCard label="Revenue Collected" value={`₹${(stats.totalRevenue / 1000).toFixed(0)}K`} icon="💰" color="#0891b2" sub={`${stats.pendingInvoices} pending invoices`} />
        <StatCard label="Upcoming Renewals" value={stats.upcomingRenewals} icon="🔄" color="#dc2626" sub="Within 30 days" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* Certifications by Stage */}
        <div className="stat-card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Certifications by Stage</h3>
          {pieData.length > 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <PieChart width={160} height={160}>
                <Pie data={pieData} cx={75} cy={75} innerRadius={45} outerRadius={75} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
              </PieChart>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                {pieData.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                    <span style={{ color: "#374151", flex: 1 }}>{item.name}</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ color: "#94a3b8", textAlign: "center", padding: 40 }}>No certification data yet</div>
          )}
        </div>

        {/* Recent Leads */}
        <div className="stat-card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Recent Leads</h3>
          {stats.recentLeads.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {stats.recentLeads.map((lead) => (
                <div key={lead._id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  paddingBottom: 12, borderBottom: "1px solid #f1f5f9",
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{lead.companyName}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{lead.interestedService} • {lead.source}</div>
                  </div>
                  <span className={`badge badge-${lead.priority?.toLowerCase()}`}>{lead.priority}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: "#94a3b8", textAlign: "center", padding: 40 }}>No leads yet</div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="stat-card">
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "Add New Lead", href: "/leads?new=true", icon: "➕" },
            { label: "Add Client", href: "/clients?new=true", icon: "👤" },
            { label: "New Certification", href: "/certifications?new=true", icon: "📋" },
            { label: "Create Invoice", href: "/finance?new=true", icon: "🧾" },
            { label: "Add Task", href: "/tasks?new=true", icon: "✅" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 16px", borderRadius: 8,
                background: "#f1f5f9", color: "#374151",
                fontSize: 14, fontWeight: 500,
                textDecoration: "none", transition: "all 0.2s",
                border: "1px solid #e2e8f0",
              }}
            >
              {action.icon} {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}