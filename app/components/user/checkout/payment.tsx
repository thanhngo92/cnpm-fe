import { useState } from "react";
import { useNavigate } from "react-router";
import { CreditCard, Wallet } from "lucide-react";
import OrderSummary from "../../../components/user/checkout/OrderSummary";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"cod" | "qr">("cod");

  const handleNext = () => {
    if (method === "qr") {
      navigate("/glowup/checkout/qr-payment");
      return;
    }

    navigate("/glowup/checkout/complete");
  };

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 xl:gap-10 items-start">
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-7">
          <Wallet size={20} className="text-pink-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Phương thức thanh toán
          </h2>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setMethod("cod")}
            className={`w-full text-left rounded-2xl border p-5 transition-colors ${
              method === "cod"
                ? "border-pink-500 bg-pink-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                  method === "cod" ? "border-emerald-500" : "border-slate-300"
                }`}
              >
                {method === "cod" && (
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                )}
              </div>

              <div>
                <p className="text-lg font-medium text-slate-900">
                  Thanh toán khi nhận hàng (COD)
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Thanh toán bằng tiền mặt khi giao hàng
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMethod("qr")}
            className={`w-full text-left rounded-2xl border p-5 transition-colors ${
              method === "qr"
                ? "border-pink-500 bg-pink-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                  method === "qr" ? "border-emerald-500" : "border-slate-300"
                }`}
              >
                {method === "qr" && (
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                )}
              </div>

              <div>
                <p className="text-lg font-medium text-slate-900 flex items-center gap-2">
                  Thẻ tín dụng/Ghi nợ <CreditCard size={18} />
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Thanh toán an toàn qua quét mã QR
                </p>
              </div>
            </div>
          </button>
        </div>
      </section>

      <OrderSummary
        buttonLabel={
          method === "qr" ? "Tiếp tục thanh toán" : "Xác nhận đặt hàng"
        }
        onSubmit={handleNext}
      />
    </div>
  );
}
