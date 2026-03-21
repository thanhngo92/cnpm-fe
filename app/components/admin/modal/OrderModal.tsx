import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "../../ui/button";
import type { OrderStatus } from "../../../type/order";

// ─── Status meta riêng cho admin (dùng OrderStatus của BE) ───────

const statusMeta: Record<
  OrderStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  pending: {
    label: "Chờ xác nhận",
    badgeClass: "bg-amber-50 text-amber-700",
    dotClass: "bg-amber-400",
  },
  shipping: {
    label: "Đang giao",
    badgeClass: "bg-sky-50 text-sky-700",
    dotClass: "bg-sky-400",
  },
  completed: {
    label: "Hoàn tất",
    badgeClass: "bg-emerald-50 text-emerald-700",
    dotClass: "bg-emerald-400",
  },
  cancelled: {
    label: "Đã hủy",
    badgeClass: "bg-slate-100 text-slate-500",
    dotClass: "bg-slate-400",
  },
};

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Chờ xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "completed", label: "Hoàn tất" },
  { value: "cancelled", label: "Đã hủy" },
];

// ─── Types ───────────────────────────────────────────────────────

export type OrderFormValues = {
  customerName: string;
  phone: string;
  status: OrderStatus;
};

type OrderModalProps = {
  open: boolean;
  loading?: boolean;
  orderCode?: string;
  initialValues?: Partial<OrderFormValues>;
  onClose: () => void;
  onSubmit: (values: OrderFormValues) => void | Promise<void>;
};

const defaultValues: OrderFormValues = {
  customerName: "",
  phone: "",
  status: "pending",
};

// ─── Component ───────────────────────────────────────────────────

export default function OrderModal({
  open,
  loading = false,
  orderCode,
  initialValues,
  onClose,
  onSubmit,
}: OrderModalProps) {
  const [formValues, setFormValues] = useState<OrderFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof OrderFormValues, string>>
  >({});

  useEffect(() => {
    if (!open) return;
    setFormValues({ ...defaultValues, ...initialValues });
    setErrors({});
  }, [open, initialValues]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const setField = <K extends keyof OrderFormValues>(
    key: K,
    value: OrderFormValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const next: Partial<Record<keyof OrderFormValues, string>> = {};
    if (!formValues.customerName.trim())
      next.customerName = "Vui lòng nhập tên khách hàng.";
    if (!formValues.phone.trim())
      next.phone = "Vui lòng nhập số điện thoại.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSubmit({
      customerName: formValues.customerName.trim(),
      phone: formValues.phone.trim(),
      status: formValues.status,
    });
  };

  const currentMeta = statusMeta[formValues.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-5 backdrop-blur-[2px]">
      {/* Overlay click */}
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0"
      />

      <div className="relative z-10 flex max-h-[calc(100vh-2.5rem)] w-full max-w-md flex-col overflow-hidden border border-rose-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
        {/* X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded border border-transparent text-slate-400 transition-colors duration-200 hover:bg-rose-50 hover:text-rose-600"
        >
          <X className="size-4" />
        </button>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-5 pb-5 pt-9 sm:px-6">
          {/* Order code badge */}
          {orderCode && (
            <div className="inline-flex items-center gap-1.5 border border-rose-100 bg-rose-50/40 px-3 py-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Đơn hàng
              </span>
              <span className="font-mono text-sm font-bold text-slate-900">
                #{orderCode}
              </span>
            </div>
          )}

          {/* Khách hàng */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              Tên khách hàng
            </label>
            <input
              value={formValues.customerName}
              onChange={(e) => setField("customerName", e.target.value)}
              placeholder="Nhập tên khách hàng"
              className="h-10 w-full border border-rose-200 bg-white px-3 text-sm text-slate-900 outline-none transition-[color,box-shadow,border-color] duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
            {errors.customerName && (
              <p className="text-xs text-rose-500">{errors.customerName}</p>
            )}
          </div>

          {/* SĐT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              Số điện thoại
            </label>
            <input
              value={formValues.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="0901 234 567"
              className="h-10 w-full border border-rose-200 bg-white px-3 text-sm text-slate-900 outline-none transition-[color,box-shadow,border-color] duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
            {errors.phone && (
              <p className="text-xs text-rose-500">{errors.phone}</p>
            )}
          </div>

          {/* Trạng thái */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              Trạng thái
            </label>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map((opt) => {
                const m = statusMeta[opt.value];
                const isSelected = formValues.status === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setField("status", opt.value)}
                    className={`flex items-center gap-2 border px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                      isSelected
                        ? `border-rose-200 ${m.badgeClass} font-semibold`
                        : "border-rose-100 bg-white text-slate-600 hover:border-rose-200 hover:bg-rose-50/30"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        isSelected ? m.dotClass : "bg-slate-300"
                      }`}
                    />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview trạng thái đang chọn */}
          <div className="border border-rose-100 bg-rose-50/20 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Trạng thái hiện tại
            </p>
            <span
              className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold ${currentMeta.badgeClass}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${currentMeta.dotClass}`}
              />
              {currentMeta.label}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-rose-100 bg-white px-5 py-4 sm:px-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-none hover:bg-slate-50"
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="h-10 bg-rose-500 px-4 text-sm text-white shadow-none hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Đang lưu..." : "Cập nhật đơn hàng"}
          </Button>
        </div>
      </div>
    </div>
  );
}
