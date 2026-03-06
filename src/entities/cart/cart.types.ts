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
 */
export type CartState = {
  items: CartItem[];
};
