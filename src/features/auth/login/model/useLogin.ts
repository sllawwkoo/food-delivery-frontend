import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";

export function useLogin() {
  const [loginMutation, loginState] = useLoginMutation();
  const navigate = useNavigate();

  const login = useCallback(
    async (data: { identifier: string; password: string }) => {
      const result = await loginMutation(data).unwrap();

      if (result?.data?.user) {
        navigate(frontRoutes.pages.HomePage.navigationPath);
      }

      return result;
    },
    [loginMutation, navigate]
  );

  return {
    login,
    ...loginState,
  };
}

