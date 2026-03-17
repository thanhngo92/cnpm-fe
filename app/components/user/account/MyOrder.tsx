import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { CartItem } from "../../../data/cart";

type OrderStatus = "Đang giao" | "Đã giao";

type OrderRecord = {
  id: string;
  date: string;
  status: OrderStatus;
  paymentMethod: string;
  deliveryAddress: string;
  items: CartItem[];
};

const formatVnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

const orderData: OrderRecord[] = [
  {
    id: "GLU-20260317-101",
    date: "17/03/2026",
    status: "Đang giao",
    paymentMethod: "Thanh toán QR Code",
    deliveryAddress: "12 Nguyễn Văn Bảo, Gò Vấp, TP. Hồ Chí Minh",
    items: [
      {
        id: "prd-cica-cleanser",
        name: "Cica Calm Cleanser",
        price: 320000,
        quantity: 1,
        image: "🧴",
      },
      {
        id: "prd-skin-tint",
        name: "Skin Tint Natural Glow",
        price: 465000,
        quantity: 2,
        image: "✨",
      },
    ],
  },
  {
    id: "GLU-20260314-084",
    date: "14/03/2026",
    status: "Đã giao",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    deliveryAddress: "25 Quang Trung, Phú Nhuận, TP. Hồ Chí Minh",
    items: [
      {
        id: "prd-body-cream",
        name: "Body Cream Repair",
        price: 395000,
        quantity: 1,
        image: "🧴",
      },
      {
        id: "prd-rose-water-toner",
        name: "Rose Water Toner",
        price: 225000,
        quantity: 2,
        image: "🌹",
      },
    ],
  },
];

export default function MyOrder() {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orderData[0]?.id ?? null
  );

  const getOrderTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Đơn hàng của tôi</h2>
        <p className="mt-1 text-sm text-slate-500">
          Theo dõi trạng thái đơn hàng gần đây của bạn.
        </p>
      </div>

      <div className="space-y-3">
        {orderData.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          const total = getOrderTotal(order.items);

          return (
            <article
              key={order.id}
              className="bg-white px-4 py-4 shadow-[0_8px_18px_rgba(15,23,42,0.05)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {order.id}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Ngày đặt: {order.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {formatVnd(total)}
                  </p>
                  <p className="mt-1 text-xs font-medium text-pink-600">
                    {order.status}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedOrderId((current) =>
                      current === order.id ? null : order.id
                    )
                  }
                  className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  {isExpanded ? (
                    <>
                      Ẩn chi tiết <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      Xem chi tiết <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>

              {isExpanded && (
                <div className="mt-4 bg-rose-50/35 p-4">
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">
                        Thanh toán:
                      </span>{" "}
                      {order.paymentMethod}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">
                        Địa chỉ nhận hàng:
                      </span>{" "}
                      {order.deliveryAddress}
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.id}`}
                        className="flex items-center justify-between gap-3 bg-white/95 px-3 py-2"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="text-lg">{item.image}</span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              x{item.quantity}
                            </p>
                          </div>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-slate-900">
                          {formatVnd(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
