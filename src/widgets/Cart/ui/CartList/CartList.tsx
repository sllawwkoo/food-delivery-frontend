import { useSelector } from "react-redux";
import { selectCartItems } from "@/entities/cart";
import { CartItem } from "../CartItem";
import { EmptyCart } from "../EmptyCart";
import styles from "./CartList.module.scss";

export function CartList() {
  const items = useSelector(selectCartItems);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item._id}>
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
}
