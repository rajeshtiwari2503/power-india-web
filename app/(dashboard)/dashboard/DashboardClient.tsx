"use client";

import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#2563eb","#f97316","#16a34a","#dc2626","#9333ea","#0891b2"];

function StatCard({
  label, value, icon, color = "#2563eb", sub,
}: {
  label: string; value: string | number; icon: string; color?: string; sub?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-slate-500 font-medium mb-2">{label}</div>
          <div className="text-2xl font-extrabold text-slate-900">{value}</div>
          {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
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
  employeeStats: any;
  role: string;
  userName: string;
};

/* ─── EMPLOYEE DASHBOARD ───────────────────────────────────────── */
function EmployeeDashboard({ stats, userName }: { stats: any; userName: string }) {
  return (
    <div className="space-y-6 text-black">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-sm text-slate-500">Here are your tasks and leads for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="My Total Tasks"    value={stats.myTasks}        icon="✅" color="#2563eb" />
        <StatCard label="Pending Tasks"     value={stats.myPendingTasks}  icon="⏳" color="#f97316" sub={stats.myOverdueTasks > 0 ? `${stats.myOverdueTasks} overdue` : undefined} />
        <StatCard label="Completed Tasks"   value={stats.myCompletedTasks} icon="🏆" color="#16a34a" />
        <StatCard label="Assigned Leads"    value={stats.myLeads}         icon="🎯" color="#9333ea" />
      </div>

      {/* Overdue warning */}
      {stats.myOverdueTasks > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-red-700">You have {stats.myOverdueTasks} overdue task{stats.myOverdueTasks > 1 ? "s" : ""}</p>
            <p className="text-sm text-red-500">Please update these tasks as soon as possible.</p>
          </div>
        </div>
      )}

      {/* My upcoming tasks */}
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="p-5 border-b">
          <h2 className="font-bold text-slate-900 text-lg">My Upcoming Tasks</h2>
          <p className="text-xs text-slate-500 mt-0.5">Pending &amp; In-Progress tasks sorted by due date</p>
        </div>
        <div className="divide-y">
          {stats.recentMyTasks.length === 0 && (
            <div className="p-8 text-center text-slate-400">🎉 No pending tasks — you're all caught up!</div>
          )}
          {stats.recentMyTasks.map((task: any) => {
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
            return (
              <div key={task._id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-800">{task.title}</p>
                  {task.lead && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      🎯 {task.lead.leadId} · {task.lead.companyName}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    task.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {task.status}
                  </span>
                  {task.dueDate && (
                    <p className={`text-xs mt-1 ${isOverdue ? "text-red-600 font-semibold" : "text-slate-400"}`}>
                      📅 {new Date(task.dueDate).toLocaleDateString("en-IN")}
                      {isOverdue && " ⚠️"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── ADMIN / MANAGEMENT DASHBOARD ────────────────────────────── */
function AdminDashboard({ stats, role }: { stats: any; role: string }) {
  const pieData = stats.certificationsByStage.map((s: any) => ({
    name: s._id,
    value: s.count,
  }));

  return (
    <div className="space-y-6 text-black">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Leads"        value={stats.totalLeads}          icon="🎯" color="#2563eb" sub={`+${stats.leadsThisMonth} this month`} />
        <StatCard label="Active Clients"     value={stats.activeClients}       icon="👥" color="#16a34a" />
        <StatCard label="Active Certs"       value={stats.activeCertifications} icon="📜" color="#9333ea" sub={`${stats.upcomingRenewals} due in 30d`} />
        <StatCard label="Pending Tasks"      value={stats.pendingTasks}        icon="✅" color="#f97316" sub={stats.overdueTasks > 0 ? `${stats.overdueTasks} overdue` : undefined} />
      </div>

      {role !== "Documentation" && (
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total Revenue"    value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`} icon="💰" color="#16a34a" />
          <StatCard label="Pending Invoices" value={stats.pendingInvoices} icon="📄" color="#dc2626" />
        </div>
      )}

      {/* Certifications chart */}
      {pieData.length > 0 && (
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">Certifications by Stage</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <PieChart width={180} height={180}>
              <Pie data={pieData} cx={85} cy={85} innerRadius={50} outerRadius={80} dataKey="value">
                {pieData.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div className="flex flex-col gap-2">
              {pieData.map((d: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-slate-600">{d.name}</span>
                  <span className="font-semibold">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Leads */}
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="p-5 border-b">
          <h2 className="font-bold text-slate-900">Recent Leads</h2>
        </div>
        <div className="divide-y">
          {stats.recentLeads.map((lead: any) => (
            <div key={lead._id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800">{lead.companyName}</p>
                <p className="text-xs text-slate-500">{lead.contactPerson} · {lead.interestedService}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-medium ${
                lead.status === "Converted" ? "bg-green-100 text-green-700" :
                lead.status === "Lost" ? "bg-red-100 text-red-600" :
                "bg-blue-100 text-blue-700"
              }`}>
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── EXPORT ────────────────────────────────────────────────────── */
export default function DashboardClient({ stats, employeeStats, role, userName }: Props) {
  if (employeeStats) {
    return <EmployeeDashboard stats={employeeStats} userName={userName} />;
  }
  return <AdminDashboard stats={stats} role={role} />;
}
