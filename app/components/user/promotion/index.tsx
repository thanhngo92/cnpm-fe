import { Gift, Ticket, Star, ChevronRight, Truck } from "lucide-react";
import { Link } from "react-router";

export default function PromotionPage() {
  const productsPath = "/glowup/products";

  const vouchers = [
    {
      title: "Giảm 50K",
      desc: "Cho đơn từ 500K",
      exp: "Hết hạn: 30/03/2026",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      icon: <Ticket size={24} />,
    },
    {
      title: "Freeship",
      desc: "Tối đa 30K",
      exp: "Hết hạn: 15/03/2026",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      icon: <Truck size={24} />,
    },
    {
      title: "Giảm 10%",
      desc: "Tối đa 100K",
      exp: "Hết hạn: 10/04/2026",
      color: "bg-pink-50 text-pink-600 border-pink-200",
      icon: <Gift size={24} />,
    },
  ];

  const promoProducts = [
    {
      id: 1,
      name: "Set son dưỡng cao cấp",
      image: "💄",
      price: "299.000đ",
      oldPrice: "399.000đ",
      badge: "-25%",
    },
    {
      id: 2,
      name: "Combo dưỡng da mini",
      image: "✨",
      price: "499.000đ",
      oldPrice: "649.000đ",
      badge: "-23%",
    },
    {
      id: 3,
      name: "Nước hoa mini set",
      image: "🌸",
      price: "699.000đ",
      oldPrice: "850.000đ",
      badge: "-18%",
    },
    {
      id: 4,
      name: "Kem dưỡng phục hồi",
      image: "🧴",
      price: "459.000đ",
      oldPrice: "520.000đ",
      badge: "-12%",
    },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif">
            Khuyến mãi nổi bật
          </h1>
          <p className="text-slate-500 mt-2">
            Ưu đãi mới nhất dành cho khách hàng của cửa hàng
          </p>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              <p className="text-yellow-400 font-medium tracking-wider uppercase text-sm">
                Ưu đãi tháng này
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">
              Giảm đến 50% cho bộ sưu tập chăm sóc da
            </h2>

            <p className="text-slate-300 max-w-2xl mb-6">
              Áp dụng cho nhiều sản phẩm bán chạy. Kết hợp voucher để nhận thêm
              ưu đãi hấp dẫn.
            </p>

            <Link
              to={productsPath}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
            >
              Mua ngay <ChevronRight size={18} />
            </Link>
          </div>

          <div className="w-full sm:w-auto flex flex-col items-end gap-4">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-2 rounded-full text-sm font-bold text-slate-900 shadow-lg">
              Flash Sale
            </div>
            <div className="text-right mt-auto">
              <p className="text-sm text-slate-400 mb-2">
                Số lượng ưu đãi có hạn
              </p>
              <div className="w-full sm:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 w-[75%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl"></div>
      </div>

      {/* Vouchers */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 font-serif">
            Voucher nổi bật
          </h3>
          <Link
            to={productsPath}
            className="text-pink-600 hover:text-pink-700 font-medium text-sm flex items-center gap-1 group"
          >
            Xem sản phẩm{" "}
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouchers.map((voucher, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-pink-100 p-6 flex flex-col gap-6 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-r border-slate-100"></div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-l border-slate-100"></div>

              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${voucher.color}`}
                >
                  {voucher.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1 text-slate-900">
                    {voucher.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {voucher.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-slate-200 flex items-center justify-between mt-auto">
                <p className="text-xs font-medium text-slate-400">
                  {voucher.exp}
                </p>
                <button className="px-5 py-2 text-sm font-medium rounded-xl bg-slate-900 text-white hover:bg-pink-600 shadow-md transition-colors">
                  Lưu mã
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Products */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 font-serif mb-6">
          Sản phẩm đang giảm giá
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {promoProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="relative aspect-square bg-slate-50 rounded-xl mb-3 sm:mb-4 flex items-center justify-center text-5xl sm:text-6xl overflow-hidden shrink-0">
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-pink-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full z-10">
                  {product.badge}
                </span>
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {product.image}
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 line-clamp-2 hover:text-pink-600 transition-colors flex-1">
                  {product.name}
                </h4>

                <div className="mt-auto pt-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-base sm:text-lg text-slate-900">
                      {product.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {product.oldPrice}
                    </span>
                  </div>

                  <button className="mt-3 w-full bg-slate-900 text-white font-medium py-2.5 rounded-xl hover:bg-pink-600 transition-colors">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
