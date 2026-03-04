import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { UserMenu } from "@/features/userMenu";
import styles from "./AuthMenu.module.scss";

type MockUser = {
  isAuthenticated: boolean;
  name: string;
  email: string;
  avatar: string | null;
};

const mockUser: MockUser = {
  isAuthenticated: true,
  name: "Slava",
  email: "slava@example.com",
  avatar: null,
};

export function AuthMenu() {
  if (!mockUser.isAuthenticated) {
    return (
      <div className={styles.root}>
        <Link
          to="/login"
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
        name: mockUser.name,
        email: mockUser.email,
        avatar: mockUser.avatar,
      }}
    />
  );
}
