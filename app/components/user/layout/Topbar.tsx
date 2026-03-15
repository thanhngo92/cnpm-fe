import { Link, useLocation } from "react-router";
import { Search, ShoppingBag, User } from "lucide-react";

import { useCart } from "../../../context/CartContext";

export default function Topbar() {
  const location = useLocation();
  const { items } = useCart();

  const TopbarItems = {
    home: { label: "Trang chủ", to: "/glowup" },
    products: { label: "Sản phẩm", to: "/glowup/products" },
    promotion: { label: "Khuyến mãi", to: "/glowup/promotion" },
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            to={TopbarItems.home.to}
            className="flex shrink-0 items-center"
            aria-label="GlowUp home"
          >
            <img
              src="/GlowUp.png"
              alt="GlowUp"
              className="-ml-5 h-14 w-auto object-contain"
              draggable={false}
            />
          </Link>

          <nav className="flex items-center gap-8">
            {Object.values(TopbarItems).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  location.pathname === item.to
                    ? "text-sm font-medium text-pink-600 transition-colors"
                    : "text-sm font-medium text-slate-600 transition-colors hover:text-pink-600"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to={TopbarItems.products.to}
              className="p-2 text-slate-600 transition-colors hover:text-pink-600"
            >
              <Search size={20} />
            </Link>

            <Link
              to="/glowup/login"
              className="p-2 text-slate-600 transition-colors hover:text-pink-600"
            >
              <User size={20} />
            </Link>

            <Link
              to="/glowup/cart"
              className="relative p-2 text-slate-600 transition-colors hover:text-pink-600"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
