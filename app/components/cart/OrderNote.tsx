import { FileText } from "lucide-react";

export default function OrderNote() {
  return (
    <div className="bg-white border border-slate-200/80 p-6 shadow-(--ui-shadow-soft)">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-pink-600" size={18} />
        <h3 className="font-semibold text-slate-900">Ghi chú đơn hàng</h3>
      </div>
      <textarea
        placeholder="Ghi chú cho đơn hàng (ví dụ: giao giờ hành chính)..."
        className="w-full h-24 p-3 resize-none text-sm border border-slate-200/80 bg-white outline-none transition-[color,box-shadow,border-color] duration-200 ease-out focus-visible:border-pink-300 focus-visible:ring-2 focus-visible:ring-pink-200/60"
      />
    </div>
  );
}
