 "use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area, CartesianGrid,
} from "recharts";
import { useState } from "react";

/* ---------------- TYPES ---------------- */

type Lead = {
  month: string;
  total: number;
  converted: number;
  lost: number;
};

type Revenue = {
  month: string;
  invoiced: number;
  revenue: number;
};

type Client = {
  name?: string;
  certCount: number;
};

type Props = {
  data: {
    totals: {
      leads: number;
      clients: number;
      certs: number;
      revenue: number;
    };
    conversionRate: number;
    monthlyLeads: Lead[];
    monthlyRevenue: Revenue[];
    topClients: Client[];
    leadsBySource: { _id: string; count: number }[];
    leadsByPriority: { _id: string; count: number }[];
    paymentSummary: { _id: string; amount: number; count: number }[];
    certsByType: { _id: string; count: number }[];
    certsByStage: { _id: string; count: number }[];
    renewalSoon: any[];
  };
};

/* ---------------- CONSTANTS ---------------- */

const COLORS = [
  "#2563eb", "#f97316", "#16a34a", "#dc2626",
  "#9333ea", "#0891b2", "#ca8a04", "#db2777"
];

/* ---------------- TOOLTIP ---------------- */

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg">
      <p className="font-bold text-slate-900 mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-bold text-slate-900">
            {typeof p.value === "number"
              ? p.value.toLocaleString("en-IN")
              : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ---------------- UI COMPONENTS ---------------- */

const SectionHeader = ({ title, subtitle }: any) => (
  <div className="mb-5">
    <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
    {subtitle && (
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    )}
  </div>
);

const KPICard = ({ label, value, sub, color, icon }: any) => (
  <div
    className="bg-white rounded-xl p-5 border shadow-sm"
    style={{ borderTop: `3px solid ${color}` }}
  >
    <div className="flex justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase">
          {label}
        </p>
        <p className="text-3xl font-extrabold text-slate-900">
          {value}
        </p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  </div>
);

/* ---------------- MAIN ---------------- */

export default function ReportsClient({ data }: Props) {
  const [activeTab, setActiveTab] =
    useState<"overview" | "leads" | "revenue" | "certifications" | "renewals">(
      "overview"
    );

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "leads", label: "Lead Analytics" },
    { id: "revenue", label: "Revenue" },
    { id: "certifications", label: "Certifications" },
    { id: "renewals", label: "Renewal Alerts" },
  ] as const;

  return (
    <div className="space-y-6 text-black">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Reports & Analytics
        </h1>
        <p className="text-sm text-slate-500">
          Business intelligence dashboard
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm rounded-md transition font-medium
              ${
                activeTab === tab.id
                  ? "bg-white shadow text-slate-900"
                  : "text-slate-500"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ---------------- OVERVIEW ---------------- */}
      {activeTab === "overview" && (
        <div className="space-y-6">

          {/* KPI GRID */}
          <div className="grid grid-cols-4 gap-4">
            <KPICard
              label="Total Leads"
              value={data.totals.leads}
              color="#2563eb"
              icon="🎯"
              sub={`${data.conversionRate}% conversion`}
            />
            <KPICard
              label="Clients"
              value={data.totals.clients}
              color="#16a34a"
              icon="👥"
            />
            <KPICard
              label="Certifications"
              value={data.totals.certs}
              color="#f97316"
              icon="📜"
            />
            <KPICard
              label="Revenue"
              value={`₹${(data.totals.revenue / 1000).toFixed(0)}K`}
              color="#9333ea"
              icon="💰"
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-2 gap-5">

            <div className="bg-white p-5 rounded-xl border">
              <SectionHeader title="Monthly Leads" />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.monthlyLeads}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="total" fill="#2563eb" />
                  <Bar dataKey="converted" fill="#16a34a" />
                  <Bar dataKey="lost" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-5 rounded-xl border">
              <SectionHeader title="Revenue Trend" />
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={data.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area dataKey="invoiced" fill="#e5e7eb" />
                  <Area dataKey="revenue" fill="#2563eb" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- LEADS ---------------- */}
      {activeTab === "leads" && (
        <div className="space-y-6">

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white p-5 rounded-xl border">
              <SectionHeader title="Lead Sources" />
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={data.leadsBySource}
                    dataKey="count"
                    nameKey="_id"
                    outerRadius={80}
                  >
                    {data.leadsBySource.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-5 rounded-xl border">
              <SectionHeader title="Priority" />
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={data.leadsByPriority}
                    dataKey="count"
                    nameKey="_id"
                    innerRadius={50}
                    outerRadius={80}
                  >
                    {data.leadsByPriority.map((p, i) => (
                      <Cell
                        key={i}
                        fill={
                          p._id === "Hot"
                            ? "#dc2626"
                            : p._id === "Warm"
                            ? "#f97316"
                            : "#2563eb"
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}