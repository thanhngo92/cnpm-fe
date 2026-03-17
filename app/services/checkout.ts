import {
  paymentLabels,
  paymentProviderLabels,
  shippingFeesByMethod,
} from "../data/checkout";
import type { CheckoutFlowState, PaymentMethod, ShippingMethod } from "../type/checkout";

export const normalizeShippingMethod = (value: unknown): ShippingMethod => {
  return value === "express" ? "express" : "standard";
};

export const normalizePaymentMethod = (
  value: unknown,
  fallback: PaymentMethod = "cod"
): PaymentMethod => {
  return value === "ewallet" || value === "cod" || value === "bank" || value === "qr"
    ? value
    : fallback;
};

export const resolveCheckoutFlowState = (
  state: unknown,
  fallbackPayment: PaymentMethod = "cod"
): CheckoutFlowState => {
  if (!state || typeof state !== "object") {
    return {
      shippingMethod: "standard",
      paymentMethod: fallbackPayment,
    };
  }

  const next = state as {
    shippingMethod?: unknown;
    paymentMethod?: unknown;
  };

  return {
    shippingMethod: normalizeShippingMethod(next.shippingMethod),
    paymentMethod: normalizePaymentMethod(next.paymentMethod, fallbackPayment),
  };
};

export const getShippingFeeByMethod = (method: ShippingMethod) => {
  return shippingFeesByMethod[method];
};

export const getPaymentLabel = (method: PaymentMethod) => {
  return paymentLabels[method];
};

export const getPaymentProviderLabel = (method: Exclude<PaymentMethod, "cod">) => {
  return paymentProviderLabels[method];
};
