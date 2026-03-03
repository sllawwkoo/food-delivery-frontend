import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./CartButton.module.scss";

export function CartButton() {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith("/cart");

  const iconClassName = isActive
    ? `${styles.icon} ${styles.iconActive}`
    : styles.icon;

  return (
    <Link to="/cart" className={styles.button} aria-label="Відкрити кошик">
      <ShoppingCartIcon className={iconClassName} />
    </Link>
  );
}

