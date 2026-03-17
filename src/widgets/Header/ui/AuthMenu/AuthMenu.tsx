import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import { UserMenu } from "@/features/userMenu";
import styles from "./AuthMenu.module.scss";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { selectAuthUser } from "@/features/auth/api/authSlice";

export function AuthMenu() {
  const user = useSelector(selectAuthUser);
 
  if (!user) {
    return (
      <div className={styles.root}>
        <Link
          to={frontRoutes.pages.LoginPage.path}
          className={styles.loginButton}
          aria-label="Увійти в акаунт"
        >
          <LoginIcon className={styles.icon} />
        </Link>
      </div>
    );
  }

  return (
    <UserMenu
      user={{
        name: user.name ?? user.email,
        email: user.email,
        avatar: null,
      }}
    />
  );
}
