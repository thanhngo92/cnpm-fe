import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Check,
  Clock3,
  MapPin,
  ShoppingCart,
  Truck,
  Wallet,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";
import useCheckout from "../../hooks/useCheckout";
import { getPaymentLabel } from "../../services/checkout";
import AccountLayout from "../account/AccountLayout";
import type { ShippingMethod } from "../../type/checkout";

const formatVnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

const getDeliveryInfo = (method: ShippingMethod) => {
  if (method === "express") {
    return {
      date: "Dự kiến: ngày mai",
      time: "Khung giờ 09:00 - 18:00",
    };
  }

  return {
    date: "Dự kiến: 2-3 ngày làm việc",
    time: "Khung giờ 08:00 - 18:00",
  };
};

export default function CompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const { user } = useAuth();
  const { shippingMethod, paymentMethod, shippingFee } = useCheckout(
    location.state
  );
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/glowup/cart", { replace: true });
    }
  }, [items.length, navigate]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const total = subtotal + shippingFee;

  const orderCode = "#GLU2026-0316";
  const deliveryInfo = getDeliveryInfo(shippingMethod);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 text-center shadow-[0_16px_34px_rgba(15,23,42,0.1)] md:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-pink-100 text-pink-600">
          <Check size={30} className="stroke-3" />
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Đặt hàng thành công!
        </h2>

        <p className="text-slate-600 text-sm max-w-md mx-auto leading-6 mb-6">
          Cảm ơn bạn đã tin tưởng lựa chọn
          <span className="text-pink-600 font-semibold"> GlowUp</span>. Đơn hàng
          của bạn đang được xử lý sớm nhất.
        </p>

        <div className="mb-10 inline-flex items-center bg-slate-100 px-4 py-2 text-sm text-slate-600">
          Mã đơn hàng:{" "}
          <span className="ml-2 font-semibold text-slate-900">{orderCode}</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
          <div className="bg-pink-50 p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center bg-white text-pink-600">
              <Truck size={18} />
            </div>
            <p className="text-sm font-semibold text-slate-900 mb-1.5">
              Giao hàng dự kiến
            </p>
            <p className="text-sm text-slate-600">{deliveryInfo.date}</p>
            <p className="text-xs text-slate-500 mt-1">{deliveryInfo.time}</p>
          </div>

          <div className="bg-pink-50 p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center bg-white text-pink-600">
              <MapPin size={18} />
            </div>
            <p className="text-sm font-semibold text-slate-900 mb-1.5">
              Địa chỉ nhận hàng
            </p>
            <p className="text-sm text-slate-600">12 Nguyễn Văn Bảo, Gò Vấp</p>
            <p className="text-xs text-slate-500 mt-1">TP. Hồ Chí Minh</p>
          </div>

          <div className="bg-pink-50 p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center bg-white text-pink-600">
              <Wallet size={18} />
            </div>
            <p className="text-sm font-semibold text-slate-900 mb-1.5">
              Thanh toán
            </p>
            <p className="text-sm text-slate-600">
              {getPaymentLabel(paymentMethod)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Tổng cộng: {formatVnd(total)}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/glowup")}
            className="inline-flex h-12 items-center justify-center gap-2 bg-pink-600 px-8 font-semibold text-white shadow-sm transition-colors hover:bg-pink-700"
          >
            <ShoppingCart size={17} />
            Tiếp tục mua sắm
          </button>

          <button
            type="button"
            onClick={() => setIsAccountModalOpen(true)}
            className="inline-flex h-12 items-center justify-center gap-2 bg-slate-200 px-8 font-semibold text-slate-700 transition-colors hover:bg-slate-300"
          >
            <Clock3 size={17} />
            Theo dõi đơn hàng
          </button>
        </div>
      </div>

      {/* Account Modal with My Orders Tab */}
      {isAccountModalOpen && (
        <AccountLayout
          onClose={() => setIsAccountModalOpen(false)}
          user={user}
          onLogout={() => navigate("/glowup/login", { replace: true })}
          initialTab="my-orders"
        />
      )}
    </div>
  );
}
