import { useState } from "react";
import { useSelector } from "react-redux";
import type { ProductCategory } from "@/entities/product";
import { selectCartRestaurant } from "@/entities/cart";
import { RestaurantLockModal } from "@/features/cart";
import burgerImg from "@/assets/images/categories/burger.webp";
import chickenImg from "@/assets/images/categories/chicken.webp";
import hataImg from "@/assets/images/categories/hata.webp";
import pizzaImg from "@/assets/images/categories/pizza.webp";
import sushiImg from "@/assets/images/categories/sushi.webp";
import styles from "./CategorySidebar.module.scss";

type CategorySidebarProps = {
  activeCategory: ProductCategory;
  onChange: (category: ProductCategory) => void;
  onConfirmClearAndGo?: (category: ProductCategory) => void;
};

const categories: ProductCategory[] = ["burger", "chicken", "hata", "pizza", "sushi"];

const categoryImages: Record<ProductCategory, string> = {
  burger: burgerImg,
  chicken: chickenImg,
  hata: hataImg,
  pizza: pizzaImg,
  sushi: sushiImg,
};

export function CategorySidebar({
  activeCategory,
  onChange,
  onConfirmClearAndGo,
}: CategorySidebarProps) {
  const cartRestaurant = useSelector(selectCartRestaurant);
  const [lockModalTarget, setLockModalTarget] = useState<ProductCategory | null>(null);

  const handleConfirmClearAndGo = () => {
    if (lockModalTarget && onConfirmClearAndGo) {
      onConfirmClearAndGo(lockModalTarget);
      setLockModalTarget(null);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        {categories.map((category) => {
          const isActive = category === activeCategory;
          const isDisabled = Boolean(cartRestaurant && cartRestaurant !== category);

          return (
            <li key={category} className={styles.item}>
              <div
                className={styles.buttonWrap}
                onClick={isDisabled ? () => setLockModalTarget(category) : undefined}
                role={isDisabled ? "button" : undefined}
                aria-disabled={isDisabled}
              >
                <button
                  type="button"
                  className={`${styles.button} ${isActive ? styles.buttonActive : ""} ${isDisabled ? styles.buttonDisabled : ""}`}
                  onClick={(e) => {
                    if (!isDisabled) {
                      e.stopPropagation();
                      onChange(category);
                    }
                  }}
                >
                  <span className={styles.imageWrapper}>
                    <img
                      src={categoryImages[category]}
                      alt={category}
                      className={styles.image}
                    />
                  </span>
                  <span className={styles.label}>{category.toUpperCase()}</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {lockModalTarget && cartRestaurant && (
        <RestaurantLockModal
          isOpen={true}
          cartRestaurant={cartRestaurant}
          targetRestaurant={lockModalTarget}
          onConfirm={handleConfirmClearAndGo}
          onCancel={() => setLockModalTarget(null)}
        />
      )}
    </aside>
  );
}

