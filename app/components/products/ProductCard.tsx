import type { KeyboardEvent, MouseEvent } from "react";
import { ShoppingBag } from "lucide-react";

import type { Product } from "../../type/product";

type ProductCardProps = {
  product: Product;
  categoryName: string;
  onViewDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

const priceFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export default function ProductCard({
  product,
  categoryName,
  onViewDetail,
  onAddToCart,
}: ProductCardProps) {
  const inStock = product.stock > 0;

  const handleViewDetail = () => {
    onViewDetail(product);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleViewDetail();
    }
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!inStock) return;

    onAddToCart(product);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleViewDetail}
      onKeyDown={handleCardKeyDown}
      className="group flex h-full cursor-pointer flex-col border border-rose-100 bg-white/0 shadow-none transition-all duration-300 hover:border-rose-300 hover:bg-white hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)] focus:outline-none focus-visible:border-rose-300 focus-visible:bg-white focus-visible:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
    >
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden bg-slate-50">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/4.2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          <span className='absolute right-3 top-3 bg-white/95 px-3 py-1 font-["Inter",sans-serif] text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-700 backdrop-blur-sm'>
            {categoryName.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3 pb-4">
        <p className='h-4 truncate font-["Inter",sans-serif] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#94A3B8]'>
          {product.brand}
        </p>

        <h3 className='mt-1 h-12 overflow-hidden line-clamp-2 font-["Cormorant_Garamond",serif] text-[20px] leading-[1.08] font-medium text-slate-900 sm:h-12 sm:text-[22px]'>
          {product.name}
        </h3>

        <p className='mt-1.5 h-[2.4rem] overflow-hidden line-clamp-2 font-["Cormorant_Garamond",serif] text-[15px] leading-[1.24] font-normal text-slate-600'>
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className='font-["Cormorant_Garamond",serif] text-[22px] font-semibold leading-none text-[#0F172A] sm:text-[24px]'>
            {priceFormatter.format(product.price)}
          </span>

          <span
            className={
              inStock
                ? 'shrink-0 bg-emerald-50 px-2.5 py-1 font-["Inter",sans-serif] text-[10px] font-semibold text-emerald-600'
                : 'shrink-0 bg-rose-50 px-2.5 py-1 font-["Inter",sans-serif] text-[10px] font-semibold text-rose-600'
            }
          >
            {inStock ? `Còn ${product.stock}` : "Hết hàng"}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`inline-flex h-10 w-full items-center justify-center gap-2 px-4 font-["Inter",sans-serif] text-sm font-semibold transition-all duration-300 ${
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
    </article>
  );
}
