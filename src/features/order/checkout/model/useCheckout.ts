import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/entities/cart";
import { usePlaceOrderMutation } from "../../placeOrder/api/placeOrderApi";
import type { CheckoutFormValues } from "@/shared/lib/validation/checkoutSchema";
import type { PlaceOrderPayload } from "../../placeOrder/model/types";

export function useCheckout() {
  const cartItems = useSelector(selectCartItems);
  const [placeOrderMutation, { isLoading }] = usePlaceOrderMutation();

  const items = useMemo(
    () =>
      cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    [cartItems]
  );

  const placeOrder = useCallback(
    async (customer: CheckoutFormValues) => {
      const payload: PlaceOrderPayload = {
        items,
        customer,
      };

      return placeOrderMutation(payload).unwrap();
    },
    [items, placeOrderMutation]
  );

  return {
    placeOrder,
    isLoading,
  };
}

