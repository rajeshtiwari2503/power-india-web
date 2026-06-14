// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { signOut } from "next-auth/react";

// type Role = "Admin" | "Sales" | "Documentation" | "Accounts" | "Management";

// type NavItem = {
//   href: string;
//   icon: string;
//   label: string;
//   roles?: Role[]; // if undefined → visible to all roles
// };

// // ─── All nav items with role visibility ──────────────────────────
// const NAV_ITEMS: NavItem[] = [
//   // Everyone
//   { href: "/dashboard",       icon: "🏠", label: "Dashboard" },

//   // Sales + Admin + Management see Leads
//   { href: "/leads",           icon: "🎯", label: "Leads",          roles: ["Admin", "Sales", "Management"] },

//   // Tasks — all roles (filtered server-side by role)
//   { href: "/tasks",           icon: "✅", label: "My Tasks" },

//   // Clients — Admin, Accounts, Management
//   { href: "/clients",         icon: "👥", label: "Clients",        roles: ["Admin", "Accounts", "Management"] },

//   // Certifications — Admin, Documentation, Accounts, Management
//   { href: "/certifications",  icon: "📜", label: "Certifications", roles: ["Admin", "Documentation", "Accounts", "Management"] },

//   // Documents — Admin, Documentation
//   { href: "/documents",       icon: "📁", label: "Documents",      roles: ["Admin", "Documentation", "Management"] },

//   // Finance — Admin, Accounts, Management
//   { href: "/finance",         icon: "💰", label: "Finance",        roles: ["Admin", "Accounts", "Management"] },

//   // Reports — Admin, Management
//   { href: "/reports",         icon: "📊", label: "Reports",        roles: ["Admin", "Management"] },

//   // Employees — Admin, Management
//   { href: "/employees",       icon: "👤", label: "Employees",      roles: ["Admin", "Management"] },

//   // Settings — Admin only
//   { href: "/settings",        icon: "⚙️",  label: "Settings",       roles: ["Admin"] },

//   // Profile — all roles (self-service)
//   { href: "/profile",         icon: "🙍",  label: "My Profile" },
// ];

// const TOOLS = [
//   { href: "/api/proposals/generate?service=BIS-CRS", icon: "📄", label: "Proposal Generator", badge: "" },
//   { href: "/portal", icon: "🌐", label: "Client Portal", badge: "LIVE" },
// ];

// const COLLAPSED_W = "w-16";
// const EXPANDED_W  = "w-60";

// export default function Sidebar({
//   user,
//   expanded,
//   onExpand,
// }: {
//   user?: any;
//   expanded: boolean;
//   onExpand: (v: boolean) => void;
// }) {
//   const pathname = usePathname();
//   const role = (user?.role || "Sales") as Role;

//   const isActive = (href: string) =>
//     pathname === href || pathname.startsWith(href + "/");

//   // Filter items by role
//   const visibleItems = NAV_ITEMS.filter((item) =>
//     !item.roles || item.roles.includes(role)
//   );

//   return (
//     // <aside
//     //   onMouseEnter={() => onExpand(true)}
//     //   onMouseLeave={() => onExpand(false)}
//     //   className={`fixed top-0 left-0 z-50 h-screen flex flex-col overflow-hidden
//     //     transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
//     //     bg-gradient-to-b from-[#0f172a] via-[#0a1628] to-[#111827]
//     //     border-r border-white/10 shadow-2xl
//     //     ${expanded ? EXPANDED_W : COLLAPSED_W}`}
//     // >
//     //   {/* Logo */}
//     //   <div className="flex items-center gap-3 px-3 py-4 border-b border-white/10 min-h-[64px]">
//     //     <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-sm">
//     //       P
//     //     </div>
//     //     {expanded && (
//     //       <div className="overflow-hidden">
//     //         <div className="text-white text-sm font-bold leading-tight">Power India</div>
//     //         <div className="text-slate-500 text-xs">Services CRM</div>
//     //       </div>
//     //     )}
//     //   </div>

//     //   {/* User badge when expanded */}
//     //   {expanded && user && (
//     //     <div className="mx-2 mt-3 mb-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
//     //       <p className="text-white text-xs font-semibold truncate">{user.name}</p>
//     //       <p className="text-slate-400 text-xs">{role}</p>
//     //     </div>
//     //   )}

//     //   {/* Nav */}
//     //   <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-0.5">
//     //     {visibleItems.map((item) => {
//     //       const active = isActive(item.href);
//     //       return (
//     //         <Link key={item.href} href={item.href} className="block">
//     //           <div
//     //             className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium transition-all relative
//     //               ${active
//     //                 ? "bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold shadow"
//     //                 : "text-slate-400 hover:bg-white/10 hover:text-slate-200"
//     //               }`}
//     //           >
//     //             <span className="text-lg flex-shrink-0">{item.icon}</span>
//     //             {expanded && <span className="truncate">{item.label}</span>}
//     //             {active && !expanded && (
//     //               <span className="absolute right-1.5 w-1.5 h-1.5 rounded-full bg-white" />
//     //             )}
//     //           </div>
//     //         </Link>
//     //       );
//     //     })}

//     //     {/* Tools section */}
//     //     <div className="mt-3 pt-3 border-t border-white/10 space-y-0.5">
//     //       {expanded && (
//     //         <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 px-2 pb-1">
//     //           Tools
//     //         </p>
//     //       )}
//     //       {TOOLS.map((item) => (
//     //         <a
//     //           key={item.href}
//     //           href={item.href}
//     //           target="_blank"
//     //           rel="noreferrer"
//     //           className="block"
//     //         >
//     //           <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-all">
//     //             <span className="text-lg flex-shrink-0">{item.icon}</span>
//     //             {expanded && (
//     //               <span className="flex items-center gap-2 truncate">
//     //                 {item.label}
//     //                 {item.badge && (
//     //                   <span className="text-[9px] bg-green-600 text-white px-1.5 py-[1px] rounded font-bold">
//     //                     {item.badge}
//     //                   </span>
//     //                 )}
//     //               </span>
//     //             )}
//     //           </div>
//     //         </a>
//     //       ))}
//     //     </div>
//     //   </nav>

//     //   {/* Sign Out */}
//     //   <div className="p-2 border-t border-white/10">
//     //     {expanded ? (
//     //       <button
//     //         onClick={() => signOut({ callbackUrl: "/login" })}
//     //         className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold hover:bg-red-500/20 transition"
//     //       >
//     //         <span>🚪</span>
//     //         <span>Sign Out</span>
//     //       </button>
//     //     ) : (
//     //       <button
//     //         onClick={() => signOut({ callbackUrl: "/login" })}
//     //         title="Sign Out"
//     //         className="w-full flex items-center justify-center py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"
//     //       >
//     //         🚪
//     //       </button>
//     //     )}
//     //   </div>
//     // </aside>


//   );
// }


"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  user?: any;
  mobile?: boolean;
  closeSidebar?: () => void;
}
type Role = "Admin" | "Sales" | "Documentation" | "Accounts" | "Management";
type NavItem = {
  href: string;
  icon: string;
  label: string;
  roles?: Role[];
};

export default function Sidebar({
  user,
  mobile = false,
  closeSidebar,
}: SidebarProps) {
  const pathname = usePathname();
  const role = user?.role || "Sales";

  const NAV_ITEMS: NavItem[] = [
    { href: "/dashboard", icon: "🏠", label: "Dashboard" },

    { href: "/leads", icon: "🎯", label: "Leads", roles: ["Admin", "Sales", "Management"] },

    { href: "/tasks", icon: "✅", label: "My Tasks" },

    { href: "/clients", icon: "👥", label: "Clients", roles: ["Admin", "Accounts", "Management"] },

    {
      href: "/certifications",
      icon: "📜",
      label: "Certifications",
      roles: ["Admin", "Documentation", "Accounts", "Management"],
    },

    {
      href: "/documents",
      icon: "📁",
      label: "Documents",
      roles: ["Admin", "Documentation", "Management"],
    },

    {
      href: "/finance",
      icon: "💰",
      label: "Finance",
      roles: ["Admin", "Accounts", "Management"],
    },

    {
      href: "/reports",
      icon: "📊",
      label: "Reports",
      roles: ["Admin", "Management"],
    },

    {
      href: "/employees",
      icon: "👤",
      label: "Employees",
      roles: ["Admin", "Management"],
    },

    {
      href: "/settings",
      icon: "⚙️",
      label: "Settings",
      roles: ["Admin"],
    },

    {
      href: "/profile",
      icon: "🙍",
      label: "My Profile",
    },
  ];

  const TOOLS = [
    {
      href: "/api/proposals/generate?service=BIS-CRS",
      icon: "📄",
      label: "Proposal Generator",
      badge: "",
    },
    {
      href: "/portal",
      icon: "🌐",
      label: "Client Portal",
      badge: "LIVE",
    },
  ];

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  return (
    <aside
      className={`
        ${mobile
          ? "w-full h-full"
          : "fixed left-0 top-0 h-screen w-64"
        }

        bg-white
        border-r
        border-slate-200
        shadow-sm
        flex
        flex-col
        z-50
      `}
    >
      {/* Logo */}
      <div className="py-[13.5px] px-4 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center">
          <div className="w-10 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            P
          </div>

          <div className="ml-3">
            <h2 className="text-sm font-bold text-slate-900">
              Power India
            </h2>

            <p className="text-xs text-slate-500">
              Services CRM
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {mobile && (
          <button
            onClick={closeSidebar}
            className="
        lg:hidden
        w-8
        h-8
        flex
        items-center
        justify-center
        rounded-lg
        hover:bg-slate-100
        text-slate-600
        text-xl
        font-bold
      "
          >
            ✕
          </button>
        )}
      </div>

      {/* User */}
      {/* {user && (
        <div className="mx-3 mt-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
          <p className="font-semibold text-sm text-slate-800 truncate">
            {user.name}
          </p>

          <p className="text-xs text-slate-500 capitalize">
            {role}
          </p>
        </div>
      )} */}

      {/* Navigation */}
      <nav
        className="
          flex-1
          overflow-y-auto
          px-3
          py-3
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
        <div className="space-y-1">
          {visibleItems.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => closeSidebar?.()}
              >
                <div
                  className={`
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all

                    ${active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "text-slate-700 hover:bg-slate-100"
                    }
                  `}
                >
                  <span className="text-lg">
                    {item.icon}
                  </span>

                  <span className="truncate">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tools */}
        <div className="mt-5 pt-4 border-t border-slate-200">
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tools
          </p>

          <div className="space-y-1">
            {TOOLS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    text-slate-700
                    hover:bg-slate-100
                    transition-all
                  "
                >
                  <span className="text-lg">
                    {item.icon}
                  </span>

                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>

                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 shrink-0">
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-2.5
            cursor-pointer
            rounded-xl
            bg-red-50
            border
            border-red-200
            text-red-600
            font-medium
            hover:bg-red-100
            transition
          "
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}