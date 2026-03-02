import styles from "./Header.module.scss";

// Базовий хедер без бізнес-логіки.
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Логотип додатку */}
        <div className={styles.logo}>FOOD DELIVERY</div>

        {/* Прості кнопки-іконки без логіки */}
        <nav className={styles.nav}>
          <button type="button" className={styles.iconButton}>
            Profile
          </button>
          <button type="button" className={styles.iconButton}>
            Cart
          </button>
        </nav>
      </div>
    </header>
  );
}

