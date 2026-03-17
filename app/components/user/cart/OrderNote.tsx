import { FileText } from "lucide-react";

export default function OrderNote() {
  return (
    <div className="bg-white p-6 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-pink-500" size={18} />
        <h3 className="font-semibold text-slate-900">Ghi chú đơn hàng</h3>
      </div>

      <textarea
        placeholder="Ghi chú cho đơn hàng (ví dụ: giao giờ hành chính)..."
        className="
          w-full
          h-28
          p-3
          resize-none
          text-sm
          text-slate-700
          bg-slate-100
          outline-none
          focus:ring-2
          focus:ring-pink-200
        "
      />
    </div>
  );
}
