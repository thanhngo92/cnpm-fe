import { useMemo } from "react";
import { useCart } from "../../context/CartContext";

interface OrderSummaryProps {
  buttonLabel: string;
  onSubmit: () => void;
  shippingFee?: number;
}

export default function OrderSummary({
  buttonLabel,
  onSubmit,
  shippingFee,
}: OrderSummaryProps) {
  const { items } = useCart();

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shipping = shippingFee ?? (subtotal > 500000 ? 0 : 30000);
  const total = subtotal + shipping;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const isDisabled = items.length === 0;

  return (
    <aside className="h-fit max-w-95 bg-white border border-rose-100 p-6 shadow-(--ui-shadow-card)">
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Tổng đơn hàng</h2>
        <span className="bg-rose-50 px-2.5 py-1 text-xs font-medium text-slate-600">
          {totalQuantity} sản phẩm
        </span>
      </div>

      {/* Product list */}
      {items.length > 0 ? (
        <>
          <div className="max-h-48 overflow-y-auto -mx-1 px-1 space-y-4 mb-5">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-slate-100 text-2xl">
                  {item.image}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-slate-800 truncate leading-6">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    x{item.quantity}
                  </p>
                </div>

                <p className="text-base font-semibold text-slate-800 whitespace-nowrap shrink-0">
                  {(item.price * item.quantity).toLocaleString()} đ
                </p>
              </div>
            ))}
          </div>

          <div className="mb-5 border-t border-rose-100" />
        </>
      ) : (
        <div className="mb-5 bg-rose-50 border border-rose-100 px-4 py-3 text-sm text-slate-600">
          Chưa có sản phẩm trong giỏ hàng.
        </div>
      )}

      {/* Subtotal */}
      <div className="flex justify-between items-center text-sm mb-4">
        <span className="text-slate-600">Tạm tính</span>
        <span className="text-slate-800 font-medium">
          {subtotal.toLocaleString()} đ
        </span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center text-sm mb-4">
        <span className="text-slate-600">Phí vận chuyển</span>
        <span
          className={`font-medium ${shipping === 0 ? "text-emerald-600" : "text-slate-800"}`}
        >
          {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()} đ`}
        </span>
      </div>

      {/* Divider */}
      <div className="mb-5 border-t border-rose-100" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-slate-800">Tổng</span>
        <span className="text-xl font-bold text-slate-800 whitespace-nowrap">
          {total.toLocaleString()} đ
        </span>
      </div>

      <button
        onClick={onSubmit}
        disabled={isDisabled}
        className={`h-10 w-full text-base font-semibold text-white transition-colors duration-200 ${
          isDisabled
            ? "cursor-not-allowed bg-slate-300"
            : "bg-pink-600 hover:bg-pink-700"
        }`}
      >
        {buttonLabel}
      </button>
    </aside>
  );
}
