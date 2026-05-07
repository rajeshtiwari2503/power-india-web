 // app/(portal)/layout.tsx

import { ReactNode } from "react";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {children}
    </div>
  );
}