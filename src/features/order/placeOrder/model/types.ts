export type PlaceOrderPayload = {
  items: {
    productId: string;
    quantity: number;
  }[];
  customer: {
    name: string;
    phone: string;
    address: string;
  };
};

export type PlaceOrderResponse = {
  _id: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  total: number;
  status: string;
};
