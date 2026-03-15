export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "delivered"
  | "cancelled";

export type OrderItemProduct = {
  quantity: number;
  title: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  createdAt: string;
  total: number;
  deliveryAddress?: string;
  /** API returns restaurant as string (e.g. "sushi") */
  restaurant?: string;
  items?: OrderItemProduct[];
};
