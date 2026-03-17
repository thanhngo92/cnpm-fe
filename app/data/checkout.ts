import type { PaymentMethod, ShippingMethod } from "../type/checkout";

export const shippingFeesByMethod: Record<ShippingMethod, number> = {
  standard: 30000,
  express: 50000,
};

export const paymentLabels: Record<PaymentMethod, string> = {
  cod: "Thanh toán khi nhận hàng (COD)",
  ewallet: "Thanh toán ví điện tử",
  bank: "Thanh toán ngân hàng",
  qr: "Thanh toán QR Code",
};

export const paymentProviderLabels: Record<Exclude<PaymentMethod, "cod">, string> = {
  ewallet: "MoMo / ZaloPay",
  bank: "Vietcombank QRPay",
  qr: "VNPAY-QR",
};
