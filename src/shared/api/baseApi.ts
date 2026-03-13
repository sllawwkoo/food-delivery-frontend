import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import type {
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import type { RootState } from "@/app/store/store";
import { logout, setCredentials } from "@/features/auth/api/authSlice";

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

const baseUrl = import.meta.env.VITE_API_URL;

if (!baseUrl) {
  throw new Error("VITE_API_URL is not defined");
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const originalUrl = typeof args === "string" ? args : args.url;

    // 401 на auth-ендпоїнтах (login/register/logout/refresh) віддаємо наверх без auto-refresh
    // щоб форми могли коректно показати помилки, а не ловити глобальний редірект
    if (
      originalUrl === apiRoutes.auth.login ||
      originalUrl === apiRoutes.auth.register ||
      originalUrl === apiRoutes.auth.logout ||
      originalUrl === apiRoutes.auth.refresh
    ) {
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: apiRoutes.auth.refresh,
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data && typeof refreshResult.data === "object") {
      const data = (refreshResult.data as { data?: { accessToken?: string; user?: unknown } }).data;

      if (data?.accessToken) {
        api.dispatch(
          setCredentials({
            user: data.user ?? null,
            accessToken: data.accessToken,
          }),
        );

        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
        window.location.href = frontRoutes.pages.LoginPage.navigationPath;
      }
    } else {
      api.dispatch(logout());
      window.location.href = frontRoutes.pages.LoginPage.navigationPath;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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
 * Простий union-тип для узгодженого використання рядкових літералів
 * по всьому проєкту без складних умовних типів.
 */
export type BaseApiTag = "Product" | "User" | "Order";

