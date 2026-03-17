import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../../context/CartContext";
import { categoryData } from "../../../data/category";
import { homeCategoryHighlights } from "../../../data/home";
import { productData } from "../../../data/product";
import type { Product } from "../../../type/product";
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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-pink-50 to-rose-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left z-10">
            <span className="inline-block bg-pink-200 px-3 py-1 text-sm font-semibold text-pink-700 mb-6">
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
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 font-medium text-lg transition-colors flex items-center justify-center gap-2"
              >
                Mua sắm ngay <ArrowRight size={20} />
              </Link>

              <Link
                to={promotionPath}
                className="bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 font-medium text-lg transition-colors flex items-center justify-center"
              >
                Xem khuyến mãi
              </Link>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-pink-300 blur-xl opacity-70"></div>
              <div className="absolute inset-0 bg-rose-300 blur-xl opacity-70 translate-x-10"></div>
              <div className="absolute inset-0 bg-purple-300 blur-xl opacity-70 translate-y-10"></div>

              <div className="absolute inset-4 bg-white shadow-2xl flex items-center justify-center text-8xl z-10">
                ✨
              </div>

              <div className="absolute -top-6 -left-6 w-24 h-24 bg-white shadow-xl flex items-center justify-center text-4xl z-20 rotate-12">
                💄
              </div>
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white shadow-xl flex items-center justify-center text-5xl z-20 -rotate-12">
                🧴
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-serif">
              Khám phá danh mục
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Lựa chọn những sản phẩm phù hợp nhất để chăm sóc và tôn vinh vẻ
              đẹp của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeCategoryHighlights.map((cat) => (
              <Link
                key={cat.id}
                to={cat.link}
                className="group relative overflow-hidden aspect-4/5 flex flex-col justify-end"
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
  );
}
