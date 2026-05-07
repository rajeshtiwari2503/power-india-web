 "use client";

import {
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#f97316",
  "#16a34a",
  "#dc2626",
  "#9333ea",
  "#0891b2",
];

type StatCardProps = {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
  sub?: string;
};

function StatCard({
  label,
  value,
  icon,
  color = "#2563eb",
  sub,
}: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-slate-500 font-medium mb-2">
            {label}
          </div>

          <div className="text-2xl font-extrabold text-slate-900">
            {value}
          </div>

          {sub && (
            <div className="text-xs text-slate-400 mt-1">{sub}</div>
          )}
        </div>

        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center text-xl"
          style={{ backgroundColor: `${color}18` }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

type Props = {
  stats: any;
};

export default function DashboardClient({ stats }: Props) {
  const pieData = stats.certificationsByStage.map((s: any) => ({
    name: s._id,
    value: s.count,
  }));

  return (
    <div className="space-y-6 text-black">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Welcome back! Here’s what’s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Leads This Month"
          value={stats.leadsThisMonth}
          icon="🎯"
          color="#2563eb"
          sub={`${stats.totalLeads} total`}
        />

        <StatCard
          label="Active Clients"
          value={stats.activeClients}
          icon="👥"
          color="#16a34a"
        />

        <StatCard
          label="Active Certifications"
          value={stats.activeCertifications}
          icon="📜"
          color="#f97316"
        />

        <StatCard
          label="Pending Tasks"
          value={stats.pendingTasks}
          icon="✅"
          color="#9333ea"
          sub={
            stats.overdueTasks > 0
              ? `⚠️ ${stats.overdueTasks} overdue`
              : "All on track"
          }
        />

        <StatCard
          label="Revenue Collected"
          value={`₹${(stats.totalRevenue / 1000).toFixed(0)}K`}
          icon="💰"
          color="#0891b2"
          sub={`${stats.pendingInvoices} pending invoices`}
        />

        <StatCard
          label="Upcoming Renewals"
          value={stats.upcomingRenewals}
          icon="🔄"
          color="#dc2626"
          sub="Within 30 days"
        />
      </div>

      {/* Charts + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pie Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-bold mb-4">
            Certifications by Stage
          </h3>

          {pieData.length > 0 ? (
            <div className="flex items-center gap-6">
              <PieChart width={160} height={160}>
                <Pie
                  data={pieData}
                  cx={80}
                  cy={80}
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                >
                  {pieData.map((_: any, i: number) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>

              <div className="flex flex-col gap-2 flex-1">
                {pieData.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{
                          backgroundColor:
                            COLORS[i % COLORS.length],
                        }}
                      />
                      <span className="text-slate-600">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-bold text-slate-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 py-10">
              No certification data yet
            </div>
          )}
        </div>

        {/* Recent Leads */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-bold mb-4">Recent Leads</h3>

          {stats.recentLeads.length > 0 ? (
            <div className="space-y-3">
              {stats.recentLeads.map((lead: any) => (
                <div
                  key={lead._id}
                  className="flex justify-between items-start border-b border-slate-100 pb-3"
                >
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      {lead.companyName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {lead.interestedService} • {lead.source}
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600">
                    {lead.priority}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-400 py-10">
              No leads yet
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="text-sm font-bold mb-4">Quick Actions</h3>

        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add New Lead", href: "/leads?new=true", icon: "➕" },
            { label: "Add Client", href: "/clients?new=true", icon: "👤" },
            { label: "New Certification", href: "/certifications?new=true", icon: "📋" },
            { label: "Create Invoice", href: "/finance?new=true", icon: "🧾" },
            { label: "Add Task", href: "/tasks?new=true", icon: "✅" },
          ].map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-sm hover:bg-slate-100 transition"
            >
              {a.icon} {a.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}