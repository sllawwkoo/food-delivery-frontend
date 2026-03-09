import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "@/entities/cart";
import styles from "./OrderSummary.module.scss";

export function OrderSummary() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <aside className={styles.root}>
      <h2 className={styles.title}>Ваше замовлення</h2>

      {items.length === 0 ? (
        <p className={styles.empty}>Кошик порожній. Додайте страви до замовлення.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item._id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{item.title}</span>
              </div>
              <div className={styles.itemMeta}>
                <span className={styles.qty}>× {item.quantity}</span>
                <span className={styles.price}>{item.price * item.quantity} ₴</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.totalRow}>
        <span>Разом</span>
        <span>{total} ₴</span>
      </div>
    </aside>
  );
}

