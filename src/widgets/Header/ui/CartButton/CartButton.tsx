import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { selectCartCount } from "@/entities/cart";
import styles from "./CartButton.module.scss";

const BOUNCE_DURATION_MS = 400;

export function CartButton() {
  const count = useSelector(selectCartCount);
  const prevCountRef = useRef(count);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (count > prevCountRef.current) {
      setIsBouncing(true);
      const t = setTimeout(() => setIsBouncing(false), BOUNCE_DURATION_MS);
      return () => clearTimeout(t);
    }
    prevCountRef.current = count;
  }, [count]);

  return (
    <Link to="/cart" className={styles.button} aria-label="Відкрити кошик">
      <ShoppingCartIcon className={isBouncing ? `${styles.icon} ${styles.iconBounce}` : styles.icon} />
      {count > 0 && (
        <span className={styles.badge} aria-live="polite">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

