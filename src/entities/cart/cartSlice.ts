import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/entities/product";
import type { CartItem, CartState } from "./cart.types";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: { payload: Product }) {
      const product = action.payload;
      const existing = state.items.find((item) => item._id === product._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        const newItem: CartItem = {
          _id: product._id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        };
        state.items.push(newItem);
      }
    },

    increaseQuantity(state, action: { payload: string }) {
      const _id = action.payload;
      const item = state.items.find((i) => i._id === _id);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(state, action: { payload: string }) {
      const _id = action.payload;
      const item = state.items.find((i) => i._id === _id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i._id !== _id);
        }
      }
    },

    removeFromCart(state, action: { payload: string }) {
      const _id = action.payload;
      state.items = state.items.filter((item) => item._id !== _id);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
