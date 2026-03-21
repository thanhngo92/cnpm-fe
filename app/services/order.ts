import { orderData } from "../data/order";
import type { Order, OrderStatus } from "../type/order";

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").trim();
const ORDERS_ENDPOINT = (import.meta.env.VITE_ORDERS_ENDPOINT ?? "/orders").trim();

const asString = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
};

const asNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
};

const normalizeOrderStatus = (value: unknown): OrderStatus => {
  const raw = asString(value, "pending").toLowerCase();

  if (raw === "delivered") {
    return "completed";
  }

  if (raw === "canceled") {
    return "cancelled";
  }

  if (raw === "pending" || raw === "shipping" || raw === "completed" || raw === "cancelled") {
    return raw;
  }

  return "pending";
};

const toOrder = (raw: unknown, index: number): Order => {
  const item = (raw ?? {}) as Record<string, unknown>;
  const id = asString(item.id, `order-${index + 1}`);

  return {
    id,
    code: asString(item.code ?? item.orderCode, `DH-${String(index + 1).padStart(3, "0")}`),
    customerName: asString(item.customerName ?? item.fullName ?? item.customer, "Khach hang"),
    phone: asString(item.phone ?? item.phoneNumber),
    createdAt: asString(item.createdAt ?? item.orderDate ?? new Date().toISOString()),
    totalAmount: asNumber(item.totalAmount ?? item.total ?? item.amount),
    status: normalizeOrderStatus(item.status),
  };
};

const normalizeOrders = (payload: unknown): Order[] | null => {
  if (Array.isArray(payload)) {
    return payload.map(toOrder);
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data?: unknown }).data)
  ) {
    return (payload as { data: unknown[] }).data.map(toOrder);
  }

  return null;
};

export const getOrders = async (): Promise<Order[]> => {
  if (!API_BASE_URL) {
    return orderData;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${ORDERS_ENDPOINT}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Order API is unavailable");
    }

    const payload: unknown = await response.json();
    return normalizeOrders(payload) ?? orderData;
  } catch {
    return orderData;
  }
};
