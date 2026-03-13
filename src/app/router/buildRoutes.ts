import type { RouteObject } from "react-router-dom";
import type { ComponentType } from "react";
import { Mutex } from "async-mutex";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { authCheckLoader } from "./authCheckLoader";
import type { RouteMeta } from "./types";

type PageKey = keyof typeof frontRoutes.pages;

const refreshMutex = new Mutex();
const authLoader = authCheckLoader({ refreshMutex });

/** Map frontRoutes page keys to glob paths (folder names differ from keys). */
const PAGE_KEY_TO_GLOB_PATH: Record<PageKey, string> = {
  HomePage: "/src/pages/home/HomePage.tsx",
  LoginPage: "/src/pages/login/LoginPage.tsx",
  ProfilePage: "/src/pages/profile/ProfilePage.tsx",
  CartPage: "/src/pages/cart/CartPage.tsx",
  CheckoutPage: "/src/pages/checkout/CheckoutPage.tsx",
  ForbiddenPage: "/src/pages/forbiddenPage/ForbiddenPage.tsx",
  NotFoundPage: "/src/pages/notFoundPage/NotFoundPage.tsx",
};

const pages = import.meta.glob<{ default: ComponentType }>("/src/pages/**/*.tsx");

export function buildChildRoutes(): RouteObject[] {
  const routes: RouteObject[] = [];
  let notFoundRoute: RouteObject | null = null;

  Object.entries(frontRoutes.pages).forEach(([pageKey, rawConfig]) => {
    const page = pageKey as PageKey;
    const globPath = PAGE_KEY_TO_GLOB_PATH[page];
    const loadPage = pages[globPath];

    if (!loadPage) {
      throw new Error(`Missing page module for ${page}: ${globPath}`);
    }

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
        const module = await pages[globPath]();
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
