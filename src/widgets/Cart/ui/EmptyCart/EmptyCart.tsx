import { Link } from "react-router-dom";
import styles from "./EmptyCart.module.scss";

import emptyCartImage from "@/assets/images/empty-cart-food.webp";

export function EmptyCart() {
  return (
    <div className={styles.root}>
      <img
        src={emptyCartImage}
        alt=""
        className={styles.image}
      />
      <h2 className={styles.title}>Кошик порожній</h2>
      <p className={styles.subtitle}>Але це ніколи не пізно виправити :)</p>
      <Link to="/home" className={styles.button}>
        Перейти до меню
      </Link>
    </div>
  );
}
