import { useMemo } from "react";

import {
  getShippingFeeByMethod,
  resolveCheckoutFlowState,
} from "../services/checkout";
import type { PaymentMethod } from "../type/checkout";

export const useCheckout = (
  locationState: unknown,
  fallbackPayment: PaymentMethod = "cod"
) => {
  const data = useMemo(
    () => resolveCheckoutFlowState(locationState, fallbackPayment),
    [locationState, fallbackPayment]
  );

  return {
    ...data,
    shippingFee: getShippingFeeByMethod(data.shippingMethod),
  };
};

export default useCheckout;
