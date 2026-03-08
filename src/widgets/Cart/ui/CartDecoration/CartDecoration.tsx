import cartDecoration from "@/assets/images/cart-decoration.webp";
import styles from "./CartDecoration.module.scss";

export function CartDecoration() {
  return (
    <div className={styles.cartDecoration}>
      <img src={cartDecoration} alt="Food delivery illustration" />
    </div>
  );
}
