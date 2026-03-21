import { type ComponentType } from "react";
import {
  Box,
  CheckCircle2,
  Circle,
  CircleDashed,
  Clock3,
  CreditCard,
  MapPin,
  Truck,
  X,
  XCircle,
} from "lucide-react";

// ─── Exported types (MyOrder imports từ đây) ──────────────────────

export type OrderDetailStatus =
  | "pending"
  | "shipping"
  | "delivered"
  | "canceled";

export type OrderDetailItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export type OrderDetailStep = {
  id: string;
  title: string;
  time: string;
  note: string;
  done: boolean;
  current?: boolean;
};

export type OrderRecord = {
  id: string;
  placedAt: string;
  status: OrderDetailStatus;
  recipient: {
    name: string;
    phone: string;
    address: string;
  };
  payment: {
    method: string;
    status: string;
  };
  shipping: {
    provider: string;
    trackingCode: string;
  };
  summary: {
    shippingFee: number;
    discount: number;
  };
  items: OrderDetailItem[];
  steps: OrderDetailStep[];
};

// ─── Exported helpers (MyOrder import để không viết lại) ──────────

export const orderStatusMeta: Record<
  OrderDetailStatus,
  {
    label: string;
    icon: ComponentType<{ className?: string }>;
    badgeClass: string;
  }
> = {
  pending: {
    label: "Chờ xác nhận",
    icon: Clock3,
    badgeClass: "bg-amber-50 text-amber-700",
  },
  shipping: {
    label: "Đang giao",
    icon: Truck,
    badgeClass: "bg-sky-50 text-sky-700",
  },
  delivered: {
    label: "Đã giao",
    icon: CheckCircle2,
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
  canceled: {
    label: "Đã hủy",
    icon: XCircle,
    badgeClass: "bg-rose-50 text-rose-700",
  },
};

export const formatVnd = (value: number) =>
  `${value.toLocaleString("vi-VN")} đ`;

export const getSubTotal = (items: OrderDetailItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const getPaymentStatusClass = (status: string) => {
  const v = status.toLowerCase();
  if (v.includes("đã thanh toán")) return "text-emerald-600";
  if (v.includes("hủy")) return "text-rose-600";
  return "text-amber-600";
};

// ─── Modal component ──────────────────────────────────────────────

type OrderDetailProps = {
  open: boolean;
  order: OrderRecord | null;
  onClose: () => void;
};

export default function OrderDetail({ open, order, onClose }: OrderDetailProps) {
  if (!open || !order) return null;

  const meta = orderStatusMeta[order.status];
  const StatusIcon = meta.icon;
  const subTotal = getSubTotal(order.items);
  const total = subTotal + order.summary.shippingFee - order.summary.discount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4 sm:px-5 sm:py-6">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
      />

      {/* Panel */}
      <div className="relative z-10 flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden border border-rose-100 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
        {/* X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded border border-transparent text-slate-400 transition-colors duration-200 hover:bg-rose-50 hover:text-rose-600"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="shrink-0 border-b border-rose-50 px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-4 pr-8">
            <div className="flex min-w-0 items-center gap-4">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-rose-50 text-rose-300">
                <Box className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="text-base font-semibold text-slate-800">
                    {order.id}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold ${meta.badgeClass}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {meta.label}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">{order.placedAt}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Tổng tiền
              </p>
              <p className="mt-0.5 text-xl font-bold leading-none text-pink-600 sm:text-2xl">
                {formatVnd(total)}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.65fr)_360px]">
            {/* Left: items + summary */}
            <div className="border-b border-rose-50 p-4 sm:p-5 lg:border-b-0 lg:border-r">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Sản phẩm
              </h4>

              <div className="mt-3 space-y-2.5">
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.id}`}
                    className="flex flex-col gap-3 bg-rose-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-11 w-11 shrink-0 object-cover"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold leading-5 text-slate-800">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-600">
                          {item.variant}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          SL: x{item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 text-right text-base font-semibold text-slate-800 sm:text-left">
                      {formatVnd(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-4 bg-rose-50 p-5">
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-4">
                    <span>Tạm tính</span>
                    <span className="text-slate-700">{formatVnd(subTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Phí vận chuyển</span>
                    <span className="text-slate-700">
                      {formatVnd(order.summary.shippingFee)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-pink-500">Giảm giá</span>
                    <span className="text-pink-500">
                      -{formatVnd(order.summary.discount)}
                    </span>
                  </div>
                </div>
                <div className="my-4 h-px bg-rose-100/50" />
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-semibold text-slate-800 sm:text-lg">
                    Tổng thanh toán
                  </p>
                  <p className="text-xl font-bold leading-none text-pink-600 sm:text-2xl">
                    {formatVnd(total)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: shipping info + journey */}
            <div className="space-y-4 p-4 sm:p-5">
              {/* Thông tin nhận hàng */}
              <div className="border border-rose-100 bg-white p-4 sm:p-5">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Thông tin nhận hàng
                </h4>
                <div className="mt-3 bg-rose-50 p-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {order.recipient.name} • {order.recipient.phone}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {order.recipient.address}
                      </p>
                    </div>
                  </div>

                  <div className="my-4 h-px bg-rose-100/50" />

                  <div className="flex items-start gap-2.5">
                    <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {order.payment.method}
                      </p>
                      <p
                        className={`mt-1 text-sm ${getPaymentStatusClass(
                          order.payment.status
                        )}`}
                      >
                        {order.payment.status}
                      </p>
                    </div>
                  </div>

                  <div className="my-4 h-px bg-rose-100/50" />

                  <div className="flex items-start gap-2.5">
                    <Truck className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {order.shipping.provider}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {order.shipping.trackingCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hành trình đơn hàng */}
              <div className="border border-rose-100 bg-white p-4 sm:p-5">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Hành trình đơn hàng
                </h4>
                <div className="mt-3 space-y-3 bg-rose-50 p-4">
                  {order.steps.map((step, index) => (
                    <div key={step.id} className="relative flex gap-3">
                      <div className="mt-0.5 shrink-0 text-slate-300">
                        {index < order.steps.length - 1 && (
                          <span className="absolute left-1.5 top-4 h-[calc(100%-2px)] w-px bg-rose-200" />
                        )}
                        {step.current ? (
                          <Circle className="h-3.5 w-3.5 fill-pink-600 text-pink-600" />
                        ) : step.done ? (
                          <Circle className="h-3.5 w-3.5 fill-slate-300 text-slate-300" />
                        ) : (
                          <CircleDashed className="h-3.5 w-3.5 text-slate-300" />
                        )}
                      </div>
                      <div className="min-w-0 pb-2">
                        <p
                          className={`text-sm font-semibold ${
                            step.current ? "text-slate-800" : "text-slate-600"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {step.time}
                        </p>
                        <p className="mt-1 text-xs italic text-slate-600">
                          {step.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
