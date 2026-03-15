import { FileText } from "lucide-react";

export default function OrderNote() {
  return (
    <div className="border border-slate-200 rounded-xl p-6 bg-white">
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
          rounded-lg
          border border-slate-200
          text-sm
          text-slate-700
          bg-white
          outline-none
          focus:border-pink-500
        "
      />
    </div>
  );
}
