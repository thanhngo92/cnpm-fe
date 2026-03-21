import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";

import Loading from "../ui/loading";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../type/product";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";

type ProductPageProps = {
  slug?: string;
};

export default function ProductPage({ slug }: ProductPageProps) {
  const navigate = useNavigate();

  const {
    categories,
    filteredProducts,
    loading,
    error,
    categoryId,
    setCategoryId,
    keyword,
    setKeyword,
  } = useProducts(slug);

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

  const handleCategoryClick = (nextCategoryId: string) => {
    if (nextCategoryId === "all") {
      setCategoryId("all");
      navigate("/glowup/products");
      return;
    }

    const selectedCategory = categories.find(
      (category) => category.id === nextCategoryId
    );

    if (!selectedCategory) {
      return;
    }

    setCategoryId(selectedCategory.id);
    navigate(`/glowup/products/${selectedCategory.slug}`);
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-rose-100/55 via-rose-50/40 to-pink-100/35">
        <div className="absolute -top-40 right-0 h-80 w-80 bg-rose-200/35 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-72 w-72 bg-pink-200/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-96 w-96 bg-rose-50/50 blur-3xl" />

        <div className="relative z-10 min-h-full">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
            <div className="mb-7 flex flex-col gap-5 border border-rose-100/70 bg-rose-50/35 p-5 sm:p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h1 className="mb-2 font-[Georgia,serif] text-2xl font-bold text-slate-800 sm:text-3xl">
                    Khám phá sản phẩm
                  </h1>
                  <p className="text-slate-600">
                    Tìm kiếm và lựa chọn sản phẩm phù hợp với nhu cầu của bạn
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                  <div className="relative w-full sm:w-80">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm mỹ phẩm..."
                      value={keyword}
                      onChange={(event) => setKeyword(event.target.value)}
                      className="h-11 w-full border border-rose-100 bg-white pl-10 pr-4 text-sm text-slate-600 outline-none transition-colors placeholder:text-slate-500 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/40"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  className={`h-9 border px-4 text-xs font-semibold transition-all duration-300 ${
                    categoryId === "all"
                      ? "border-pink-600 bg-pink-600 text-white shadow-(--ui-shadow-soft)"
                      : "border-rose-100 bg-white text-slate-600 hover:border-pink-200 hover:bg-white hover:text-slate-700 hover:shadow-(--ui-shadow-soft)"
                  }`}
                  onClick={() => handleCategoryClick("all")}
                >
                  Tất cả
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`h-9 border px-4 text-xs font-semibold transition-all duration-300 ${
                      categoryId === category.id
                        ? "border-pink-600 bg-pink-600 text-white shadow-(--ui-shadow-soft)"
                        : "border-rose-100 bg-white text-slate-600 hover:border-pink-200 hover:bg-white hover:text-slate-700 hover:shadow-(--ui-shadow-soft)"
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
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
              <div className="bg-rose-50 p-4 text-sm text-rose-700">
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="border border-rose-100/70 bg-rose-50/40 p-10 text-center text-slate-600">
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
