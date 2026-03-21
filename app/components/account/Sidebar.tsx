import { User, ReceiptText, LogOut } from "lucide-react";
import type { User as UserType } from "../../type/user";

export type Tab = "profile" | "my-orders" | "history";

interface SidebarProps {
  user: UserType | null;
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
    <aside className="flex h-full w-64 flex-col border-r border-rose-100 bg-linear-to-b from-rose-50/40 to-white px-2 py-2">
      {/* User Info Header */}
      <div className="px-2 pb-3">
        <div className="mb-1 flex items-center gap-3 px-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-rose-100 bg-white text-slate-500">
            <span className="text-xs font-semibold tracking-wide">
              {avatarFallback}
            </span>
          </div>
          <div className="overflow-hidden">
            <h3 className="truncate text-sm font-semibold text-slate-800">
              {displayName}
            </h3>
            <p className="truncate text-xs text-slate-600">{email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-5 overflow-y-auto px-2 py-2">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            <h4 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {section.category}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex h-10 w-full items-center gap-3 px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "border border-pink-200 bg-pink-50 text-pink-600"
                        : "text-slate-600 hover:bg-rose-50 hover:text-slate-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-rose-100 p-2">
        <button
          onClick={onLogout}
          className="flex h-10 w-full items-center gap-3 px-3 text-sm font-medium text-rose-500 transition-colors hover:bg-rose-50"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
