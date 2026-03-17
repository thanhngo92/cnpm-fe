import { useMemo, useState, type ReactNode } from "react";
import { Gift, Ticket, Star, ChevronRight, Truck } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../../context/CartContext";
import { categoryData } from "../../../data/category";
import { productData } from "../../../data/product";
import {
  promotionDeals,
  promotionVouchers,
  type VoucherColor,
  type VoucherIcon,
} from "../../../data/promotion";
import type { Product } from "../../../type/product";
import ProductCard from "../products/ProductCard";
import ProductDetailModal from "../products/ProductDetailModal";

export default function PromotionPage() {
  const productsPath = "/glowup/products";
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const colorClassByVoucher: Record<VoucherColor, string> = {
    emerald: "bg-emerald-100/80 text-emerald-700",
    blue: "bg-sky-100/80 text-sky-700",
    pink: "bg-pink-100/80 text-pink-700",
  };

  const iconByVoucher: Record<VoucherIcon, ReactNode> = {
    ticket: <Ticket size={24} />,
    truck: <Truck size={24} />,
    gift: <Gift size={24} />,
  };

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

  const promoProducts = promotionDeals
    .map((deal) => {
      const product = productData.find((item) => item.id === deal.productId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        badge: `-${deal.discountPercent}%`,
      };
    })
    .filter((product) => product !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden group">
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
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 font-semibold hover:bg-pink-50 transition-colors"
            >
              Mua ngay <ChevronRight size={18} />
            </Link>
          </div>

          <div className="w-full sm:w-auto flex flex-col items-end gap-4">
            <div className="bg-linear-to-r from-yellow-400 to-yellow-600 px-6 py-2 text-sm font-bold text-slate-900 shadow-lg">
              Flash Sale
            </div>
            <div className="text-right mt-auto">
              <p className="text-sm text-slate-400 mb-2">
                Số lượng ưu đãi có hạn
              </p>
              <div className="w-full sm:w-48 h-2 bg-white/10 overflow-hidden">
                <div className="h-full bg-linear-to-r from-yellow-400 to-yellow-500 w-[75%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-yellow-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-pink-500/10 blur-3xl"></div>
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {promotionVouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="bg-white p-6 shadow-[0_14px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(15,23,42,0.1)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`h-12 w-12 shrink-0 ${colorClassByVoucher[voucher.color]} flex items-center justify-center`}
                >
                  {iconByVoucher[voucher.icon]}
                </div>
                <div className="flex-1">
                  <p className='font-["Inter",sans-serif] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
                    Voucher
                  </p>
                  <h4 className='mt-1 font-["Cormorant_Garamond",serif] text-[28px] leading-none font-semibold text-slate-900'>
                    {voucher.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {voucher.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                <p className='font-["Inter",sans-serif] text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400'>
                  Hết hạn: {voucher.expiresAt}
                </p>
                <button className="px-5 py-2 text-sm font-semibold bg-pink-600 text-white transition-colors hover:bg-pink-700">
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

        <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {promoProducts.map((product) => (
            <div key={product.id} className="relative">
              <span className="pointer-events-none absolute left-7 top-7 z-10 bg-pink-600 px-3 py-1 text-[10px] font-semibold text-white uppercase tracking-[0.08em] sm:left-8 sm:top-8">
                {product.badge}
              </span>

              <ProductCard
                product={product}
                categoryName={
                  categoryNameById[product.categoryId] || "Danh mục khác"
                }
                onViewDetail={setSelectedProduct}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
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
    </div>
  );
}
