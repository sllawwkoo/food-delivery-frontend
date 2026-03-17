import type { ProductCategory } from "@/entities/product";
import { useGetProductsQuery } from "@/entities/product";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import styles from "./ProductGrid.module.scss";
import { ProductCardSkeleton } from "@/entities/product/ui/ProductCardSkeleton";

type ProductGridProps = {
  activeCategory: ProductCategory;
};

export function ProductGrid({ activeCategory }: ProductGridProps) {
  const { data, isLoading, isError } = useGetProductsQuery(activeCategory);

  if (isLoading) {
    return (
      <section className={styles.root}>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.root}>
        <div className={styles.message}>Сталася помилка завантаження</div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className={styles.root}>
        <div className={styles.message}>Немає продуктів</div>
      </section>
    );
  }

  return (
    <section className={styles.root}>
      <div className={styles.grid}>
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
