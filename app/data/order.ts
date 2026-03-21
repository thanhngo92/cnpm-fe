import type { Order } from "../type/order";

export const orderData: Order[] = [
  {
    id: "ord-1",
    code: "GLW-20260401-001",
    customerName: "Nguyen Thanh An",
    phone: "0901234567",
    createdAt: "2026-04-01T10:20:00.000Z",
    totalAmount: 780000,
    status: "pending",
  },
  {
    id: "ord-2",
    code: "GLW-20260401-002",
    customerName: "Tran Minh Thu",
    phone: "0912345678",
    createdAt: "2026-04-01T12:45:00.000Z",
    totalAmount: 420000,
    status: "shipping",
  },
  {
    id: "ord-3",
    code: "GLW-20260402-003",
    customerName: "Le Quoc Bao",
    phone: "0923456789",
    createdAt: "2026-04-02T08:15:00.000Z",
    totalAmount: 1250000,
    status: "completed",
  },
  {
    id: "ord-4",
    code: "GLW-20260402-004",
    customerName: "Pham Hoai Nam",
    phone: "0934567890",
    createdAt: "2026-04-02T15:10:00.000Z",
    totalAmount: 315000,
    status: "cancelled",
  },
  {
    id: "ord-5",
    code: "GLW-20260403-005",
    customerName: "Do Khanh Linh",
    phone: "0945678901",
    createdAt: "2026-04-03T09:40:00.000Z",
    totalAmount: 960000,
    status: "completed",
  },
];
