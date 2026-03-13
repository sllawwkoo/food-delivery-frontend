import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthWidget } from "@/widgets/AuthWidget";
import { selectAuthLoading, selectAuthUser } from "@/features/auth";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";

function LoginPage() {
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(frontRoutes.pages.HomePage.navigationPath, { replace: true });
    }
  }, [user, navigate]);

  // Поки йде refresh або вже є user – не показуємо форму логіну
  if (loading || user) {
    return null;
  }

  return <AuthWidget />;
}

export default LoginPage;