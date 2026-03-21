export type OrderStatus = "pending" | "shipping" | "completed" | "cancelled";

export interface Order {
  id: string;
  code: string;
  customerName: string;
  phone: string;
  createdAt: string;
  totalAmount: number;
  status: OrderStatus;
}
