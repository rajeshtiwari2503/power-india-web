//  "use client";
// import { signOut } from "next-auth/react";
// import { useState, useEffect, useRef } from "react";
// import NotificationBell from "./NotificationBell";

// function GlobalSearch() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);
//   const timer = useRef(null);

//   useEffect(() => {
//     if (!query.trim()) { setResults(null); return; }
//     clearTimeout(timer.current);
//     timer.current = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
//         const data = await res.json();
//         setResults(data);
//       } catch (e) {}
//       setLoading(false);
//     }, 300);
//   }, [query]);

//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const icons = { leads: "🎯", clients: "👥", certifications: "📜" };
//   const links = { leads: "/leads", clients: "/clients", certifications: "/certifications" };

//   return (
//     <div ref={ref} style={{ position: "relative", flex: 1, maxWidth: 400 }}>
//       <div style={{ position: "relative" }}>
//         <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 16 }}>🔍</span>
//         <input
//           value={query}
//           onChange={e => { setQuery(e.target.value); setOpen(true); }}
//           onFocus={() => setOpen(true)}
//           placeholder="Search leads, clients, certifications..."
//           style={{
//             width: "100%", padding: "9px 12px 9px 36px",
//             border: "1px solid #e2e8f0", borderRadius: 10,
//             fontSize: 13, background: "#f8fafc", outline: "none", transition: "all 0.2s",
//           }}
//           onFocus={e => { e.target.style.background = "white"; e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; setOpen(true); }}
//           onBlur={e => { e.target.style.background = "#f8fafc"; e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
//         />
//         {query && (
//           <button onClick={() => { setQuery(""); setResults(null); }} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 16 }}>✕</button>
//         )}
//       </div>
//       {open && query && (
//         <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "white", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", zIndex: 200, overflow: "hidden" }}>
//           {loading ? (
//             <div style={{ padding: 20, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Searching...</div>
//           ) : results && Object.entries(results).every(([, v]) => v.length === 0) ? (
//             <div style={{ padding: 20, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>No results for "{query}"</div>
//           ) : results ? (
//             <div style={{ maxHeight: 360, overflowY: "auto" }}>
//               {Object.entries(results).map(([type, items]) =>
//                 items.length === 0 ? null : (
//                   <div key={type}>
//                     <div style={{ padding: "8px 14px 4px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", background: "#f8fafc" }}>
//                       {icons[type]} {type}
//                     </div>
//                     {items.map(item => (
//                       <a key={item._id} href={`${links[type]}?highlight=${item._id}`} onClick={() => setOpen(false)}
//                         style={{ display: "block", padding: "10px 14px", textDecoration: "none", borderBottom: "1px solid #f8fafc" }}
//                         onMouseEnter={e => e.currentTarget.style.background = "#f0f7ff"}
//                         onMouseLeave={e => e.currentTarget.style.background = "white"}
//                       >
//                         <div style={{ fontWeight: 600, fontSize: 13, color: "#0f172a" }}>{item.companyName || item.companyLegalName || item.applicationId}</div>
//                         {item.sub && <div style={{ fontSize: 12, color: "#64748b" }}>{item.sub}</div>}
//                       </a>
//                     ))}
//                   </div>
//                 )
//               )}
//             </div>
//           ) : null}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function Header({ user }) {
//   return (
//     <header style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "10px 24px", display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 40, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
//       <GlobalSearch />
//       <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
//         <div style={{ fontSize: 13, color: "#94a3b8", whiteSpace: "nowrap" }}>
//           {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
//         </div>
//         <NotificationBell />
//         <div style={{ background: "#f1f5f9", padding: "5px 12px", borderRadius: 8, fontSize: 12, color: "#475569", fontWeight: 600 }}>{user?.role}</div>
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #1e40af, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 13 }}>
//             {user?.name?.[0]?.toUpperCase() || "U"}
//           </div>
//           <button onClick={() => signOut({ callbackUrl: "/login" })}
//             style={{ padding: "6px 12px", borderRadius: 8, background: "transparent", border: "1px solid #e2e8f0", color: "#64748b", fontSize: 12, cursor: "pointer", fontWeight: 500 }}
//             onMouseEnter={e => { e.target.style.background = "#fef2f2"; e.target.style.color = "#dc2626"; }}
//             onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#64748b"; }}
//           >Sign Out</button>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import NotificationBell from "./NotificationBell";

// 🔍 GLOBAL SEARCH
function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  const timer = useRef(null);

  // 🔥 Debounce Search
  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    clearTimeout(timer.current);

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

  // 🔥 Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const icons = {
    leads: "🎯",
    clients: "👥",
    certifications: "📜",
  };

  const links = {
    leads: "/leads",
    clients: "/clients",
    certifications: "/certifications",
  };

  return (
    <div ref={ref} style={{ position: "relative", flex: 1, maxWidth: 420 }}>
      {/* 🔍 INPUT */}
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
          }}
        >
          🔍
        </span>

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="Search leads, clients, certifications..."
          style={{
            width: "100%",
            padding: "10px 12px 10px 36px",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            fontSize: 13,
            background: "#f8fafc",
            outline: "none",
            transition: "all 0.2s",
          }}
          onFocus={(e) => {
            setOpen(true);
            e.target.style.background = "white";
            e.target.style.borderColor = "#2563eb";
            e.target.style.boxShadow =
              "0 0 0 3px rgba(37,99,235,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.background = "#f8fafc";
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = "none";
          }}
        />

        {/* ❌ CLEAR BUTTON */}
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults(null);
            }}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* 🔽 DROPDOWN */}
      {open && query && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            background: "white",
            borderRadius: 14,
            border: "1px solid #e2e8f0",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: 20, textAlign: "center" }}>
              Searching...
            </div>
          ) : results &&
            Object.values(results).every((v) => v.length === 0) ? (
            <div style={{ padding: 20, textAlign: "center" }}>
              No results for "{query}"
            </div>
          ) : results ? (
            <div style={{ maxHeight: 350, overflowY: "auto" }}>
              {Object.entries(results).map(([type, items]) =>
                items.length === 0 ? null : (
                  <div key={type}>
                    <div
                      style={{
                        padding: "8px 14px",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#94a3b8",
                        background: "#f8fafc",
                      }}
                    >
                      {icons[type]} {type}
                    </div>

                    {items.map((item) => (
                      <a
                        key={item._id}
                        href={`${links[type]}?highlight=${item._id}`}
                        onClick={() => setOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 14px",
                          textDecoration: "none",
                          color: "#0f172a",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f0f7ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "white")
                        }
                      >
                        <div style={{ fontWeight: 600 }}>
                          {item.companyName ||
                            item.companyLegalName ||
                            item.applicationId}
                        </div>
                        {item.sub && (
                          <div style={{ fontSize: 12, color: "#64748b" }}>
                            {item.sub}
                          </div>
                        )}
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

// 🧠 HEADER
export default function Header({ user }) {
  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <GlobalSearch />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginLeft: "auto",
        }}
      >
        <div style={{ fontSize: 13, color: "#94a3b8" }}>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </div>

        <NotificationBell />

        <div
          style={{
            background: "#f1f5f9",
            padding: "5px 12px",
            borderRadius: 8,
            fontSize: 12,
          }}
        >
          {user?.role}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#2563eb",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}