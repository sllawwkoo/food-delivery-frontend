import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: frontRoutes.pages.home.path || "/",
        lazy: async () => {
          const module = await import("@/pages/home/HomePage");
          return { Component: module.HomePage };
        },
      },
      {
        path: frontRoutes.pages.login.path,
        lazy: async () => {
          const module = await import("@/pages/login/LoginPage");
          return { Component: module.LoginPage };
        },
      },
      {
        path: frontRoutes.pages.profile.path,
        lazy: async () => {
          const module = await import("@/pages/profile/ProfilePage");
          return { Component: module.ProfilePage };
        },
      },
      {
        path: frontRoutes.pages.cart.path,
        lazy: async () => {
          const module = await import("@/pages/cart/CartPage");
          return { Component: module.CartPage };
        },
      },
      {
        path: frontRoutes.pages.checkout.path,
        lazy: async () => {
          const module = await import("@/pages/checkout/CheckoutPage");
          return { Component: module.CheckoutPage };
        },
      },
      {
        path: frontRoutes.pages.forbidden.path,
        lazy: async () => {
          const module = await import("@/pages/forbiddenPage/ForbiddenPage");
          return { Component: module.ForbiddenPage };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const module = await import("@/pages/notFoundPage/NotFoundPage");
          return { Component: module.NotFoundPage };
        },
      },
    ],
  },
]);

