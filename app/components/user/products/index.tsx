import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import Loading from "../../ui/loading";
import { useCart } from "../../../context/CartContext";
import { useProducts } from "../../../hooks/useProducts";
import type { Product } from "../../../type/product";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";

export default function ProductPage() {
  const {
    categories,
    filteredProducts,
    loading,
    error,
    categoryId,
    setCategoryId,
    keyword,
    setKeyword,
  } = useProducts();
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categoryNameById = useMemo(
    () =>
      categories.reduce<Record<string, string>>((accumulator, category) => {
        accumulator[category.id] = category.name;
        return accumulator;
      }, {}),
    [categories]
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
    <>
      <div className="min-h-full bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
          <div className="mb-7 flex flex-col gap-5">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="mb-2 font-[Georgia,serif] text-2xl font-bold text-slate-900 sm:text-3xl">
                  Khám phá sản phẩm
                </h1>
                <p className="text-slate-500">
                  Tìm kiếm và lựa chọn sản phẩm phù hợp với nhu cầu của bạn
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <div className="relative w-full sm:w-80">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Search size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm mỹ phẩm..."
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    className="w-full bg-white/95 py-2.5 pl-11 pr-4 text-sm shadow-[0_6px_20px_rgba(15,23,42,0.04)] outline-none transition-all duration-300 focus:ring-4 focus:ring-pink-100 sm:py-3 sm:text-base"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                className={`whitespace-nowrap px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  categoryId === "all"
                    ? "bg-pink-600 text-white"
                    : "bg-white/85 text-slate-600 shadow-sm hover:bg-white hover:text-pink-600"
                }`}
                onClick={() => setCategoryId("all")}
              >
                Tất cả
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`whitespace-nowrap px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    categoryId === category.id
                      ? "bg-pink-600 text-white"
                      : "bg-white/85 text-slate-600 shadow-sm hover:bg-white hover:text-pink-600"
                  }`}
                  onClick={() => setCategoryId(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <Loading
              fullScreen={false}
              className="w-full py-16"
              label="Đang tải sản phẩm"
            />
          ) : error ? (
            <div className="bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-slate-50 p-10 text-center text-slate-600">
              Không có sản phẩm phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
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
          )}
        </div>
      </div>
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
    </>
  );
}
