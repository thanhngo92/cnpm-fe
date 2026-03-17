import { User, ReceiptText, History, LogOut } from "lucide-react";
import type { TypeUser } from "../../../type/auth";

export type Tab = "profile" | "my-orders" | "history";

interface SidebarProps {
  user: TypeUser | null;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onLogout: () => void;
}

const menuItems: {
  category: string;
  items: {
    id: Tab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}[] = [
  {
    category: "Tài khoản",
    items: [
      { id: "profile", label: "Hồ sơ", icon: User },
      { id: "my-orders", label: "Đơn hàng", icon: ReceiptText },
      { id: "history", label: "Lịch sử", icon: History },
    ],
  },
];

export default function Sidebar({
  user,
  activeTab,
  setActiveTab,
  onLogout,
}: SidebarProps) {
  const displayName = user?.fullName || "Người dùng";
  const email = user?.email || "";
  const avatarFallback = displayName.slice(0, 1).toUpperCase();

  return (
    <aside className="flex h-full w-64 flex-col bg-white/92">
      {/* User Info Header */}
      <div className="p-5 pb-4">
        <div className="mb-1 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-white text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
            <span className="text-xs font-semibold tracking-wide">
              {avatarFallback}
            </span>
          </div>
          <div className="overflow-hidden">
            <h3 className="font-semibold text-slate-900 text-sm truncate">
              {displayName}
            </h3>
            <p className="text-xs text-slate-500 truncate">{email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-5 overflow-y-auto px-3 py-2">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            <h4 className="px-3 text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              {section.category}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-pink-50 text-pink-700"
                        : "text-slate-600 hover:bg-white hover:text-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-white/90"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
