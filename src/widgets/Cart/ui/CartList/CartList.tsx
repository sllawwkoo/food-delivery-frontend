import { useSelector } from "react-redux";
import { selectCartItems } from "@/entities/cart";
import { CartItem } from "../CartItem";
import styles from "./CartList.module.scss";

export function CartList() {
  const items = useSelector(selectCartItems);

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item._id} className={styles.cartItem}>
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
}
