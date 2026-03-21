import { X } from "lucide-react";
import type { Product } from "../../../type/product";

type ProductDetailProps = {
  open: boolean;
  product: Product | null;
  categoryName?: string;
  onClose: () => void;
};

function formatPrice(value?: number) {
  return `${(value ?? 0).toLocaleString("vi-VN")} đ`;
}

export default function ProductDetail({
  open,
  product,
  categoryName,
  onClose,
}: ProductDetailProps) {
  if (!open || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4 sm:px-6 sm:py-8">
      <button
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
      />

      <div className="relative z-10 flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden border border-rose-100 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:flex-row">
        {/* Nút X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded border border-transparent text-slate-400 transition-colors duration-200 hover:bg-rose-50 hover:text-rose-600"
        >
          <X className="size-4" />
        </button>

        {/* Cột trái – ảnh */}
        <div className="relative shrink-0 bg-[linear-gradient(160deg,rgba(251,207,232,0.45)_0%,rgba(255,255,255,1)_70%)] md:w-[42%]">
          <div className="absolute inset-x-8 top-6 h-16 bg-rose-200/30 blur-3xl" />
          <div className="relative flex h-48 items-center justify-center overflow-hidden p-4 sm:p-5 md:h-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full max-h-[340px] w-full object-cover shadow-[0_16px_48px_rgba(15,23,42,0.12)] md:max-h-none"
            />
          </div>
        </div>

        {/* Cột phải – thông tin */}
        <div className="flex flex-1 flex-col overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 pr-8">
            <span className="bg-rose-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-700">
              {categoryName || "Chưa phân loại"}
            </span>
            <span className="bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              {product.brand || "-"}
            </span>
          </div>

          {/* Tên */}
          <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">
            {product.name}
          </h2>

          {/* Giá nổi bật */}
          <p className="mt-2 text-xl font-semibold tabular-nums text-rose-600">
            {formatPrice(product.price)}
          </p>

          {/* Divider */}
          <div className="my-4 border-t border-rose-100" />

          {/* Grid thông tin */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-rose-100 bg-rose-50/50 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Tồn kho
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-800">
                {(product.stock ?? 0).toLocaleString("vi-VN")} sp
              </p>
            </div>

            <div className="border border-rose-100 bg-rose-50/50 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Thương hiệu
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-800">
                {product.brand || "-"}
              </p>
            </div>

            <div className="col-span-2 border border-rose-100 bg-rose-50/50 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Danh mục
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-800">
                {categoryName || "Chưa phân loại"}
              </p>
            </div>

            <div className="col-span-2 border border-rose-100 bg-rose-50/50 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Mô tả
              </p>
              <p className="mt-1.5 text-sm leading-6 text-slate-700">
                {product.description?.trim() || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
