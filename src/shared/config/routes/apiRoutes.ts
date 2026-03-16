export const apiRoutes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",

    getProfile: "/auth/me",
    updateProfile: "/auth/me",
  },

  products: "/products",

  orders: "/orders",
  ordersMy: "/orders/my",
};