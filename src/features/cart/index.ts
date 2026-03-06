export {
  cartReducer,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from "@/entities/cart";

export type { CartItem, CartState } from "@/entities/cart";
