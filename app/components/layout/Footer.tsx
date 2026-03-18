import { Link } from "react-router";
import { Sparkles, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-0 bg-linear-to-br from-slate-50 via-rose-50 to-pink-50 text-slate-600">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 grid md:grid-cols-3 gap-6 md:gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-pink-600" size={22} />
            <span className="text-slate-800 font-semibold text-lg">
              Glow<span className="text-pink-600">Up</span>
            </span>
          </div>

          <p className="text-sm leading-6 text-slate-600 mb-3">
            Nền tảng mua sắm mỹ phẩm chính hãng, an toàn và tiện lợi.
          </p>

          <div className="space-y-1.5 text-sm text-slate-600">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-pink-600" />
              <span>12 Nguyễn Văn Bảo, Gò Vấp, TP. Hồ Chí Minh</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} className="text-pink-600" />
              <span>1900 1234</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-pink-600" />
              <span>support@glowup.vn</span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-slate-800 font-semibold mb-3">Liên kết nhanh</h4>

          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <Link
                to="/glowup"
                className="hover:text-pink-700 transition-colors"
              >
                Trang chủ
              </Link>
            </li>

            <li>
              <Link
                to="/glowup/products"
                className="hover:text-pink-700 transition-colors"
              >
                Sản phẩm
              </Link>
            </li>

            <li>
              <Link
                to="/glowup/promotion"
                className="hover:text-pink-700 transition-colors"
              >
                Khuyến mãi
              </Link>
            </li>

            <li>
              <Link
                to="/glowup/cart"
                className="hover:text-pink-700 transition-colors"
              >
                Giỏ hàng
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies / support */}
        <div>
          <h4 className="text-slate-800 font-semibold mb-3">
            Hỗ trợ khách hàng
          </h4>

          <ul className="space-y-2 text-sm text-slate-600">
            <li className="hover:text-pink-700 transition-colors cursor-pointer">
              Chính sách đổi trả
            </li>

            <li className="hover:text-pink-700 transition-colors cursor-pointer">
              Chính sách bảo mật
            </li>

            <li className="hover:text-pink-700 transition-colors cursor-pointer">
              Điều khoản sử dụng
            </li>

            <li className="hover:text-pink-700 transition-colors cursor-pointer">
              Hướng dẫn mua hàng
            </li>
          </ul>
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-slate-200 py-4 px-6 text-center text-sm text-slate-500">
        © 2026 GlowUp Cosmetics. All rights reserved. • Made with by Trung Thanh
        Long
      </div>
    </footer>
  );
}
