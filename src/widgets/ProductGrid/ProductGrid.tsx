import type { ProductCategory } from "@/entities/product";
import styles from "./ProductGrid.module.scss";

type ProductGridProps = {
  activeCategory: ProductCategory;
};

const mockProducts = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
}));

export function ProductGrid({ activeCategory }: ProductGridProps) {
  return (
    <section className={styles.root}>
      <h2 className={styles.title}>{activeCategory.toUpperCase()}</h2>
      <div className={styles.grid}>
        {mockProducts.map((product) => (
          <article key={product.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{product.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

