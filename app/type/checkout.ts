export type ShippingMethod = "standard" | "express";

export type PaymentMethod = "ewallet" | "cod" | "bank" | "qr";

export type CheckoutFlowState = {
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
};
