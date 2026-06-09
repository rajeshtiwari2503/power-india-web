"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import NotificationBell from "./NotificationBell";

type SearchItem = {
  _id: string;
  companyName?: string;
  companyLegalName?: string;
  applicationId?: string;
  sub?: string;
};

type SearchResults = {
  leads: SearchItem[];
  clients: SearchItem[];
  certifications: SearchItem[];
};

const ROLE_COLORS: Record<string, string> = {
  Admin:         "bg-red-100 text-red-700",
  Sales:         "bg-blue-100 text-blue-700",
  Documentation: "bg-green-100 text-green-700",
  Accounts:      "bg-yellow-100 text-yellow-700",
  Management:    "bg-purple-100 text-purple-700",
};

function GlobalSearch() {
  const [query, setQuery]     = useState<string>("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen]       = useState<boolean>(false);

  const ref   = useRef<HTMLDivElement | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query.trim()) { setResults(null); return; }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res  = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch {}
      setLoading(false);
    }, 400);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const icons: Record<string, string> = { leads: "🎯", clients: "👥", certifications: "📜" };
  const links: Record<string, string> = { leads: "/leads", clients: "/clients", certifications: "/certifications" };

  return (
    <div ref={ref} className="relative flex-1 max-w-[420px]">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search leads, clients, certifications..."
          className="w-full pl-9 pr-10 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 outline-none focus:border-blue-500 focus:bg-white transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setResults(null); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >✕</button>
        )}
      </div>

      {open && query && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
          {loading ? (
            <div className="p-5 text-center text-sm text-slate-500">Searching...</div>
          ) : results && Object.values(results).every((v) => v.length === 0) ? (
            <div className="p-5 text-center text-sm text-slate-500">No results for "{query}"</div>
          ) : results ? (
            <div className="max-h-[350px] overflow-y-auto">
              {Object.entries(results).map(([type, items]) =>
                items.length === 0 ? null : (
                  <div key={type}>
                    <div className="px-3 py-2 text-xs font-bold text-slate-400 bg-slate-50 uppercase tracking-wide">
                      {icons[type]} {type}
                    </div>
                    {items.map((item) => (
                      <a
                        key={item._id}
                        href={`${links[type]}?highlight=${item._id}`}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2.5 text-slate-900 hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-semibold text-sm">
                          {item.companyName || item.companyLegalName || item.applicationId}
                        </div>
                        {item.sub && <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>}
                      </a>
                    ))}
                  </div>
                )
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default function Header({ user }: { user?: any }) {
  return (
    <header className="bg-white text-black border-b border-slate-200 px-6 py-3.5 flex items-center gap-4 sticky top-0 z-40">
      <GlobalSearch />

      <div className="flex items-center gap-3 ml-auto">
        {/* Date */}
        <div className="text-xs text-slate-400 hidden sm:block">
          {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
        </div>

        <NotificationBell />

        {/* Role badge */}
        {user?.role && (
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${ROLE_COLORS[user.role] || "bg-slate-100 text-slate-600"}`}>
            {user.role}
          </span>
        )}

        {/* Avatar + name + sign out */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <span className="text-sm font-medium text-slate-700 hidden md:block">{user?.name}</span>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
