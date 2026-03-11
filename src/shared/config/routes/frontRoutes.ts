import { roles } from "@/shared/config/roles";

export const frontRoutes = {
  pages: {
    home: {
      path: "",
      navigationPath: "/",
      meta: {
        requireAuth: false,
      },
    },

    login: {
      path: "login",
      navigationPath: "/login",
      meta: {
        requireAuth: false,
      },
    },

    profile: {
      path: "profile",
      navigationPath: "/profile",
      meta: {
        requireAuth: true,
        roles: [roles.user],
      },
    },

    cart: {
      path: "cart",
      navigationPath: "/cart",
      meta: {
        requireAuth: false,
      },
    },

    checkout: {
      path: "checkout",
      navigationPath: "/checkout",
      meta: {
        requireAuth: false,
      },
    },

    forbidden: {
      path: "forbidden",
      navigationPath: "/forbidden",
      meta: {
        requireAuth: false,
      },
    },
  },
};