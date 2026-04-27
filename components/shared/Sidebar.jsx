//  "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { signOut } from "next-auth/react";

// const navItems = [
//   { href: "/dashboard", icon: "🏠", label: "Dashboard" },
//   { href: "/leads", icon: "🎯", label: "Leads" },
//   { href: "/clients", icon: "👥", label: "Clients" },
//   { href: "/certifications", icon: "📜", label: "Certifications" },
//   { href: "/documents", icon: "📁", label: "Documents" },
//   { href: "/tasks", icon: "✅", label: "Tasks" },
//   { href: "/finance", icon: "💰", label: "Finance" },
//   { href: "/reports", icon: "📊", label: "Reports" },
// ];

// const bottomItems = [
//   { href: "/settings", icon: "⚙️", label: "Settings" },
// ];

// export default function Sidebar({ user }) {
//   const pathname = usePathname();
//   const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

//   return (
//     <aside style={{
//       width: 240,
//       background: "#0a1628",
//       minHeight: "100vh",
//       position: "fixed",
//       top: 0, left: 0,
//       zIndex: 50,
//       display: "flex",
//       flexDirection: "column",
//       borderRight: "1px solid rgba(255,255,255,0.06)",
//     }}>
//       {/* Logo */}
//       <div style={{ padding: "22px 18px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #f97316, #ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 900, color: "white", flexShrink: 0 }}>P</div>
//           <div>
//             <div style={{ color: "white", fontWeight: 800, fontSize: 13, lineHeight: 1.1 }}>Power India</div>
//             <div style={{ color: "#475569", fontSize: 10, fontWeight: 500 }}>Services CRM</div>
//           </div>
//         </div>
//       </div>

//       {/* Main Nav */}
//       <nav style={{ flex: 1, padding: "14px 10px", overflowY: "auto" }}>
//         <div style={{ fontSize: 10, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 10px 8px" }}>Main</div>
//         {navItems.map((item) => (
//           <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
//             <div style={{
//               display: "flex", alignItems: "center", gap: 9,
//               padding: "8px 10px", borderRadius: 8,
//               margin: "1px 0",
//               background: isActive(item.href) ? "linear-gradient(135deg, #1e40af, #2563eb)" : "transparent",
//               color: isActive(item.href) ? "white" : "#64748b",
//               fontSize: 13, fontWeight: isActive(item.href) ? 700 : 500,
//               transition: "all 0.15s", cursor: "pointer",
//             }}
//               onMouseEnter={e => { if (!isActive(item.href)) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = isActive(item.href) ? "white" : "#cbd5e1"; }}
//               onMouseLeave={e => { if (!isActive(item.href)) e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = isActive(item.href) ? "white" : "#64748b"; }}
//             >
//               <span style={{ fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
//               {item.label}
//             </div>
//           </Link>
//         ))}

//         <div style={{ fontSize: 10, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", padding: "16px 10px 8px", marginTop: 8, borderTop: "1px solid rgba(255,255,255,0.05)" }}>Tools</div>

//         {/* Proposal Generator quick link */}
//         <a href="/api/proposals/generate?service=BIS-CRS" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
//           <div style={{
//             display: "flex", alignItems: "center", gap: 9,
//             padding: "8px 10px", borderRadius: 8, margin: "1px 0",
//             color: "#64748b", fontSize: 13, fontWeight: 500, cursor: "pointer",
//             transition: "all 0.15s",
//           }}
//             onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#cbd5e1"; }}
//             onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}
//           >
//             <span style={{ fontSize: 15 }}>📄</span> Proposal Generator
//           </div>
//         </a>

//         {/* Client Portal */}
//         <a href="/portal" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
//           <div style={{
//             display: "flex", alignItems: "center", gap: 9,
//             padding: "8px 10px", borderRadius: 8, margin: "1px 0",
//             color: "#64748b", fontSize: 13, fontWeight: 500, cursor: "pointer",
//             transition: "all 0.15s",
//           }}
//             onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#cbd5e1"; }}
//             onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}
//           >
//             <span style={{ fontSize: 15 }}>🌐</span> Client Portal
//             <span style={{ marginLeft: "auto", fontSize: 10, background: "#16a34a", color: "white", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>LIVE</span>
//           </div>
//         </a>

//         {/* Bottom items */}
//         <div style={{ marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
//           {bottomItems.map(item => (
//             <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
//               <div style={{
//                 display: "flex", alignItems: "center", gap: 9,
//                 padding: "8px 10px", borderRadius: 8, margin: "1px 0",
//                 background: isActive(item.href) ? "rgba(255,255,255,0.08)" : "transparent",
//                 color: isActive(item.href) ? "white" : "#64748b",
//                 fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
//               }}>
//                 <span style={{ fontSize: 15 }}>{item.icon}</span>{item.label}
//               </div>
//             </Link>
//           ))}
//         </div>
//       </nav>

//       {/* User footer */}
//       <div style={{ padding: "14px 14px 18px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
//           <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #1e40af, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
//             {user?.name?.[0]?.toUpperCase() || "U"}
//           </div>
//           <div style={{ overflow: "hidden", flex: 1 }}>
//             <div style={{ color: "white", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name}</div>
//             <div style={{ color: "#475569", fontSize: 11 }}>{user?.role}</div>
//           </div>
//         </div>
//         <button
//           onClick={() => signOut({ callbackUrl: "/login" })}
//           style={{ width: "100%", padding: "7px", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.25)", color: "#fca5a5", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}
//           onMouseEnter={e => { e.target.style.background = "rgba(220,38,38,0.25)"; }}
//           onMouseLeave={e => { e.target.style.background = "rgba(220,38,38,0.15)"; }}
//         >Sign Out</button>
//       </div>
//     </aside>
//   );
// }


"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard",      icon: "🏠", label: "Dashboard" },
  { href: "/leads",          icon: "🎯", label: "Leads" },
  { href: "/clients",        icon: "👥", label: "Clients" },
  { href: "/certifications", icon: "📜", label: "Certifications" },
  { href: "/documents",      icon: "📁", label: "Documents" },
  { href: "/tasks",          icon: "✅", label: "Tasks" },
  { href: "/finance",        icon: "💰", label: "Finance" },
  { href: "/reports",        icon: "📊", label: "Reports" },
];

const toolItems = [
  { href: "/api/proposals/generate?service=BIS-CRS", icon: "📄", label: "Proposal Generator", external: true },
  { href: "/portal", icon: "🌐", label: "Client Portal", external: true, badge: "LIVE" },
];

const bottomItems = [
  { href: "/settings", icon: "⚙️", label: "Settings" },
];

const COLLAPSED_W = 64;
const EXPANDED_W  = 240;

export default function Sidebar({ user, expanded, onExpand }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");
  const w = expanded ? EXPANDED_W : COLLAPSED_W;

  const labelStyle = {
    opacity: expanded ? 1 : 0,
    maxWidth: expanded ? 160 : 0,
    transition: "opacity 0.2s, max-width 0.25s",
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "nowrap",
  };

  const sectionLabel = {
    fontSize: 9, fontWeight: 700, color: "#334155",
    textTransform: "uppercase", letterSpacing: "0.1em",
    padding: "0 6px 8px",
    opacity: expanded ? 1 : 0,
    transition: "opacity 0.15s",
    whiteSpace: "nowrap",
  };

  const navItem = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: expanded ? 10 : 0,
    padding: "9px",
    borderRadius: 9,
    margin: "2px 0",
    justifyContent: expanded ? "flex-start" : "center",
    background: active ? "linear-gradient(135deg,#1e40af,#2563eb)" : "transparent",
    color: active ? "white" : "#64748b",
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    transition: "background 0.15s, color 0.15s, gap 0.25s",
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
    textDecoration: "none",
  });

  return (
    <aside
      onMouseEnter={() => onExpand(true)}
      onMouseLeave={() => onExpand(false)}
      style={{
        width: w,
        minHeight: "100vh",
        position: "fixed",
        top: 0, left: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        background: "#0a1628",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div style={{
        padding: "18px 13px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", gap: 10,
        minHeight: 64,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: "linear-gradient(135deg,#f97316,#ea580c)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 17, fontWeight: 900, color: "white",
        }}>P</div>
        <div style={{ ...labelStyle, maxWidth: expanded ? 150 : 0 }}>
          <div style={{ color: "white", fontWeight: 800, fontSize: 13 }}>Power India</div>
          <div style={{ color: "#475569", fontSize: 10 }}>Services CRM</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto", overflowX: "hidden" }}>
        <div style={sectionLabel}>Main</div>

        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none", display: "block" }}>
              <div
                title={!expanded ? item.label : ""}
                style={navItem(active)}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#cbd5e1"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; } }}
              >
                <span style={{ fontSize: 17, flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                <span style={labelStyle}>{item.label}</span>
                {active && !expanded && (
                  <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", width: 5, height: 5, borderRadius: "50%", background: "white" }} />
                )}
              </div>
            </Link>
          );
        })}

        {/* Tools */}
        <div style={{ margin: "10px 0 8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10 }}>
          <div style={sectionLabel}>Tools</div>
          {toolItems.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "block" }}>
              <div
                title={!expanded ? item.label : ""}
                style={navItem(false)}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#cbd5e1"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}
              >
                <span style={{ fontSize: 17, flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                <span style={{ ...labelStyle, display: "inline-flex", alignItems: "center", gap: 6 }}>
                  {item.label}
                  {item.badge && (
                    <span style={{ fontSize: 9, background: "#16a34a", color: "white", padding: "1px 5px", borderRadius: 4, fontWeight: 700, flexShrink: 0 }}>
                      {item.badge}
                    </span>
                  )}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Settings */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10, marginTop: 8 }}>
          {bottomItems.map(item => {
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none", display: "block" }}>
                <div
                  title={!expanded ? item.label : ""}
                  style={navItem(active)}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#cbd5e1"; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; } }}
                >
                  <span style={{ fontSize: 17, flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                  <span style={labelStyle}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Footer */}
      <div style={{ padding: "12px 10px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{
          display: "flex", alignItems: "center",
          gap: expanded ? 10 : 0,
          justifyContent: expanded ? "flex-start" : "center",
          marginBottom: expanded ? 10 : 6,
          transition: "gap 0.25s, margin-bottom 0.25s",
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg,#1e40af,#2563eb)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 800, fontSize: 13,
          }}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div style={{ ...labelStyle, maxWidth: expanded ? 140 : 0 }}>
            <div style={{ color: "white", fontSize: 12, fontWeight: 700 }}>{user?.name}</div>
            <div style={{ color: "#475569", fontSize: 10 }}>{user?.role}</div>
          </div>
        </div>

        <div
          title={!expanded ? "Sign Out" : ""}
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            display: "flex", alignItems: "center",
            gap: expanded ? 8 : 0,
            justifyContent: expanded ? "flex-start" : "center",
            padding: "7px 8px",
            borderRadius: 8,
            background: "rgba(220,38,38,0.12)",
            border: "1px solid rgba(220,38,38,0.2)",
            color: "#fca5a5",
            fontSize: 12, fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(220,38,38,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(220,38,38,0.12)"}
        >
          <span style={{ fontSize: 14, flexShrink: 0 }}>🚪</span>
          <span style={{ ...labelStyle, maxWidth: expanded ? 100 : 0 }}>Sign Out</span>
        </div>
      </div>
    </aside>
  );
}