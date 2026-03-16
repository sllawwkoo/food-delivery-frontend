import type { RouteObject } from "react-router-dom";
import { Mutex } from "async-mutex";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { authCheckLoader } from "./authCheckLoader";
import type { RouteMeta } from "./types";

const refreshMutex = new Mutex();
const authLoader = authCheckLoader({ refreshMutex });

const pages = {
  HomePage: () => import("@/pages/home/HomePage"),
  LoginPage: () => import("@/pages/login/LoginPage"),
  ProfilePage: () => import("@/pages/profile/ProfilePage"),
  CartPage: () => import("@/pages/cart/CartPage"),
  CheckoutPage: () => import("@/pages/checkout/CheckoutPage"),
  ForbiddenPage: () => import("@/pages/forbiddenPage/ForbiddenPage"),
  NotFoundPage: () => import("@/pages/notFoundPage/NotFoundPage"),
};

export function buildChildRoutes(): RouteObject[] {
  const routes: RouteObject[] = [];
  let notFoundRoute: RouteObject | null = null;

  Object.entries(frontRoutes.pages).forEach(([pageKey, rawConfig]) => {
    const loadPage = pages[pageKey as keyof typeof pages];

    const config = {
      path: rawConfig.path,
      meta: rawConfig.meta as RouteMeta | undefined,
    };

    const route: RouteObject = {
      path: config.path,
      loader: () =>
        authLoader({
          path: config.path,
          meta: config.meta,
        } as RouteObject),

      lazy: async () => {
        const module = await loadPage();
        return { Component: module.default };
      },
    };

    if (config.path === "*") {
      notFoundRoute = route;
    } else {
      routes.push(route);
    }
  });

  if (notFoundRoute) routes.push(notFoundRoute);

  return routes;
}