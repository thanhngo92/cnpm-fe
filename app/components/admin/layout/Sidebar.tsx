import { NavLink } from "react-router";
import { Folder, LogOut, Package, ShoppingCart, Users } from "lucide-react";

const sidebarItems = [
  { path: "/glowup/admin", icon: Folder, label: "Danh mục" },
  { path: "/glowup/admin/products", icon: Package, label: "Sản phẩm" },
  { path: "/glowup/admin/users", icon: Users, label: "Người dùng" },
  { path: "/glowup/admin/orders", icon: ShoppingCart, label: "Đơn hàng" },
];

const itemBaseClass =
  "group flex items-center gap-3 px-3 py-2.5 font-semibold tracking-tight transition-all duration-200 ease-out motion-reduce:transition-none";

export default function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white text-slate-600 shadow-sm">
      <div className="flex h-16 items-center border-slate-200 px-6">
        <div className="flex h-10 w-full items-center">
          <img
            src="/GlowUp.png"
            alt="GlowUp logo"
            className="h-full w-full object-contain object-left"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/glowup/admin"}
            className={({ isActive }) =>
              `${itemBaseClass} ${
                isActive
                  ? "bg-pink-500 text-white shadow-sm"
                  : "text-slate-600 hover:bg-pink-50 hover:text-pink-700"
              }`
            }
          >
            <item.icon size={19} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 px-3 py-2.5 font-semibold tracking-tight text-slate-500 transition-all duration-200 ease-out hover:bg-pink-50 hover:text-pink-700 motion-reduce:transition-none"
        >
          <LogOut size={19} className="shrink-0" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
