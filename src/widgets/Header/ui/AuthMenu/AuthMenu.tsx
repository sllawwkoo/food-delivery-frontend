import { Link, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import styles from "./AuthMenu.module.scss";

type MockUser = {
  isAuthenticated: boolean;
  name: string;
  avatar: string | null;
};

const mockUser: MockUser = {
  isAuthenticated: true,
  name: "Slava",
  avatar: null,
};

export function AuthMenu() {
  const { pathname } = useLocation();
  const isLoginActive = pathname.startsWith("/login");

  if (!mockUser.isAuthenticated) {
    const iconClassName = isLoginActive
      ? `${styles.icon} ${styles.iconActive}`
      : styles.icon;

    return (
      <div className={styles.root}>
        <Link
          to="/login"
          className={styles.loginButton}
          aria-label="Увійти в акаунт"
        >
          <LoginIcon className={iconClassName} />
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <UserAvatar name={mockUser.name} image={mockUser.avatar} />
    </div>
  );
}

