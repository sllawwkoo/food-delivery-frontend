import { useState } from "react";
import type { ProductCategory } from "@/entities/product";
import { CategorySidebar } from "@/widgets/CategorySidebar";
import { ProductGrid } from "@/widgets/ProductGrid";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("burger");

  return (
    <div className={styles.layout}>
      <CategorySidebar
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />
      <ProductGrid activeCategory={activeCategory} />
    </div>
  );
}

