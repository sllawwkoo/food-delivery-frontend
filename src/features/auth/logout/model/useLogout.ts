import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/features/auth";
import { logout } from "@/features/auth/api/authSlice";

export function useLogout() {
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();

  const logoutUser = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      dispatch(logout());
    }
  }, [dispatch, logoutMutation]);

  return { logoutUser };
}

