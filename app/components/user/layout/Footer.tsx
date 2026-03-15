import { Link, useLocation } from "react-router";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const { pathname } = useLocation();
  const isCheckoutRoute = pathname.startsWith("/glowup/checkout");

  return (
    <footer
      className={`bg-[#0B1A33] text-slate-300 ${
        isCheckoutRoute ? "mt-0" : "mt-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-pink-500" size={22} />
            <span className="text-white font-semibold text-lg">
              Glow<span className="text-pink-500">Up</span>
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            Đánh thức vẻ đẹp tự nhiên của bạn với các sản phẩm mỹ phẩm chính
            hãng, chất lượng cao.
          </p>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-white font-semibold mb-4">Danh mục</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/glowup/products" className="hover:text-white">
                Trang điểm
              </Link>
            </li>

            <li>
              <Link to="/glowup/products" className="hover:text-white">
                Chăm sóc da
              </Link>
            </li>

            <li>
              <Link to="/glowup/products" className="hover:text-white">
                Nước hoa
              </Link>
            </li>

            <li>
              <Link to="/glowup/promotion" className="hover:text-white">
                Khuyến mãi
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Hỗ trợ</h4>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              Chính sách đổi trả
            </li>

            <li className="hover:text-white cursor-pointer">
              Hướng dẫn mua hàng
            </li>

            <li className="hover:text-white cursor-pointer">
              Theo dõi đơn hàng
            </li>

            <li className="hover:text-white cursor-pointer">Liên hệ</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Đăng ký nhận tin</h4>

          <p className="text-sm text-slate-400 mb-4">
            Nhận ngay voucher 50K cho đơn hàng đầu tiên.
          </p>

          <div className="flex gap-2">
            <input
              placeholder="Email của bạn"
              className="flex-1 px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-sm outline-none"
            />

            <button className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md text-white text-sm">
              Gửi
            </button>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-slate-700 text-center text-sm text-slate-400 py-6">
        © 2026 GlowUp Cosmetics. All rights reserved. • Made with by Trung Thanh
        Long
      </div>
    </footer>
  );
}
