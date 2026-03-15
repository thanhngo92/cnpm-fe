import { useNavigate } from "react-router";
import { QrCode, ShieldCheck } from "lucide-react";
import OrderSummary from "../../../components/user/checkout/OrderSummary";

export default function QRPaymentPage() {
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 xl:gap-10 items-start">
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-7">
          <QrCode size={20} className="text-pink-600" />
          <h2 className="text-xl font-bold text-slate-900">Thanh toán QR</h2>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-55 h-55 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center mb-5">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=GlowUp-Checkout"
              alt="QR Payment"
              className="w-45 h-45"
            />
          </div>

          <p className="text-base font-medium text-slate-900 mb-2">
            Quét mã để hoàn tất thanh toán
          </p>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            Đây là luồng mock. Sau khi nhấn nút bên phải hoặc nút dưới đây, đơn
            hàng sẽ được đánh dấu là thanh toán thành công.
          </p>

          <div className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-4 py-2 rounded-full">
            <ShieldCheck size={16} />
            Bảo mật thanh toán
          </div>
        </div>
      </section>

      <OrderSummary
        buttonLabel="Tôi đã thanh toán"
        onSubmit={() => navigate("/glowup/checkout/complete")}
      />
    </div>
  );
}
