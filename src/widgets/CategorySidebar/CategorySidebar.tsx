import type { ProductCategory } from "@/entities/product";
import burgerImg from "@/assets/images/categories/burger.webp";
import chickenImg from "@/assets/images/categories/chicken.webp";
import hataImg from "@/assets/images/categories/hata.webp";
import pizzaImg from "@/assets/images/categories/pizza.webp";
import sushiImg from "@/assets/images/categories/sushi.webp";
import styles from "./CategorySidebar.module.scss";

type CategorySidebarProps = {
  activeCategory: ProductCategory;
  onChange: (category: ProductCategory) => void;
};

const categories: ProductCategory[] = ["burger", "chicken", "hata", "pizza", "sushi"];

const categoryImages: Record<ProductCategory, string> = {
  burger: burgerImg,
  chicken: chickenImg,
  hata: hataImg,
  pizza: pizzaImg,
  sushi: sushiImg,
};

export function CategorySidebar({ activeCategory, onChange }: CategorySidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <li key={category} className={styles.item}>
              <button
                type="button"
                className={`${styles.button} ${isActive ? styles.buttonActive : ""}`}
                onClick={() => onChange(category)}
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
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

