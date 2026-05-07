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

// 🔍 GLOBAL SEARCH
function GlobalSearch() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 400);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const icons: Record<string, string> = {
    leads: "🎯",
    clients: "👥",
    certifications: "📜",
  };

  const links: Record<string, string> = {
    leads: "/leads",
    clients: "/clients",
    certifications: "/certifications",
  };

  return (
    <div ref={ref} className="relative flex-1 max-w-[420px]">
      {/* INPUT */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="Search leads, clients, certifications..."
          onFocus={(e) => {
            setOpen(true);
            e.currentTarget.className =
              e.currentTarget.className +
              " bg-white border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]";
          }}
          onBlur={(e) => {
            e.currentTarget.className =
              "w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 outline-none transition-all";
          }}
          className="w-full pl-9 pr-10 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 outline-none transition-all"
        />

        {/* CLEAR */}
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults(null);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          >
            ✕
          </button>
        )}
      </div>

      {/* DROPDOWN */}
      {open && query && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
          {loading ? (
            <div className="p-5 text-center">Searching...</div>
          ) : results &&
            Object.values(results).every((v) => v.length === 0) ? (
            <div className="p-5 text-center">No results for "{query}"</div>
          ) : (
            results && (
              <div className="max-h-[350px] overflow-y-auto">
                {Object.entries(results).map(([type, items]) =>
                  items.length === 0 ? null : (
                    <div key={type}>
                      <div className="px-3 py-2 text-xs font-bold text-slate-400 bg-slate-50">
                        {icons[type]} {type}
                      </div>

                      {items.map((item) => (
                        <a
                          key={item._id}
                          href={`${links[type]}?highlight=${item._id}`}
                          onClick={() => setOpen(false)}
                          className="block px-3 py-2 text-slate-900 hover:bg-blue-50"
                        >
                          <div className="font-semibold">
                            {item.companyName ||
                              item.companyLegalName ||
                              item.applicationId}
                          </div>
                          {item.sub && (
                            <div className="text-xs text-slate-500">
                              {item.sub}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

// 🧠 HEADER
export default function Header({ user }: any) {
  return (
    <header className="bg-white text-black border-b border-slate-200 px-6 py-3.5 flex items-center gap-4 sticky top-0 z-40">
      <GlobalSearch />

      <div className="flex items-center gap-3 ml-auto">
        <div className="text-xs text-slate-400">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </div>

        <NotificationBell />

        <div className="bg-slate-100 px-3 py-1 rounded-md text-xs">
          {user?.role}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-3 py-1 border border-slate-200 rounded-md text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}