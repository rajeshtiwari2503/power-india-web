"use client";
import { useState, useEffect, useRef } from "react";

const TYPE_ICONS = {
  renewal: "🔄",
  task_due: "⏰",
  lead_assigned: "🎯",
  payment_due: "💰",
  cert_update: "📜",
  system: "🔔",
};

const TYPE_COLORS = {
  renewal: "#f97316",
  task_due: "#dc2626",
  lead_assigned: "#2563eb",
  payment_due: "#ca8a04",
  cert_update: "#16a34a",
  system: "#6366f1",
};

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications?limit=15");
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markRead = async (id) => {
    await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    setNotifications(n => n.map(x => x._id === id ? { ...x, isRead: true } : x));
    setUnreadCount(c => Math.max(0, c - 1));
  };

  const markAllRead = async () => {
    await fetch("/api/notifications/all", { method: "PATCH" });
    setNotifications(n => n.map(x => ({ ...x, isRead: true })));
    setUnreadCount(0);
  };

  const deleteNotif = async (id, e) => {
    e.stopPropagation();
    await fetch(`/api/notifications/${id}`, { method: "DELETE" });
    setNotifications(n => n.filter(x => x._id !== id));
    const wasUnread = notifications.find(x => x._id === id && !x.isRead);
    if (wasUnread) setUnreadCount(c => Math.max(0, c - 1));
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Bell Button */}
      <button
        onClick={() => { setOpen(!open); if (!open) fetchNotifications(); }}
        style={{
          position: "relative",
          width: 40, height: 40,
          borderRadius: 10,
          background: open ? "#eff6ff" : "transparent",
          border: "1px solid",
          borderColor: open ? "#bfdbfe" : "#e2e8f0",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
          transition: "all 0.2s",
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: "absolute",
            top: -4, right: -4,
            background: "#dc2626",
            color: "white",
            fontSize: 10,
            fontWeight: 800,
            minWidth: 18, height: 18,
            borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 4px",
            border: "2px solid white",
            animation: unreadCount > 0 ? "pulse 2s infinite" : "none",
          }}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          width: 380,
          background: "white",
          borderRadius: 14,
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          zIndex: 200,
          overflow: "hidden",
          animation: "slideDown 0.15s ease",
        }}>
          {/* Header */}
          <div style={{
            padding: "14px 18px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "linear-gradient(135deg, #0f2444, #1e40af)",
          }}>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>Notifications</div>
              {unreadCount > 0 && (
                <div style={{ color: "#93c5fd", fontSize: 12 }}>{unreadCount} unread</div>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white", fontSize: 12, fontWeight: 600,
                  padding: "4px 10px", borderRadius: 6, cursor: "pointer",
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: 420, overflowY: "auto" }}>
            {loading && notifications.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "#94a3b8" }}>Loading...</div>
            ) : notifications.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🔕</div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>No notifications yet</div>
              </div>
            ) : notifications.map((notif) => (
              <div
                key={notif._id}
                onClick={() => { markRead(notif._id); if (notif.link) window.location.href = notif.link; }}
                style={{
                  padding: "12px 18px",
                  borderBottom: "1px solid #f8fafc",
                  display: "flex", gap: 12,
                  background: notif.isRead ? "white" : "#f0f7ff",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  position: "relative",
                }}
                onMouseEnter={e => e.currentTarget.style.background = notif.isRead ? "#f8fafc" : "#e0f0ff"}
                onMouseLeave={e => e.currentTarget.style.background = notif.isRead ? "white" : "#f0f7ff"}
              >
                {/* Icon */}
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: TYPE_COLORS[notif.type] + "18",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                }}>
                  {TYPE_ICONS[notif.type]}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13, fontWeight: notif.isRead ? 500 : 700,
                    color: "#0f172a", lineHeight: 1.3, marginBottom: 2,
                  }}>{notif.title}</div>
                  <div style={{
                    fontSize: 12, color: "#64748b",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{notif.message}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                    {timeAgo(notif.createdAt)}
                  </div>
                </div>

                {/* Unread dot + delete */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                  {!notif.isRead && (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563eb" }} />
                  )}
                  <button
                    onClick={(e) => deleteNotif(notif._id, e)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "#94a3b8", fontSize: 14, lineHeight: 1,
                      padding: 2, borderRadius: 4,
                    }}
                    title="Delete"
                  >✕</button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: "10px 18px", borderTop: "1px solid #f1f5f9",
              textAlign: "center",
            }}>
              <a href="/notifications" style={{ color: "#2563eb", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                View all notifications →
              </a>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}