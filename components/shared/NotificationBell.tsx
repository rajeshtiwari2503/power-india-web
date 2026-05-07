 "use client";

import { useState, useEffect, useRef } from "react";

type NotificationType =
  | "renewal"
  | "task_due"
  | "lead_assigned"
  | "payment_due"
  | "cert_update"
  | "system";

type Notification = {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  isRead: boolean;
  link?: string;
};

const TYPE_ICONS: Record<NotificationType, string> = {
  renewal: "🔄",
  task_due: "⏰",
  lead_assigned: "🎯",
  payment_due: "💰",
  cert_update: "📜",
  system: "🔔",
};

const TYPE_BG: Record<NotificationType, string> = {
  renewal: "bg-orange-500/10",
  task_due: "bg-red-600/10",
  lead_assigned: "bg-blue-600/10",
  payment_due: "bg-yellow-600/10",
  cert_update: "bg-green-600/10",
  system: "bg-indigo-600/10",
};

function timeAgo(date: string) {
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications?limit=15");
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    setNotifications((n) =>
      n.map((x) => (x._id === id ? { ...x, isRead: true } : x))
    );
    setUnreadCount((c) => Math.max(0, c - 1));
  };

  const markAllRead = async () => {
    await fetch("/api/notifications/all", { method: "PATCH" });
    setNotifications((n) => n.map((x) => ({ ...x, isRead: true })));
    setUnreadCount(0);
  };

  const deleteNotif = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch(`/api/notifications/${id}`, { method: "DELETE" });
    setNotifications((n) => n.filter((x) => x._id !== id));
  };

  return (
    <div ref={ref} className="relative">
      {/* Bell */}
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) fetchNotifications();
        }}
        className={`relative w-10 h-10 rounded-lg border flex items-center justify-center text-lg transition-all ${
          open ? "bg-blue-50 border-blue-200" : "bg-transparent border-slate-200"
        }`}
      >
        🔔

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[380px] bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-[slideDown_0.15s_ease] z-50">
          {/* Header */}
          <div className="px-4 py-3 flex justify-between items-center bg-gradient-to-r from-[#0f2444] to-blue-700">
            <div>
              <div className="text-white font-bold text-sm">
                Notifications
              </div>
              {unreadCount > 0 && (
                <div className="text-blue-200 text-xs">
                  {unreadCount} unread
                </div>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-semibold text-white bg-white/10 border border-white/20 px-2 py-1 rounded"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[420px] overflow-y-auto">
            {loading && notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-3xl mb-2">🔕</div>
                <div className="text-sm text-slate-400">
                  No notifications yet
                </div>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  onClick={() => {
                    markRead(notif._id);
                    if (notif.link) window.location.href = notif.link;
                  }}
                  className={`flex gap-3 px-4 py-3 border-b border-slate-100 cursor-pointer transition ${
                    notif.isRead ? "bg-white" : "bg-blue-50"
                  } hover:bg-slate-50`}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${TYPE_BG[notif.type]}`}
                  >
                    {TYPE_ICONS[notif.type]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm mb-1 ${
                        notif.isRead ? "font-medium" : "font-bold"
                      }`}
                    >
                      {notif.title}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {notif.message}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {timeAgo(notif.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2">
                    {!notif.isRead && (
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                    <button
                      onClick={(e) => deleteNotif(notif._id, e)}
                      className="text-slate-400 text-sm hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-slate-100 text-center">
              <a
                href="/notifications"
                className="text-blue-600 text-sm font-semibold"
              >
                View all notifications →
              </a>
            </div>
          )}
        </div>
      )}

      {/* animations */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}