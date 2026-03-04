import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./CartButton.module.scss";

export function CartButton() {

  return (
    <Link to="/cart" className={styles.button} aria-label="Відкрити кошик">
      <ShoppingCartIcon className={styles.icon} />
    </Link>
  );
}

