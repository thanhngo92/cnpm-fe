import { useMemo, useState, type ComponentType } from "react";
import {
  Box,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleDashed,
  Clock3,
  CreditCard,
  MapPin,
  Search,
  Truck,
  XCircle,
} from "lucide-react";

type OrderStatus = "pending" | "shipping" | "delivered" | "canceled";

type OrderItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type OrderStep = {
  id: string;
  title: string;
  time: string;
  note: string;
  done: boolean;
  current?: boolean;
};

type OrderRecord = {
  id: string;
  placedAt: string;
  status: OrderStatus;
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
  items: OrderItem[];
  steps: OrderStep[];
};

type FilterKey = "all" | OrderStatus;

const formatVnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

const getSubTotal = (items: OrderItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const getPaymentStatusClass = (status: string) => {
  const value = status.toLowerCase();

  if (value.includes("đã thanh toán")) return "text-emerald-600";
  if (value.includes("hủy")) return "text-rose-600";
  return "text-amber-600";
};

const statusMeta: Record<
  OrderStatus,
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

const tabs: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "shipping", label: "Đang giao" },
  { key: "delivered", label: "Đã giao" },
  { key: "canceled", label: "Đã hủy" },
];

const orderData: OrderRecord[] = [
  {
    id: "GLU-20260317-101",
    placedAt: "Đặt lúc: 17/03/2026 14:30",
    status: "shipping",
    recipient: {
      name: "Tấn Thành",
      phone: "0901234567",
      address: "123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
    },
    payment: {
      method: "Thanh toán: COD",
      status: "Chưa thanh toán",
    },
    shipping: {
      provider: "Vận chuyển: Shopee Xpress",
      trackingCode: "SPX123456789",
    },
    summary: {
      shippingFee: 30000,
      discount: 30000,
    },
    items: [
      {
        id: "itm-01",
        name: "Son môi Matte Liquid",
        variant: "Màu 01 - Đỏ Nhung",
        price: 225000,
        quantity: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "itm-02",
        name: "Phấn nền Glow Foundation",
        variant: "Tone Tự Nhiên",
        price: 350000,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80",
      },
    ],
    steps: [
      {
        id: "st-1",
        title: "Chờ xác nhận",
        time: "17/03/2026 14:30",
        note: "Đơn hàng đã được tạo",
        done: true,
      },
      {
        id: "st-2",
        title: "Đã xác nhận",
        time: "17/03/2026 15:00",
        note: "GlowCosmetics đã xác nhận đơn hàng",
        done: true,
      },
      {
        id: "st-3",
        title: "Đang đóng gói",
        time: "17/03/2026 16:30",
        note: "Đơn hàng đang được đóng gói",
        done: true,
      },
      {
        id: "st-4",
        title: "Đang giao",
        time: "17/03/2026 18:00",
        note: "Đơn hàng đã được giao cho đơn vị vận chuyển",
        done: true,
        current: true,
      },
    ],
  },
  {
    id: "GLU-20260314-084",
    placedAt: "Đặt lúc: 14/03/2026 09:15",
    status: "delivered",
    recipient: {
      name: "Minh Anh",
      phone: "0988001122",
      address: "45 Nguyễn Trãi, Quận 5, TP. Hồ Chí Minh",
    },
    payment: {
      method: "Thanh toán: Ví điện tử",
      status: "Đã thanh toán",
    },
    shipping: {
      provider: "Vận chuyển: GHTK",
      trackingCode: "GHTK9812765",
    },
    summary: {
      shippingFee: 30000,
      discount: 15000,
    },
    items: [
      {
        id: "itm-03",
        name: "Nước tẩy trang Micellar",
        variant: "Dung tích 500ml",
        price: 245000,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1556228578-dd6f3a79f5f0?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "itm-04",
        name: "Serum Hyaluronic",
        variant: "30ml",
        price: 307500,
        quantity: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=300&q=80",
      },
    ],
    steps: [
      {
        id: "st-5",
        title: "Chờ xác nhận",
        time: "14/03/2026 09:15",
        note: "Đơn hàng đã được tạo",
        done: true,
      },
      {
        id: "st-6",
        title: "Đã giao",
        time: "15/03/2026 13:20",
        note: "Đơn hàng đã giao thành công",
        done: true,
        current: true,
      },
    ],
  },
  {
    id: "GLU-20260310-052",
    placedAt: "Đặt lúc: 10/03/2026 11:00",
    status: "canceled",
    recipient: {
      name: "Linh Chi",
      phone: "0914556677",
      address: "212 Hoàng Hoa Thám, Bình Thạnh, TP. Hồ Chí Minh",
    },
    payment: {
      method: "Thanh toán: COD",
      status: "Đã hủy",
    },
    shipping: {
      provider: "Vận chuyển: N/A",
      trackingCode: "-",
    },
    summary: {
      shippingFee: 0,
      discount: 0,
    },
    items: [
      {
        id: "itm-05",
        name: "Kem chống nắng Skin Shield",
        variant: "SPF50+ PA++++",
        price: 520000,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80",
      },
    ],
    steps: [
      {
        id: "st-7",
        title: "Đơn đã hủy",
        time: "10/03/2026 12:10",
        note: "Đơn hàng đã được hủy theo yêu cầu",
        done: true,
        current: true,
      },
    ],
  },
];

export default function MyOrder() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [keyword, setKeyword] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(
    orderData[0]?.id ?? null
  );

  const orders = useMemo(() => {
    const query = keyword.trim().toLowerCase();

    return orderData.filter((order) => {
      const matchStatus = filter === "all" || order.status === filter;
      const matchQuery =
        query.length === 0 ||
        order.id.toLowerCase().includes(query) ||
        order.items.some((item) => item.name.toLowerCase().includes(query));

      return matchStatus && matchQuery;
    });
  }, [filter, keyword]);

  return (
    <section className="space-y-4">
      <div className="space-y-4 border border-rose-100/70 bg-rose-50/30 p-4 sm:p-5">
        <header>
          <h2 className="text-2xl font-bold leading-tight text-slate-800">
            Quản lý đơn hàng
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Xem và theo dõi tất cả các đơn hàng của bạn tại GlowUp.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-2.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`h-9 border px-4 text-xs font-semibold transition-all duration-300 ${
                filter === tab.key
                  ? "border-pink-600 bg-pink-600 text-white shadow-(--ui-shadow-soft)"
                  : "border-rose-100 bg-white text-slate-600 hover:border-pink-200 hover:bg-white hover:text-slate-700 hover:shadow-(--ui-shadow-soft)"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm..."
            className="h-11 w-full border border-rose-100 bg-white pl-10 pr-4 text-sm text-slate-600 outline-none transition-colors placeholder:text-slate-500 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/40"
          />
        </div>
      </div>

      <div className="space-y-3 bg-white">
        {orders.length === 0 ? (
          <div className="bg-white px-5 py-7 text-sm text-slate-500">
            Không tìm thấy đơn hàng phù hợp.
          </div>
        ) : (
          orders.map((order) => {
            const isExpanded = expandedId === order.id;
            const status = statusMeta[order.status];
            const StatusIcon = status.icon;

            const subTotal = getSubTotal(order.items);
            const total =
              subTotal + order.summary.shippingFee - order.summary.discount;

            return (
              <article
                key={order.id}
                className="overflow-hidden border border-rose-100 bg-white shadow-[0_6px_14px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-rose-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center bg-rose-50 text-rose-300">
                      <Box className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <p className="text-base font-semibold text-slate-800">
                          {order.id}
                        </p>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold ${status.badgeClass}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {status.label}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {order.placedAt}
                      </p>
                    </div>
                  </div>

                  <div className="ml-auto flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Tổng tiền
                      </p>
                      <p className="mt-1 text-xl font-bold leading-none text-pink-600 sm:text-2xl">
                        {formatVnd(total)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId((current) =>
                          current === order.id ? null : order.id
                        )
                      }
                      aria-label={isExpanded ? "Thu gọn" : "Mở rộng"}
                      className="inline-flex h-8 w-8 items-center justify-center text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <>
                    <div className="h-px bg-slate-100" />

                    <div className="px-4 py-5 sm:px-5">
                      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_360px]">
                        <div className="space-y-4 bg-white p-4 sm:p-5">
                          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                            Sản phẩm
                          </h4>

                          <div className="space-y-2.5">
                            {order.items.map((item) => (
                              <div
                                key={`${order.id}-${item.id}`}
                                className="flex flex-col gap-3 bg-rose-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                              >
                                <div className="flex min-w-0 items-center gap-3">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="h-11 w-11 object-cover"
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

                          <div className="bg-rose-50 p-5">
                            <div className="space-y-2 text-sm text-slate-600">
                              <div className="flex items-center justify-between gap-4">
                                <span>Tạm tính</span>
                                <span className="text-slate-700">
                                  {formatVnd(subTotal)}
                                </span>
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

                        <div className="space-y-4">
                          <div className="border border-rose-100 bg-white p-4 sm:p-5">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                              Thông tin nhận hàng
                            </h4>

                            <div className="mt-3 bg-rose-50 p-4">
                              <div className="flex items-start gap-2.5">
                                <MapPin className="mt-0.5 h-4 w-4 text-pink-500" />
                                <div>
                                  <p className="text-sm font-semibold text-slate-800">
                                    {order.recipient.name} •{" "}
                                    {order.recipient.phone}
                                  </p>
                                  <p className="mt-1 text-sm text-slate-600">
                                    {order.recipient.address}
                                  </p>
                                </div>
                              </div>

                              <div className="my-4 h-px bg-rose-100/50" />

                              <div className="flex items-start gap-2.5">
                                <CreditCard className="mt-0.5 h-4 w-4 text-pink-500" />
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
                                <Truck className="mt-0.5 h-4 w-4 text-pink-500" />
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

                          <div className="border border-rose-100 bg-white p-4 sm:p-5">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                              Hành trình đơn hàng
                            </h4>

                            <div className="mt-3 space-y-3 bg-rose-50 p-4">
                              {order.steps.map((step, index) => (
                                <div
                                  key={step.id}
                                  className="relative flex gap-3"
                                >
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
                                        step.current
                                          ? "text-slate-800"
                                          : "text-slate-600"
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
                  </>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
