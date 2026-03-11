import { roles } from "@/shared/config/roles";

export const frontRoutes = {
  pages: {
    HomePage: {
      path: "",
      navigationPath: "/",
      meta: {
        requireAuth: false,
      },
    },

    LoginPage: {
      path: "login",
      navigationPath: "/login",
      meta: {
        requireAuth: false,
      },
    },

    ProfilePage: {
      path: "profile",
      navigationPath: "/profile",
      meta: {
        requireAuth: true,
        roles: [roles.user],
      },
    },

    CartPage: {
      path: "cart",
      navigationPath: "/cart",
      meta: {
        requireAuth: false,
      },
    },

    CheckoutPage: {
      path: "checkout",
      navigationPath: "/checkout",
      meta: {
        requireAuth: false,
      },
    },

    NotFoundPage: {
      path: "*",
      meta: {
        requireAuth: false,
      },
    },

    ForbiddenPage: {
      path: "forbidden",
      navigationPath: "/forbidden",
      meta: {
        requireAuth: false,
      },
    },
  },
};