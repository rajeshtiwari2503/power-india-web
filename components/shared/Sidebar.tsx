"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

type NavItem = {
  href: string;
  icon: string;
  label: string;
};

type ToolItem = {
  href: string;
  icon: string;
  label: string;
  external?: boolean;
  badge?: string;
};

type BottomItem = {
  href: string;
  icon: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard" },
  { href: "/leads", icon: "🎯", label: "Leads" },
  { href: "/clients", icon: "👥", label: "Clients" },
  { href: "/certifications", icon: "📜", label: "Certifications" },
  { href: "/documents", icon: "📁", label: "Documents" },
  { href: "/tasks", icon: "✅", label: "Tasks" },
  { href: "/finance", icon: "💰", label: "Finance" },
  { href: "/reports", icon: "📊", label: "Reports" },
];

const toolItems: ToolItem[] = [
  {
    href: "/api/proposals/generate?service=BIS-CRS",
    icon: "📄",
    label: "Proposal Generator",
    external: true,
  },
  {
    href: "/portal",
    icon: "🌐",
    label: "Client Portal",
    external: true,
    badge: "LIVE",
  },
];

const bottomItems: BottomItem[] = [
  { href: "/settings", icon: "⚙️", label: "Settings" },
];

const COLLAPSED_W = "w-16";
const EXPANDED_W = "w-60";

export default function Sidebar({
  user,
  expanded,
  onExpand,
}: {
  user: any;
  expanded: boolean;
  onExpand: (v: boolean) => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    // <aside
    //   onMouseEnter={() => onExpand(true)}
    //   onMouseLeave={() => onExpand(false)}
    //   className={`fixed top-0 left-0 z-50 h-screen flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-[#0a1628] border-r border-white/10 ${
    //     expanded ? EXPANDED_W : COLLAPSED_W
    //   }`}
    // >
    <aside
      onMouseEnter={() => onExpand(true)}
      onMouseLeave={() => onExpand(false)}
      className={`fixed top-0 left-0 z-50 h-screen flex flex-col overflow-hidden
  transition-[width,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
  bg-gradient-to-b from-[#0f172a] via-[#0a1628] to-[#111827]
  border-r border-white/10 backdrop-blur-xl shadow-2xl
  ${expanded ? EXPANDED_W : COLLAPSED_W}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 py-4 border-b border-white/10 min-h-[64px]">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black">
          P
        </div>

        {expanded && (
          <div className="overflow-hidden">
            {/* <div className="text-white text-sm font-bold">Power India</div>
            <div className="text-slate-500 text-xs">Services CRM</div> */}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        {/* <div
          className={`text-[9px] font-bold uppercase tracking-widest text-slate-700 px-1 pb-2 transition-opacity ${expanded ? "opacity-100" : "opacity-0"
            }`}
        >
          Main
        </div> */}

        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href} className="block">
              <div
                className={`flex items-center gap-2 px-2 py-2 rounded-lg text-sm font-medium transition-all relative
                ${active
                    ? "bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold"
                    : "text-slate-400 hover:bg-white/10 hover:text-slate-200"
                  }
              `}
              >
                <span className="text-lg">{item.icon}</span>

                {expanded && <span className="truncate">{item.label}</span>}

                {active && !expanded && (
                  <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </Link>
          );
        })}

        {/* Tools */}
        {/* <div className="mt-4 border-t border-white/10 pt-3"> */}
        <div className=" ">
          {/* <div
            className={`text-[9px] font-bold uppercase tracking-widest text-slate-700 px-1 pb-2 transition-opacity ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Tools
          </div> */}

          {toolItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <div className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/10 hover:text-slate-200">
                <span className="text-lg">{item.icon}</span>

                {expanded && (
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="text-[9px] bg-green-600 text-white px-1.5 py-[1px] rounded">
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-4 border-t border-white/10 pt-3">
          {bottomItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link key={item.href} href={item.href} className="block">
                <div
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all
                  ${active
                      ? "bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold"
                      : "text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    }
                `}
                >
                  <span className="text-lg">{item.icon}</span>
                  {expanded && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Footer */}
      {/* <div className="p-3 border-t border-white/10">
        <div
          className={`flex items-center gap-2 mb-2 ${
            expanded ? "justify-start" : "justify-center"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          {expanded && (
            <div>
              <div className="text-white text-xs font-bold">
                {user?.name}
              </div>
              <div className="text-slate-500 text-[10px]">
                {user?.role}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold hover:bg-red-500/20 transition"
        >
          <span>🚪</span>
          {expanded && <span>Sign Out</span>}
        </button>
      </div> */}
    </aside>
  );
}