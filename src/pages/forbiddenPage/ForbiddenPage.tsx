import { Link } from "react-router-dom";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import styles from "./ForbiddenPage.module.scss";

export function ForbiddenPage() {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.code}>403</div>
        <h1 className={styles.title}>Доступ заборонено</h1>
        <p className={styles.description}>
          У вас немає доступу до цієї сторінки.
        </p>
        <Link
          to={frontRoutes.pages.home.navigationPath}
          className={styles.button}
        >
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}

