import { Link, useLocation } from "react-router";
import { Search, ShoppingBag, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";
import AccountLayout from "../account/AccountLayout";
import { logoutUser } from "../../services/user";

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = useCart();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const TopbarItems = {
    home: { label: "Trang chủ", to: "/glowup" },
    products: { label: "Sản phẩm", to: "/glowup/products" },
    promotion: { label: "Khuyến mãi", to: "/glowup/promotion" },
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    clearCart();
    try {
      await logoutUser();
    } finally {
      setIsAccountOpen(false);
      navigate("/glowup/login", { replace: true });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;

      if (currentScrollY <= 12) {
        setIsTopbarVisible(true);
      } else if (isScrollingDown && currentScrollY > 80) {
        setIsTopbarVisible(false);
      } else {
        setIsTopbarVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="h-20" />
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-rose-200/80 bg-linear-to-r from-rose-50 via-rose-50 to-pink-50 shadow-[0_1px_0_rgba(236,72,153,0.05)] transition-transform duration-300 ease-out ${
          isTopbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
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

            <div className="flex items-center gap-3">
              <Link
                to={TopbarItems.products.to}
                className="inline-flex h-9 w-9 items-center justify-center  text-slate-600 transition-colors hover:border-pink-200 hover:text-pink-600"
              >
                <Search size={20} />
              </Link>

              <button
                onClick={() => setIsAccountOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center text-slate-600 transition-colors hover:border-pink-200 hover:text-pink-600"
                aria-label="Open account"
              >
                <User size={20} />
              </button>

              <Link
                to="/glowup/cart"
                className="relative inline-flex h-9 w-9 items-center justify-center text-slate-600 transition-colors hover:border-pink-200 hover:text-pink-600"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center bg-pink-600 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {isAccountOpen && (
        <AccountLayout
          onClose={() => setIsAccountOpen(false)}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
