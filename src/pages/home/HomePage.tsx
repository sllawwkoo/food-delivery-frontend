import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ProductCategory } from "@/entities/product";
import { clearCart, selectCartRestaurant } from "@/entities/cart";
import { CategorySidebar } from "@/widgets/CategorySidebar";
import { ProductGrid } from "@/widgets/ProductGrid";
import { Container } from "@/shared/ui/Container";
import styles from "./HomePage.module.scss";

const DEFAULT_CATEGORY: ProductCategory = "burger";

function HomePage() {
  const dispatch = useDispatch();
  const cartRestaurant = useSelector(selectCartRestaurant);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    (cartRestaurant as ProductCategory) ?? DEFAULT_CATEGORY
  );

  useEffect(() => {
    if (cartRestaurant) {
      setActiveCategory(cartRestaurant as ProductCategory);
    }
  }, [cartRestaurant]);

  const handleConfirmClearAndGo = (category: ProductCategory) => {
    dispatch(clearCart());
    setActiveCategory(category);
  };

  return (
    <Container>
      <div className={styles.layout}>
        <CategorySidebar
          activeCategory={activeCategory}
          onChange={setActiveCategory}
          onConfirmClearAndGo={handleConfirmClearAndGo}
        />
        <ProductGrid activeCategory={activeCategory} />
      </div>
    </Container>
  );
}

export default HomePage;