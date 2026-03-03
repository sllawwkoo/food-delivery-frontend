import type { ProductCategory } from "@/entities/product";
import { useGetProductsQuery } from "@/entities/product";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { Loader } from "@/shared/ui/Loader";
import styles from "./ProductGrid.module.scss";

type ProductGridProps = {
  activeCategory: ProductCategory;
};

export function ProductGrid({ activeCategory }: ProductGridProps) {
  const { data, isLoading, isError } = useGetProductsQuery(activeCategory);

  if (isLoading) {
    return (
      <section className={styles.root}>
        <div className={styles.loaderWrapper}>
          <Loader size="large" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.root}>
        <div>Сталася помилка завантаження</div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className={styles.root}>
        <div>Немає продуктів</div>
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

