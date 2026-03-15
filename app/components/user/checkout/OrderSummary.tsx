import { useMemo } from "react";
import { useCart } from "../../../context/CartContext";

interface OrderSummaryProps {
  buttonLabel: string;
  onSubmit: () => void;
}

export default function OrderSummary({
  buttonLabel,
  onSubmit,
}: OrderSummaryProps) {
  const { items } = useCart();

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className="border border-slate-200 rounded-xl p-6 bg-white h-fit max-w-[380px]">
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Tổng đơn hàng</h2>
        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
          {totalQuantity} sản phẩm
        </span>
      </div>

      {/* Product list */}
      {items.length > 0 ? (
        <>
          <div className="max-h-48 overflow-y-auto -mx-1 px-1 space-y-3 mb-5">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shrink-0">
                  {item.image}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    x{item.quantity}
                  </p>
                </div>

                <p className="text-sm font-medium text-slate-900 whitespace-nowrap shrink-0">
                  {(item.price * item.quantity).toLocaleString()} đ
                </p>
              </div>
            ))}
          </div>

          <div className="border-b border-slate-200 mb-5" />
        </>
      ) : (
        <div className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-5">
          Chưa có sản phẩm trong giỏ hàng.
        </div>
      )}

      {/* Subtotal */}
      <div className="flex justify-between items-center text-sm mb-4">
        <span className="text-slate-600">Tạm tính</span>
        <span className="text-slate-900 font-medium">
          {subtotal.toLocaleString()} đ
        </span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center text-sm mb-4">
        <span className="text-slate-600">Phí vận chuyển</span>
        <span
          className={`font-medium ${shipping === 0 ? "text-emerald-600" : "text-slate-900"}`}
        >
          {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()} đ`}
        </span>
      </div>

      {/* Divider */}
      <div className="border-b border-slate-200 mb-5" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-slate-900">Tổng</span>
        <span className="text-xl font-bold text-slate-900 whitespace-nowrap">
          {total.toLocaleString()} đ
        </span>
      </div>

      <button
        onClick={onSubmit}
        className="w-full h-12 bg-pink-600 hover:bg-pink-700 text-white text-base font-semibold rounded-xl transition-colors"
      >
        {buttonLabel}
      </button>
    </aside>
  );
}
