import { redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { store } from "@/app/store";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";

type AuthCheckDeps = {
  refreshMutex: unknown;
};

type RouteWithMeta = RouteObject & {
  meta?: {
    requireAuth?: boolean
    roles?: string[]
  }
}

export const authCheckLoader =
  ({ refreshMutex: _refreshMutex }: AuthCheckDeps) =>
  async (route: RouteObject) => {

    const meta = (route as RouteWithMeta).meta;

    if (!meta?.requireAuth) {
      return true;
    }

    const state = store.getState();
    const user = state.auth.user;

    // ❗ користувач не авторизований
    if (!user) {
      throw redirect(frontRoutes.pages.LoginPage.navigationPath);
    }

    // ❗ перевірка ролей
    const userRole = (user as { role?: string }).role;
    if (meta.roles && !meta.roles.includes(userRole ?? "")) {
      throw redirect(frontRoutes.pages.ForbiddenPage.navigationPath);
    }

    return true;
  };