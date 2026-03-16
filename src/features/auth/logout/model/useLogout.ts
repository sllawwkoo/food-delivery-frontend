import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/features/auth";
import { logout } from "@/features/auth/api/authSlice";
import { baseApi } from "@/shared/api/baseApi";

export function useLogout() {
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();

  const logoutUser = useCallback(async () => {
    try {
      await logoutMutation(undefined).unwrap();
    } finally {
      dispatch(logout());

      // 🔹 очищає весь RTK Query cache
      dispatch(baseApi.util.resetApiState());
    }
  }, [dispatch, logoutMutation]);

  return { logoutUser };
}

