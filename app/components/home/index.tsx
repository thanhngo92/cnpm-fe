import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { categoryData } from "../../data/category";
import { homeCategoryHighlights } from "../../data/home";
import { productData } from "../../data/product";
import type { Product } from "../../type/product";
import ProductCard from "../products/ProductCard";
import ProductDetailModal from "../products/ProductDetailModal";

export default function HomePage() {
  const productsPath = "/glowup/products";
  const promotionPath = "/glowup/promotion";
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const trendingProducts = productData.slice(0, 4);
  const categoryNameById = useMemo(
    () =>
      categoryData.reduce<Record<string, string>>((accumulator, category) => {
        accumulator[category.id] = category.name;
        return accumulator;
      }, {}),
    []
  );

  const selectedCategoryName = selectedProduct
    ? categoryNameById[selectedProduct.categoryId] || "Danh mục khác"
    : "";

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      return;
    }

    addItem(
      {
        id: product.id,
        name: product.name,
        price: Math.round(product.price),
        image: product.imageUrl,
      },
      1
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-rose-100/55 via-rose-50/40 to-pink-100/35">
      {/* Soft radial glow effects */}
      <div className="absolute -top-40 right-0 h-80 w-80 bg-rose-200/35 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-72 w-72 bg-pink-200/25 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 h-96 w-96 bg-rose-50/50 blur-3xl" />

      <div className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <section className="overflow-hidden border-b border-rose-100/70 bg-rose-50/35">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:px-8 lg:py-20">
            <div className="text-center lg:text-left">
              <span className="inline-block border border-pink-200 bg-pink-50 px-3 py-1 text-sm font-semibold text-pink-700">
                Bộ sưu tập Mùa Hè 2026
              </span>

              <h1 className="mt-6 text-4xl leading-tight font-bold text-slate-800 md:text-5xl lg:text-6xl font-serif">
                Tỏa sáng rạng rỡ <br />
                <span className="text-pink-600">mỗi ngày</span>
              </h1>

              <p className="mx-auto mt-6 mb-8 max-w-xl text-lg text-slate-500 lg:mx-0">
                Khám phá các dòng sản phẩm chăm sóc da và trang điểm cao cấp
                giúp bạn tự tin thể hiện vẻ đẹp riêng biệt của mình.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  to={productsPath}
                  className="flex items-center justify-center gap-2 bg-pink-600 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-pink-700"
                >
                  Mua sắm ngay <ArrowRight size={20} />
                </Link>

                <Link
                  to={promotionPath}
                  className="flex items-center justify-center border border-slate-200 bg-white px-8 py-4 text-lg font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Xem khuyến mãi
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-136">
              <div className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 bg-pink-100/60 blur-3xl" />
              <div className="absolute -right-8 top-6 h-36 w-36 bg-rose-100/70 blur-3xl" />

              <div className="relative border border-slate-200 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80"
                  alt="GlowUp premium collection"
                  className="h-80 w-full object-cover"
                  loading="lazy"
                />

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Best Seller
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      Matte Liquid Lip
                    </p>
                  </div>
                  <div className="border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      New Arrival
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      Glow Cushion SPF50+
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-rose-50/25 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl font-serif">
                Khám phá danh mục
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Lựa chọn những sản phẩm phù hợp nhất để chăm sóc và tôn vinh vẻ
                đẹp của bạn
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {homeCategoryHighlights.map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.link}
                  className="group relative aspect-4/5 overflow-hidden border border-slate-200 bg-white shadow-[0_6px_14px_rgba(15,23,42,0.05)]"
                >
                  <div className="absolute inset-0">
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  </div>

                  <div className="relative z-10 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-3xl font-serif font-bold mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {cat.description}
                    </p>
                    <div className="inline-flex items-center gap-2 font-medium text-sm tracking-wider uppercase pb-1 transition-colors">
                      Khám phá <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="border-t border-rose-100/70 bg-rose-50/35 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-slate-800 font-serif">
                  Sản phẩm thịnh hành
                </h2>
                <p className="text-slate-600">
                  Những sản phẩm được yêu thích nhất tuần qua
                </p>
              </div>

              <Link
                to={productsPath}
                className="hidden items-center gap-1 font-medium text-pink-600 hover:text-pink-700 sm:flex"
              >
                Xem tất cả <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={
                    categoryNameById[product.categoryId] || "Danh mục khác"
                  }
                  onViewDetail={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>

        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            categoryName={selectedCategoryName}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={() => {
              handleAddToCart(selectedProduct);
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
