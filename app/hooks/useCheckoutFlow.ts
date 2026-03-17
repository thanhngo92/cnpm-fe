import { useMemo } from "react";

import {
  getShippingFeeByMethod,
  resolveCheckoutFlowState,
} from "../services/checkout";
import type { PaymentMethod } from "../type/checkout";

export const useCheckoutFlow = (
  locationState: unknown,
  fallbackPayment: PaymentMethod = "cod"
) => {
  const flow = useMemo(
    () => resolveCheckoutFlowState(locationState, fallbackPayment),
    [locationState, fallbackPayment]
  );

  return {
    ...flow,
    shippingFee: getShippingFeeByMethod(flow.shippingMethod),
  };
};

export default useCheckoutFlow;
