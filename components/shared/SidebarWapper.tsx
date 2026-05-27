//  "use client";

// import { useState } from "react";
// import Sidebar from "./Sidebar";

// const COLLAPSED_W = 64;
// const EXPANDED_W = 240;

// export default function SidebarWrapper({
//   user,
//   children,
// }: {
//   user: any;
//   children: React.ReactNode;
// }) {
//   const [expanded, setExpanded] = useState<boolean>(false);

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar user={user} expanded={expanded} onExpand={setExpanded} />

//       {/* Main Content */}
//       <div
//         className="flex flex-col min-h-screen min-w-0 transition-all duration-300 ease-in-out"
//         style={{
//           marginLeft: expanded ? EXPANDED_W : COLLAPSED_W,
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

const COLLAPSED_W = 64;
const EXPANDED_W = 240;

interface SidebarWrapperProps {
  user?: any;
  children?: React.ReactNode;
}

export default function SidebarWrapper({
  user,
  children,
}: SidebarWrapperProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        user={user}
        expanded={expanded}
        onExpand={setExpanded}
      />

      {/* Main Content */}
      <div
        className="flex flex-col min-h-screen min-w-0 transition-all duration-300 ease-in-out flex-1"
        style={{
          marginLeft: expanded
            ? EXPANDED_W
            : COLLAPSED_W,
        }}
      >
        {children}
      </div>
    </div>
  );
}