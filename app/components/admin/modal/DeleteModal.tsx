import { AlertCircle, X } from "lucide-react";
import { Button } from "../../ui/button";

type DeleteModalProps = {
  open: boolean;
  loading?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

export default function DeleteModal({
  open,
  loading = false,
  title = "Xác nhận xóa",
  description = "Bạn có chắc muốn xóa dữ liệu này? Hành động này không thể hoàn tác.",
  confirmText = "Xóa",
  cancelText = "Hủy",
  onClose,
  onConfirm,
}: DeleteModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 py-6">
      <button
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0"
      />

      <div className="relative z-10 w-full max-w-2xl bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <AlertCircle className="size-5" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
              <p className="max-w-xl text-sm leading-7 text-slate-500">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center text-slate-400 transition-colors duration-200 hover:text-slate-600"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 pb-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 border-slate-200 bg-white px-5 text-slate-700 shadow-none hover:bg-slate-50"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="h-10 bg-red-500 px-5 text-white shadow-none hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Đang xử lý..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
