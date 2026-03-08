/**
 * Елемент кошика. Відповідає полям продукту з бекенду (MongoDB) + quantity.
 */
export type CartItem = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

/**
 * Стан кошика в Redux.
 * restaurant — назва/категорія закладу, з якого додано товари (одна за раз).
 */
export type CartState = {
  items: CartItem[];
  restaurant: string | null;
};
