import { useState } from "react";
import type { ProductCategory } from "@/entities/product";
import { CategorySidebar } from "@/widgets/CategorySidebar";
import { ProductGrid } from "@/widgets/ProductGrid";
import styles from "./HomePage.module.scss";
import { Container } from "@/shared/ui/Container";

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("burger");

  return (
    <Container>
      <div className={styles.layout}>
        <CategorySidebar
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
        <ProductGrid activeCategory={activeCategory} />
      </div>
    </Container>
  );
}

