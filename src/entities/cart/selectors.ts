import type { RootState } from "@/app/store";

const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = (state: RootState) =>
  selectCartState(state).items;

export const selectCartCount = (state: RootState) =>
  selectCartState(state).items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: RootState) =>
  selectCartState(state).items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

export const selectCartRestaurant = (state: RootState) =>
  selectCartState(state).restaurant;
