import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { Building2, Clock3, QrCode, ShieldCheck } from "lucide-react";
import OrderSummary from "../../../components/user/checkout/OrderSummary";
import { useCart } from "../../../context/CartContext";
import useCheckoutFlow from "../../../hooks/useCheckoutFlow";
import { getPaymentProviderLabel } from "../../../services/checkout";

const formatVnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

const ORDER_CODE = "GLU-20260316-7842";
const TRANSFER_CONTENT = `PAY ${ORDER_CODE}`;

export default function QRPaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const { shippingMethod, paymentMethod, shippingFee } = useCheckoutFlow(
    location.state,
    "qr"
  );

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

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 xl:gap-10 items-start">
      <section className="bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.08)] md:p-8">
        {/* Header */}
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <QrCode size={20} className="text-pink-600" />
            <h2 className="text-2xl font-bold text-slate-900">Thanh toán QR</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Quét mã bằng ứng dụng ngân hàng hoặc ví điện tử để hoàn tất
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-[220px_1fr] gap-6 items-start">
          {/* QR block */}
          <div className="flex flex-col items-center bg-pink-50 p-4">
            <div className="flex h-48 w-48 items-center justify-center bg-white shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(TRANSFER_CONTENT)}`}
                alt="QR thanh toán"
                className="w-40 h-40"
              />
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center leading-5">
              Mã QR hết hạn sau{" "}
              <span className="font-medium text-slate-700">15 phút</span>
            </p>
          </div>

          {/* Info block */}
          <div className="space-y-3">
            {/* Số tiền */}
            <div className="bg-pink-50 px-4 py-3">
              <p className="text-xs text-slate-500 mb-0.5">
                Số tiền cần thanh toán
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {formatVnd(total)}
              </p>
            </div>

            {/* Chi tiết giao dịch */}
            <div className="space-y-2.5 bg-slate-100 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Mã đơn hàng</span>
                <span className="font-semibold text-slate-900">
                  {ORDER_CODE}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Kênh thanh toán</span>
                <span className="font-medium text-slate-900">
                  {getPaymentProviderLabel(
                    paymentMethod === "cod" ? "qr" : paymentMethod
                  )}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Nội dung chuyển khoản</span>
                <span className="font-medium text-slate-900">
                  {TRANSFER_CONTENT}
                </span>
              </div>
            </div>

            {/* Ngân hàng + thời hạn */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-slate-100 p-3.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Building2 size={14} className="text-pink-600" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Ngân hàng thụ hưởng
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  Vietcombank
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  CTY TNHH GlowUp VN
                </p>
              </div>

              <div className="bg-slate-100 p-3.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Clock3 size={14} className="text-pink-600" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Thời hạn giao dịch
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">15 phút</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kể từ lúc tạo mã QR
                </p>
              </div>
            </div>

            {/* Security badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
              <ShieldCheck size={15} />
              Giao dịch được mã hóa và đối soát tự động
            </div>
          </div>
        </div>
      </section>

      <OrderSummary
        buttonLabel="Tôi đã thanh toán"
        shippingFee={shippingFee}
        onSubmit={() =>
          navigate("/glowup/checkout/complete", {
            state: { shippingMethod, paymentMethod },
          })
        }
      />
    </div>
  );
}
