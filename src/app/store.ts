import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../shared/api/baseApi";

/**
 * Глобальний Redux store для всього додатку.
 *
 * Відповідальність store:
 * - зберігати глобальний стан;
 * - підключати RTK Query (baseApi) як джерело кешу та статусів запитів;
 * - бути єдиною точкою конфігурації middleware.
 *
 * Store живе в app-шарі (FSD), тому що:
 * - саме app відповідає за ініціалізацію додатку;
 * - вищі шари (pages/widgets/features/entities) не повинні знати
 *   про деталі конфігурації стора;
 * - це дозволяє централізовано додавати нові reducers/middleware.
 */
export const store = configureStore({
  reducer: {
    /**
     * Підключення редюсера RTK Query.
     *
     * baseApi.reducer зберігає кеш запитів, статуси та метадані.
     * Підключаємо його саме тут, у store, щоб:
     * - мати єдине джерело правди для всіх API-запитів;
     * - дозволити будь-якому шарові вище використовувати хуки RTK Query,
     *   не турбуючись про внутрішню реалізацію.
     */
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    /**
     * Підключення middleware RTK Query.
     *
     * Забезпечує:
     * - виконання запитів;
     * - оновлення кешу;
     * - рефети та інші побічні ефекти.
     *
     * Саме app-шар відповідає за таку інфраструктурну конфігурацію,
     * а бізнес-логіка у вищих шарах працює вже з готовими хуками API.
     */
    getDefaultMiddleware().concat(baseApi.middleware),
});

/**
 * Кореневий тип стану Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип dispatch-функції Redux store.
 */
export type AppDispatch = typeof store.dispatch;

