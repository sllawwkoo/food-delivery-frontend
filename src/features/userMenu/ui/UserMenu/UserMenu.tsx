import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserAvatar } from "@/entities/user";
import styles from "./UserMenu.module.scss";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { useLogout } from "@/features/auth/logout/model/useLogout";

export type UserMenuUser = {
  name: string;
  email: string;
  avatar: string | null;
};

type UserMenuProps = {
  user: UserMenuUser;
};

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { logoutUser } = useLogout();
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);

    await logoutUser();

    if (location.pathname === frontRoutes.pages.ProfilePage.navigationPath) {
      navigate(frontRoutes.pages.HomePage.navigationPath, { replace: true });
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.avatarButton}
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <UserAvatar name={user.name} image={user.avatar} />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <span className={styles.name}>{user.name}</span>
              <span className={styles.email}>{user.email}</span>
            </div>
          </div>

          <div className={styles.divider} />

          <Link to={frontRoutes.pages.ProfilePage.path} className={styles.item} role="menuitem" onClick={toggleMenu}>
            Мій профіль
          </Link>

          <button
            type="button"
            className={styles.logout}
            role="menuitem"
            onClick={handleLogout}
          >
            <LogoutIcon className={styles.icon} />
            Вийти
          </button>
        </div>
      )}
    </div>
  );
}
