import { useSelector } from "react-redux";
import { selectCartTotal } from "@/entities/cart";
import styles from "./CartTotal.module.scss";

export function CartTotal() {
  const total = useSelector(selectCartTotal);

  return (
    <div className={styles.root}>
      <span className={styles.label}>Загальна сума:</span>
      <span className={styles.value}>{total} ₴</span>
    </div>
  );
}
