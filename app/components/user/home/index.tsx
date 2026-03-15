import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router";

export default function HomePage() {
  const productsPath = "/glowup/products";
  const promotionPath = "/glowup/promotion";

  const categories = [
    {
      name: "Trang điểm",
      icon: "💄",
      color: "bg-rose-100 text-rose-600",
      link: productsPath,
    },
    {
      name: "Dưỡng da",
      icon: "✨",
      color: "bg-blue-100 text-blue-600",
      link: productsPath,
    },
    {
      name: "Nước hoa",
      icon: "🌸",
      color: "bg-purple-100 text-purple-600",
      link: productsPath,
    },
    {
      name: "Khuyến mãi",
      icon: "🎁",
      color: "bg-amber-100 text-amber-600",
      link: promotionPath,
    },
    {
      name: "Làm sạch",
      icon: "💧",
      color: "bg-emerald-100 text-emerald-600",
      link: productsPath,
    },
    {
      name: "Phụ kiện",
      icon: "🎀",
      color: "bg-pink-100 text-pink-600",
      link: productsPath,
    },
  ];

  const trendingProducts = [
    {
      id: 1,
      name: "Son lì cao cấp",
      image: "💄",
      price: "320.000đ",
      oldPrice: "390.000đ",
      rating: 4.9,
      reviews: 128,
      badge: "Hot",
    },
    {
      id: 2,
      name: "Serum dưỡng sáng da",
      image: "✨",
      price: "540.000đ",
      oldPrice: "620.000đ",
      rating: 4.8,
      reviews: 96,
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Nước hoa nữ thanh lịch",
      image: "🌸",
      price: "890.000đ",
      oldPrice: null,
      rating: 4.7,
      reviews: 73,
      badge: "New",
    },
    {
      id: 4,
      name: "Kem dưỡng phục hồi",
      image: "🧴",
      price: "460.000đ",
      oldPrice: "520.000đ",
      rating: 4.9,
      reviews: 141,
      badge: "Sale",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-rose-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-pink-200 text-pink-700 text-sm font-semibold mb-6">
              Bộ sưu tập Mùa Hè 2026
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 font-serif">
              Tỏa sáng rạng rỡ <br />
              <span className="text-pink-600">mỗi ngày</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Khám phá các dòng sản phẩm chăm sóc da và trang điểm cao cấp giúp
              bạn tự tin thể hiện vẻ đẹp riêng biệt của mình.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to={productsPath}
                className="bg-slate-900 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors flex items-center justify-center gap-2"
              >
                Mua sắm ngay <ArrowRight size={20} />
              </Link>

              <Link
                to={promotionPath}
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-medium text-lg transition-colors flex items-center justify-center"
              >
                Xem khuyến mãi
              </Link>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-pink-300 rounded-full blur-xl opacity-70"></div>
              <div className="absolute inset-0 bg-rose-300 rounded-full blur-xl opacity-70 translate-x-10"></div>
              <div className="absolute inset-0 bg-purple-300 rounded-full blur-xl opacity-70 translate-y-10"></div>

              <div className="absolute inset-4 bg-white rounded-full shadow-2xl flex items-center justify-center text-8xl z-10 border-8 border-white">
                ✨
              </div>

              <div className="absolute -top-6 -left-6 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl z-20 rotate-12">
                💄
              </div>
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white rounded-full shadow-xl flex items-center justify-center text-5xl z-20 -rotate-12">
                🧴
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">
              Khám phá danh mục
            </h2>
            <p className="text-slate-500">
              Tìm kiếm sản phẩm phù hợp với nhu cầu của bạn
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.link}
                className="flex flex-col items-center group"
              >
                <div
                  className={`w-24 h-24 rounded-full ${cat.color} flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                >
                  {cat.icon}
                </div>
                <span className="font-medium text-slate-900 group-hover:text-pink-600 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">
                Sản phẩm thịnh hành
              </h2>
              <p className="text-slate-500">
                Những sản phẩm được yêu thích nhất tuần qua
              </p>
            </div>

            <Link
              to={productsPath}
              className="hidden sm:flex items-center gap-1 text-pink-600 font-medium hover:text-pink-700"
            >
              Xem tất cả <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow group border border-slate-100 flex flex-col h-full"
              >
                <div className="relative h-64 bg-slate-50 rounded-xl mb-4 flex items-center justify-center text-6xl overflow-hidden shrink-0">
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      {product.badge}
                    </span>
                  )}
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {product.image}
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-slate-700">
                      {product.rating}
                    </span>
                    <span className="text-sm text-slate-400">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 hover:text-pink-600 transition-colors flex-1">
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">
                        {product.price}
                      </p>
                      {product.oldPrice && (
                        <p className="text-sm text-slate-400 line-through">
                          {product.oldPrice}
                        </p>
                      )}
                    </div>

                    <button className="bg-slate-900 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
