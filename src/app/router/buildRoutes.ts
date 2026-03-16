import type { RouteObject } from "react-router-dom";
import type { ComponentType } from "react";
import { Mutex } from "async-mutex";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { authCheckLoader } from "./authCheckLoader";
import type { RouteMeta } from "./types";

type PageKey = keyof typeof frontRoutes.pages;

const refreshMutex = new Mutex();
const authLoader = authCheckLoader({ refreshMutex });

/** Map frontRoutes page keys to glob paths (relative to this file). */
const PAGE_KEY_TO_GLOB_PATH: Record<PageKey, string> = {
  HomePage: "home/HomePage.tsx",
  LoginPage: "login/LoginPage.tsx",
  ProfilePage: "profile/ProfilePage.tsx",
  CartPage: "cart/CartPage.tsx",
  CheckoutPage: "checkout/CheckoutPage.tsx",
  ForbiddenPage: "forbiddenPage/ForbiddenPage.tsx",
  NotFoundPage: "notFoundPage/NotFoundPage.tsx",
};

const pages = import.meta.glob<{ default: ComponentType }>("../pages/**/*.tsx");

export function buildChildRoutes(): RouteObject[] {
  const routes: RouteObject[] = [];
  let notFoundRoute: RouteObject | null = null;

  Object.entries(frontRoutes.pages).forEach(([pageKey, rawConfig]) => {
    const page = pageKey as PageKey;
    const globPath = PAGE_KEY_TO_GLOB_PATH[page];
    const pageEntry = Object.entries(pages).find(([key]) => key.endsWith(globPath));

    if (!pageEntry) {
      throw new Error(`Missing page module for ${page}: ${globPath}`);
    }

    const loadPage = pageEntry[1];

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

  if (notFoundRoute) {
    routes.push(notFoundRoute);
  }

  return routes;
}
