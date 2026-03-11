import { baseApi } from "@/shared/api/baseApi";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";
import type {
  Product,
  ProductCategory,
  ProductsResponseDto,
} from "../model/types";

/**
 * Доменний API для роботи з продуктами каталогу.
 *
 * - Живе в entities-шарі, тому що оперує даними однієї сутності — Product.
 * - Інкапсулює усі HTTP-запити, пов'язані з продуктами.
 * - Надає типізовані RTK Query хуки для вищих шарів (features, widgets, pages).
 *
 * RTK Query відповідає за:
 * - кешування результатів запитів;
 * - автоматичні рефети;
 * - статуси завантаження та помилок.
 */
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Отримання списку продуктів за категорією.
     *
     * - Викликає `GET /products?category=<category>`.
     * - Повертає масив доменних моделей `Product` для обраної категорії.
     * - `transformResponse` відділяє транспортний формат (`ProductsResponseDto`)
     *   від доменної моделі, щоб вищі шари працювали лише з `Product[]`.
     */
    getProducts: builder.query<Product[], ProductCategory>({
      query: (category) => ({
        url: apiRoutes.products,
        params: { category },
      }),
      transformResponse: (response: ProductsResponseDto) => response.data,
      providesTags: (_result, _error, category) => [
        { type: "Product", id: category },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productApi;

