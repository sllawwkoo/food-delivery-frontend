import { baseApi } from "@/shared/api/baseApi";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";
import type { Order } from "../model/types";

type MyOrdersResponse = { data?: Order[] } | Order[];

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyOrders: build.query<Order[], void>({
      query: () => ({
        url: apiRoutes.ordersMy,
        method: "GET",
      }),
      transformResponse: (response: MyOrdersResponse): Order[] =>
        Array.isArray(response) ? response : response.data ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyOrdersQuery } = orderApi;
