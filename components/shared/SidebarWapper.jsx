"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

const COLLAPSED_W = 64;
const EXPANDED_W  = 240;

export default function SidebarWrapper({ user, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        user={user}
        expanded={expanded}
        onExpand={setExpanded}
      />
      {/* Main content — moves with sidebar */}
      <div style={{
        marginLeft: expanded ? EXPANDED_W : COLLAPSED_W,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)",
        minWidth: 0,
      }}>
        {children}
      </div>
    </div>
  );
}