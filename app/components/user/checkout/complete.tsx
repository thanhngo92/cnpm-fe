import { Link } from "react-router";
import { CheckCircle2 } from "lucide-react";

export default function CompletePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={34} />
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Đặt hàng thành công
        </h2>

        <p className="text-slate-600 mb-8">
          Cảm ơn bạn đã mua sắm tại GlowUp. Đơn hàng của bạn đã được ghi nhận và
          đang chờ xử lý.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8 text-left">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500 mb-1">Mã đơn hàng</p>
            <p className="font-semibold text-slate-900">#GLU2026-001</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500 mb-1">Trạng thái</p>
            <p className="font-semibold text-emerald-600">Đã xác nhận</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/glowup"
            className="h-11 px-6 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold inline-flex items-center justify-center"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
