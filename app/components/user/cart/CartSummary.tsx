import { useState } from "react";
import { Tag } from "lucide-react";
import { useNavigate } from "react-router";

interface CartSummaryProps {
  items: {
    price: number;
    quantity: number;
  }[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 30000;

  const applyCoupon = () => {
    if (coupon === "SALE10") {
      setDiscount(subtotal * 0.1);
    } else if (coupon === "SALE50K") {
      setDiscount(50000);
    } else {
      setDiscount(0);
    }
  };

  const total = subtotal - discount + shipping;

  return (
    <div className="border border-slate-200 rounded-xl p-6 bg-white w-full h-fit max-w-95">
      {/* Title */}
      <h2 className="text-xl font-bold text-slate-900 mb-6">Tổng đơn hàng</h2>

      {/* Coupon */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Tag
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Mã giảm giá"
            className="
              w-full
              h-11
              pl-9
              pr-3
              border border-slate-200
              rounded-lg
              text-sm
              text-slate-700
              bg-white
              outline-none
              focus:border-pink-500
            "
          />
        </div>

        <button
          onClick={applyCoupon}
          className="
            h-11
            px-5
            rounded-lg
            bg-pink-600
            hover:bg-pink-700
            text-white
            text-sm
            font-semibold
            whitespace-nowrap
          "
        >
          Áp dụng
        </button>
      </div>

      {/* Divider */}
      <div className="border-b border-slate-200 mb-5"></div>

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
        <span className="text-slate-900 font-medium">
          {shipping.toLocaleString()} đ
        </span>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-slate-600">Giảm giá</span>
          <span className="text-pink-600 font-medium">
            -{discount.toLocaleString()} đ
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="border-b border-slate-200 mb-5"></div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-slate-900">Tổng</span>

        <span className="text-xl font-bold text-slate-900">
          {total.toLocaleString()} đ
        </span>
      </div>

      {/* Checkout */}
      <button
        onClick={() => navigate("/glowup/checkout")}
        className="
          w-full
          h-12
          bg-pink-600
          hover:bg-pink-700
          text-white
          text-base
          font-semibold
          rounded-xl
        "
      >
        Thanh toán
      </button>
    </div>
  );
}
