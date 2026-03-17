import { Link, useLocation } from "react-router";
import { Sparkles, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { pathname } = useLocation();
  const isCheckoutRoute = pathname.startsWith("/glowup/checkout");

  return (
    <footer
      className={`bg-[#0B1A33] text-slate-300 ${
        isCheckoutRoute ? "mt-0" : "mt-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 grid md:grid-cols-3 gap-6 md:gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-pink-500" size={22} />
            <span className="text-white font-semibold text-lg">
              Glow<span className="text-pink-500">Up</span>
            </span>
          </div>

          <p className="text-sm leading-6 text-slate-400 mb-3">
            Nền tảng mua sắm mỹ phẩm chính hãng, an toàn và tiện lợi.
          </p>

          <div className="space-y-1.5 text-sm text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-pink-500" />
              <span>12 Nguyễn Văn Bảo, Gò Vấp, TP. Hồ Chí Minh</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} className="text-pink-500" />
              <span>1900 1234</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-pink-500" />
              <span>support@glowup.vn</span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Liên kết nhanh</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/glowup" className="hover:text-white transition-colors">
                Trang chủ
              </Link>
            </li>

            <li>
              <Link
                to="/glowup/products"
                className="hover:text-white transition-colors"
              >
                Sản phẩm
              </Link>
            </li>

            <li>
              <Link
                to="/glowup/promotion"
                className="hover:text-white transition-colors"
              >
                Khuyến mãi
              </Link>
            </li>

            <li>
              <Link
                to="/glowup/cart"
                className="hover:text-white transition-colors"
              >
                Giỏ hàng
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies / support */}
        <div>
          <h4 className="text-white font-semibold mb-3">Hỗ trợ khách hàng</h4>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">
              Chính sách đổi trả
            </li>

            <li className="hover:text-white transition-colors cursor-pointer">
              Chính sách bảo mật
            </li>

            <li className="hover:text-white transition-colors cursor-pointer">
              Điều khoản sử dụng
            </li>

            <li className="hover:text-white transition-colors cursor-pointer">
              Hướng dẫn mua hàng
            </li>
          </ul>
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-slate-700 text-center text-sm text-slate-400 py-4 px-6">
        © 2026 GlowUp Cosmetics. All rights reserved. • Made with by Trung Thanh
        Long
      </div>
    </footer>
  );
}
