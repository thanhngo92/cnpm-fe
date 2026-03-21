import { useEffect, useMemo, useState } from "react";
import { Search, Edit, Trash2 } from "lucide-react";
import { getOrders } from "../../../services/order";
import type { Order, OrderStatus } from "../../../type/order";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import DeleteModal from "../modal/DeleteModal";
import OrderDetail, { type OrderRecord } from "./OrderDetail";
import OrderModal from "../modal/OrderModal";

function formatPrice(value: number) {
  return `${value.toLocaleString("vi-VN")} đ`;
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("vi-VN");
}

const statusMeta: Record<OrderStatus, { label: string; badgeClass: string }> = {
  pending: {
    label: "Chờ xác nhận",
    badgeClass: "bg-amber-50 text-amber-700",
  },
  shipping: {
    label: "Đang giao",
    badgeClass: "bg-sky-50 text-sky-700",
  },
  completed: {
    label: "Hoàn tất",
    badgeClass: "bg-pink-50 text-pink-700",
  },
  cancelled: {
    label: "Đã hủy",
    badgeClass: "bg-slate-100 text-slate-600",
  },
};

const unknownStatusMeta = {
  label: "Không xác định",
  badgeClass: "bg-slate-100 text-slate-600",
};

type FilterKey = "all" | OrderStatus;

const statusTabs: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "shipping", label: "Đang giao" },
  { key: "completed", label: "Hoàn tất" },
  { key: "cancelled", label: "Đã hủy" },
];

const validStatuses: ReadonlySet<OrderStatus> = new Set([
  "pending",
  "shipping",
  "completed",
  "cancelled",
]);

function normalizeStatus(status?: string): OrderStatus | null {
  if (!status) {
    return null;
  }

  const value = status.toLowerCase();

  if (value === "delivered") {
    return "completed";
  }

  if (value === "canceled") {
    return "cancelled";
  }

  if (validStatuses.has(value as OrderStatus)) {
    return value as OrderStatus;
  }

  return null;
}

function getStatusMeta(status?: string) {
  const normalized = normalizeStatus(status);
  return normalized ? statusMeta[normalized] : unknownStatusMeta;
}

function getOrderSearchText(item: Order) {
  const meta = getStatusMeta(item.status);

  return [item.code, item.customerName, item.phone, meta.label]
    .map((value) => (value ?? "").toLowerCase())
    .join(" ");
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setIsLoading(true);

        const orderData = await getOrders();

        if (!mounted) {
          return;
        }

        setOrders(orderData);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const orderCountByStatus = useMemo(() => {
    return orders.reduce<Record<OrderStatus, number>>(
      (acc, item) => {
        const status = normalizeStatus(item.status);

        if (status) {
          acc[status] += 1;
        }

        return acc;
      },
      {
        pending: 0,
        shipping: 0,
        completed: 0,
        cancelled: 0,
      }
    );
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = keyword.trim().toLowerCase();

    return orders.filter((item) => {
      const normalized = normalizeStatus(item.status);
      const matchStatus = filter === "all" || normalized === filter;
      const matchQuery =
        query.length === 0 || getOrderSearchText(item).includes(query);

      return matchStatus && matchQuery;
    });
  }, [orders, keyword, filter]);

  const openDeleteModal = (order: Order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const openOrderDetail = (order: Order) => {
    // Map admin Order → OrderRecord (items/steps rỗng cho đến khi BE có endpoint detail)
    setSelectedOrder({
      id: order.code ?? order.id,
      placedAt: order.createdAt
        ? `Đặt lúc: ${new Date(order.createdAt).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}`
        : "-",
      status:
        order.status === "completed"
          ? "delivered"
          : order.status === "cancelled"
            ? "canceled"
            : (order.status as "pending" | "shipping"),
      recipient: {
        name: order.customerName ?? "-",
        phone: order.phone ?? "-",
        address: "-",
      },
      payment: { method: "Thanh toán: -", status: "-" },
      shipping: { provider: "Vận chuyển: -", trackingCode: "-" },
      summary: { shippingFee: 0, discount: 0 },
      items: [],
      steps: [],
    });
    setIsOrderDetailOpen(true);
  };

  const openOrderModal = (order: Order) => {
    setOrderToEdit(order);
    setIsOrderModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  return (
    <section className="space-y-5">
      <div className="space-y-4 border border-pink-100 bg-white p-4 shadow-[0_8px_24px_rgba(236,72,153,0.05)] sm:p-5">
        <CardHeader className="space-y-4 p-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 space-y-1.5">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Quản lý đơn hàng
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6 text-slate-600">
                Theo dõi thông tin đơn hàng, khách hàng, tổng tiền và trạng thái
                xử lý.
              </CardDescription>
            </div>
          </div>

          <div className="group relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-pink-500" />
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm theo mã đơn, khách hàng, số điện thoại..."
              className="h-11 border-slate-200 bg-white pl-9 text-slate-700 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {statusTabs.map((tab) => {
              const count =
                tab.key === "all" ? orders.length : orderCountByStatus[tab.key];
              const isActive = filter === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`inline-flex h-9 items-center gap-2 border px-3.5 text-xs font-semibold transition-colors duration-200 sm:px-4 ${
                    isActive
                      ? "border-pink-300 bg-pink-50 text-pink-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-pink-200 hover:text-slate-700"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] tabular-nums sm:text-[11px] ${
                      isActive ? "text-pink-500" : "text-slate-400"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
      </div>

      <div className="border border-pink-100 bg-white shadow-[0_10px_28px_rgba(236,72,153,0.04)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-280 table-fixed text-[13px] sm:text-sm">
              <thead>
                <tr className="bg-pink-50/60 text-left text-slate-500">
                  <th
                    style={{ width: "16%" }}
                    className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Mã đơn
                  </th>
                  <th
                    style={{ width: "18%" }}
                    className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Khách hàng
                  </th>
                  <th
                    style={{ width: "13%" }}
                    className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Số điện thoại
                  </th>
                  <th
                    style={{ width: "14%" }}
                    className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Ngày đặt
                  </th>
                  <th
                    style={{ width: "14%" }}
                    className="px-3.5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide"
                  >
                    Trạng thái
                  </th>
                  <th
                    style={{ width: "16%" }}
                    className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wide"
                  >
                    Tổng tiền
                  </th>
                  <th
                    style={{ width: "9%" }}
                    className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wide"
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {isLoading && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm text-slate-400"
                    >
                      Đang tải dữ liệu đơn hàng...
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredOrders.map((item) => {
                    const meta = getStatusMeta(item.status);

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-pink-50 transition-colors duration-200 last:border-b-0 hover:bg-pink-50/30"
                      >
                        <td className="px-4 py-3.5 align-middle">
                          <button
                            type="button"
                            onClick={() => openOrderDetail(item)}
                            title={item.code}
                            className="block truncate font-medium text-slate-900 transition-colors duration-200 hover:text-pink-600"
                          >
                            {item.code}
                          </button>
                        </td>

                        <td className="px-3.5 py-3.5 align-middle text-[13px] sm:text-sm">
                          <span
                            title={item.customerName}
                            className="block truncate text-slate-700"
                          >
                            {item.customerName}
                          </span>
                        </td>

                        <td className="px-3.5 py-3.5 align-middle text-[13px] sm:text-sm">
                          <span className="block truncate text-slate-600">
                            {item.phone || "-"}
                          </span>
                        </td>

                        <td className="px-3.5 py-3.5 align-middle text-[13px] sm:text-sm">
                          <span className="block truncate text-slate-600">
                            {formatDate(item.createdAt)}
                          </span>
                        </td>

                        <td className="px-3.5 py-3.5 text-center align-middle">
                          <span
                            className={`inline-flex min-h-8 items-center justify-center px-3 py-1 text-xs font-semibold ${meta.badgeClass}`}
                          >
                            {meta.label}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-center align-middle font-semibold tabular-nums text-slate-800">
                          {formatPrice(item.totalAmount ?? 0)}
                        </td>

                        <td className="px-4 py-3.5 text-right align-middle">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              title="Cập nhật đơn hàng"
                              onClick={() => openOrderModal(item)}
                              className="inline-flex items-center gap-2 rounded p-1.5 text-slate-600 transition-colors duration-200 hover:bg-pink-50 hover:text-pink-600"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              type="button"
                              title="Xóa đơn hàng"
                              onClick={() => openDeleteModal(item)}
                              className="inline-flex items-center gap-2 rounded p-1.5 text-slate-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                {!isLoading && filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-xs text-slate-400 sm:text-sm"
                    >
                      Không tìm thấy đơn hàng phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </div>

      <DeleteModal
        open={isDeleteModalOpen}
        title="Xóa đơn hàng"
        description="Đơn hàng này sẽ bị gỡ khỏi danh sách quản trị."
        confirmText="Xóa đơn hàng"
        onClose={closeDeleteModal}
        onConfirm={() => {}}
      />

      <OrderDetail
        open={isOrderDetailOpen}
        order={selectedOrder}
        onClose={() => { setIsOrderDetailOpen(false); setSelectedOrder(null); }}
      />

      <OrderModal
        open={isOrderModalOpen}
        orderCode={orderToEdit?.code}
        initialValues={
          orderToEdit
            ? {
                customerName: orderToEdit.customerName,
                phone: orderToEdit.phone,
                status: orderToEdit.status,
              }
            : undefined
        }
        onClose={() => { setIsOrderModalOpen(false); setOrderToEdit(null); }}
        onSubmit={() => {}}
      />
    </section>
  );
}
