import type { Product } from "../../model/types";
import { AddToCartButton } from "@/features/cart";
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
      <AddToCartButton product={product} />
    </div>
  );
}

