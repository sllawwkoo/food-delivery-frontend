import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Базовий RTK Query API-клієнт для всього фронтенду.
 *
 * - Інкапсулює налаштування HTTP-клієнта (baseUrl, credentials).
 * - Дає єдину точку входу для опису доменних endpoints (products, users, orders).
 * - Забезпечує узгоджений кеш, інвалідацію та типи тегів для всіх сутностей.
 *
 * Розташований у shared/api шарі згідно з FSD:
 * - shared не залежить від вищих шарів (entities, features, widgets, pages, app).
 * - Вищі шари можуть інжектити власні endpoints на основі цього baseApi.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    /**
     * Базова URL-адреса бекенду.
     *
     * Очікується, що змінна середовища VITE_API_URL буде вказана
     * у налаштуваннях Vite (наприклад, через .env файли).
     */
    baseUrl: import.meta.env.VITE_API_URL as string,
    /**
     * `credentials: "include"` необхідний для роботи з httpOnly cookie
     * (наприклад, refresh token у /api/auth/refresh).
     *
     * Це гарантує, що браузер автоматично додає відповідні cookie
     * до кожного запиту, де це дозволено CORS-настройками бекенду.
     */
    credentials: "include",
  }),
  /**
   * Список доменних тегів для кешу RTK Query.
   *
   * - "Product" — дані каталогу продуктів.
   * - "User"    — дані поточного користувача та автентифікації.
   * - "Order"   — дані замовлень.
   *
   * TagTypes дозволяють:
   * - Інвалідувати пов'язані запити після мутацій.
   * - Організувати кеш навколо бізнес-сутностей, а не окремих запитів.
   */
  tagTypes: ["Product", "User", "Order"],
  endpoints: () => ({}),
});

/**
 * Доступні типи тегів кешу baseApi.
 *
 * Корисно для типізації tag-списків при оголошенні endpoints
 * у вищих шарах (entities/*), не дублюючи рядкові літерали.
 */
export type BaseApiTag = (typeof baseApi)["util"]["getRunningQueriesThunk"] extends (
  ...args: infer _A
) => infer _R
  ? "Product" | "User" | "Order"
  : never;

