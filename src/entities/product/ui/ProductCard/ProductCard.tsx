import type { Product } from "../../model/types";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <img
        src={product.imageUrl}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>
        Ціна: <strong>{product.price} ₴</strong>
      </div>
      <button type="button" className={styles.button}>
        Додати до кошика
      </button>
    </div>
  );
}

