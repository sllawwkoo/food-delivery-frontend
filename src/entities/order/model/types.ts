export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  status: OrderStatus;
  createdAt: string;
  total: number;
  deliveryAddress?: string;
  itemsCount?: number;
};
