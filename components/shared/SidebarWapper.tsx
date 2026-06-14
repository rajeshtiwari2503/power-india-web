// "use client";

// import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";

// const COLLAPSED_W = 64;
// const EXPANDED_W  = 240;

// export default function SidebarWrapper({ user }: { user?: any }) {
//   const [expanded, setExpanded] = useState(false);

//   // Close sidebar on route change (mobile)
//   useEffect(() => {
//     setExpanded(false);
//   }, []);

//   return (
//     <>
//       {/* Sidebar — fixed position, handled internally */}
//       <Sidebar user={user} expanded={expanded} onExpand={setExpanded} />

//       {/* Overlay for mobile when expanded */}
//       {expanded && (
//         <div
//           className="fixed inset-0 z-40 bg-black/30 lg:hidden"
//           onClick={() => setExpanded(false)}
//         />
//       )}

//       {/* Spacer div to push main content right */}
//       <div
//         className="flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
//         style={{ width: expanded ? EXPANDED_W : COLLAPSED_W }}
//       />
//     </>
//   );
// } 

"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function SidebarWrapper({
  user,
}: {
  user?: any;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <Header
        user={user}
        onMenuClick={() => setOpen(true)}
      />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar user={user} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-[60]
          h-screen w-72 bg-white
          transition-transform duration-300
          lg:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          user={user}
          mobile
          closeSidebar={() => setOpen(false)}
        />
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-50 lg:hidden"
        />
      )}
    </>
  );
}