import { baseApi } from "@/shared/api/baseApi";
import type { PlaceOrderPayload, PlaceOrderResponse } from "../model/types";

export const placeOrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    placeOrder: build.mutation<PlaceOrderResponse, PlaceOrderPayload>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { usePlaceOrderMutation } = placeOrderApi;

