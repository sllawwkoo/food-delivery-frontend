import { Link } from "react-router-dom";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import styles from "./NotFoundPage.module.scss";

function NotFoundPage() {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Сторінку не знайдено</h1>
        <p className={styles.description}>
          Схоже, що ця сторінка загубилась. Але наша їжа все ще тут 🙂
        </p>
        <p className={styles.menu}>
          У нас є: 🍕 піца • 🍣 суші • 🍔 бургери • 🥘 домашня кухня
        </p>
        <Link
          to={frontRoutes.pages.HomePage.navigationPath}
          className={styles.button}
        >
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;