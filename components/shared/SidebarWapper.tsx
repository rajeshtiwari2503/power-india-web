"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const COLLAPSED_W = 64;
const EXPANDED_W  = 240;

export default function SidebarWrapper({ user }: { user?: any }) {
  const [expanded, setExpanded] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setExpanded(false);
  }, []);

  return (
    <>
      {/* Sidebar — fixed position, handled internally */}
      <Sidebar user={user} expanded={expanded} onExpand={setExpanded} />

      {/* Overlay for mobile when expanded */}
      {expanded && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Spacer div to push main content right */}
      <div
        className="flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: expanded ? EXPANDED_W : COLLAPSED_W }}
      />
    </>
  );
}
