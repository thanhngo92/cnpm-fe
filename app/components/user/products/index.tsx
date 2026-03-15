import { ShoppingBag, Star, ChevronDown, Search } from "lucide-react";
import { Link } from "react-router";

export default function ProductPage() {
  const productsPath = "/glowup/products";

  const categories = [
    "Tất cả",
    "Trang điểm",
    "Dưỡng da",
    "Nước hoa",
    "Khuyến mãi",
  ];

  const products = [
    {
      id: 1,
      name: "Son lì cao cấp",
      category: "Trang điểm",
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
      category: "Dưỡng da",
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
      category: "Nước hoa",
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
      category: "Khuyến mãi",
      image: "🧴",
      price: "460.000đ",
      oldPrice: "520.000đ",
      rating: 4.9,
      reviews: 141,
      badge: "Sale",
    },
    {
      id: 5,
      name: "Phấn phủ mịn lì",
      category: "Trang điểm",
      image: "🪞",
      price: "280.000đ",
      oldPrice: null,
      rating: 4.6,
      reviews: 64,
      badge: null,
    },
    {
      id: 6,
      name: "Sữa rửa mặt dịu nhẹ",
      category: "Dưỡng da",
      image: "🫧",
      price: "210.000đ",
      oldPrice: "260.000đ",
      rating: 4.8,
      reviews: 105,
      badge: "Sale",
    },
    {
      id: 7,
      name: "Xịt khoáng cấp ẩm",
      category: "Dưỡng da",
      image: "💦",
      price: "190.000đ",
      oldPrice: null,
      rating: 4.5,
      reviews: 49,
      badge: null,
    },
    {
      id: 8,
      name: "Set quà mỹ phẩm",
      category: "Khuyến mãi",
      image: "🎁",
      price: "699.000đ",
      oldPrice: "850.000đ",
      rating: 4.9,
      reviews: 112,
      badge: "Combo",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header + Search + Filter */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mb-2">
              Khám phá sản phẩm
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Hiển thị {products.length} sản phẩm
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm mỹ phẩm..."
                className="pl-11 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 w-full shadow-sm text-sm sm:text-base bg-white"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <select className="appearance-none pl-4 pr-10 py-2.5 sm:py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white shadow-sm text-sm sm:text-base font-medium text-slate-700 w-full sm:w-auto cursor-pointer">
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={16} className="text-slate-400" />
                </div>
              </div>

              <div className="relative flex-1 sm:flex-none">
                <select className="appearance-none pl-4 pr-10 py-2.5 sm:py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white shadow-sm text-sm sm:text-base font-medium text-slate-700 w-full sm:w-auto cursor-pointer">
                  <option value="">Mức giá</option>
                  <option value="under300">Dưới 300.000đ</option>
                  <option value="300to700">300.000đ - 700.000đ</option>
                  <option value="over700">Trên 700.000đ</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={16} className="text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "Tất cả"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-pink-300 hover:text-pink-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
          >
            <Link
              to={productsPath}
              className="relative aspect-square bg-slate-50 rounded-xl mb-3 sm:mb-4 flex items-center justify-center text-5xl sm:text-6xl overflow-hidden shrink-0"
            >
              {product.badge && (
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-slate-900 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full z-10">
                  {product.badge}
                </span>
              )}
              <div className="group-hover:scale-110 transition-transform duration-500">
                {product.image}
              </div>
            </Link>

            <div className="flex flex-col flex-1">
              <p className="text-[10px] sm:text-xs font-medium text-pink-500 uppercase tracking-wider mb-1 line-clamp-1">
                {product.category}
              </p>

              <Link to={productsPath}>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1 sm:mb-2 line-clamp-2 hover:text-pink-600 cursor-pointer transition-colors flex-1">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-1 mb-2 sm:mb-3">
                <Star
                  size={12}
                  className="fill-amber-400 text-amber-400 sm:w-3.5 sm:h-3.5"
                />
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  {product.rating}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400">
                  ({product.reviews})
                </span>
              </div>

              <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-100 flex flex-col gap-2 sm:gap-3">
                <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                  <span className="font-bold text-base sm:text-lg text-slate-900">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                <button className="w-full bg-slate-900 text-white font-medium py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-pink-600 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <ShoppingBag size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden sm:inline">Thêm vào giỏ</span>
                  <span className="sm:hidden">Thêm</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
