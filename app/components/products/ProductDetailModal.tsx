import { useEffect } from "react";
import {
  CalendarDays,
  PackageCheck,
  ScrollText,
  ShoppingBag,
  Tag,
  X,
} from "lucide-react";

import type { Product } from "../../type/product";

type ProductDetailModalProps = {
  product: Product;
  categoryName: string;
  onClose: () => void;
  onAddToCart: () => void;
};

const priceFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function ProductDetailModal({
  product,
  categoryName,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const inStock = product.stock > 0;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
      <button
        type="button"
        aria-label="Đóng chi tiết sản phẩm"
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-10 grid max-h-[90vh] w-full max-w-5xl overflow-hidden bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] lg:grid-cols-[1.02fr_0.98fr]">
        <button
          type="button"
          aria-label="Đóng"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center border border-rose-100 bg-white text-slate-500 transition-colors duration-200 hover:border-rose-200 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(251,207,232,0.34)_0%,rgba(255,255,255,0.96)_34%,rgba(255,255,255,1)_100%)] p-5 sm:p-7 lg:p-8">
          <div className="absolute inset-x-10 top-8 h-24 bg-rose-200/30 blur-3xl" />
          <div className="relative overflow-hidden bg-white/80 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="aspect-[4/4.8] w-full object-cover"
            />
          </div>
        </div>

        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <div className="flex flex-wrap items-center gap-2 pr-12">
            <span className="bg-rose-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-700">
              {categoryName}
            </span>
            <span className="bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {product.brand}
            </span>
          </div>

          <h2 className='mt-4 font-["Cormorant_Garamond",serif] text-3xl leading-[1.02] font-semibold text-slate-800 sm:text-[2.5rem]'>
            {product.name}
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
            {product.description}
          </p>

          <div className="mt-6 flex flex-col gap-4 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Giá bán
              </p>
              <p className='mt-2 font-["Cormorant_Garamond",serif] text-3xl font-semibold leading-none text-slate-800'>
                {priceFormatter.format(product.price)}
              </p>
            </div>

            <span
              className={
                inStock
                  ? "inline-flex w-fit items-center bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700"
                  : "inline-flex w-fit items-center bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700"
              }
            >
              {inStock ? `Còn ${product.stock} sản phẩm` : "Hiện đang hết hàng"}
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="bg-rose-50 border border-rose-100 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                <Tag className="h-4 w-4 text-pink-600" />
                Mã sản phẩm
              </div>
              <p className="mt-2 text-sm font-medium text-slate-800">
                {product.id}
              </p>
            </div>

            <div className="bg-rose-50 border border-rose-100 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                <PackageCheck className="h-4 w-4 text-pink-600" />
                Tồn kho
              </div>
              <p className="mt-2 text-sm font-medium text-slate-800">
                {inStock
                  ? `${product.stock} sản phẩm sẵn sàng giao`
                  : "Sẽ cập nhật sớm"}
              </p>
            </div>

            <div className="bg-rose-50 border border-rose-100 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                <ScrollText className="h-4 w-4 text-pink-600" />
                Danh mục
              </div>
              <p className="mt-2 text-sm font-medium text-slate-800">
                {categoryName}
              </p>
            </div>

            <div className="bg-rose-50 border border-rose-100 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                <CalendarDays className="h-4 w-4 text-pink-600" />
                Cập nhật
              </div>
              <p className="mt-2 text-sm font-medium text-slate-800">
                {dateFormatter.format(new Date(product.updatedAt))}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onAddToCart}
              disabled={!inStock}
              className={`inline-flex h-10 flex-1 items-center justify-center gap-2 px-5 text-sm font-semibold transition-all duration-300 ${
                inStock
                  ? "bg-pink-600 text-white hover:bg-pink-700"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
