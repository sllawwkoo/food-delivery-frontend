import styles from "./ProductCardSkeleton.module.scss";

export function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.title}></div>
      <div className={styles.price}></div>
      <div className={styles.button}></div>
    </div>
  );
}