import { useRouteError, useNavigate } from "react-router-dom";
import styles from "./GlobalErrorPage.module.scss";

type RouteError = {
  statusText?: string;
  message?: string;
};

export function GlobalErrorPage() {
  const error = useRouteError() as RouteError | unknown;
  const navigate = useNavigate();

  const message =
    (error as RouteError)?.statusText ||
    (error as RouteError)?.message ||
    "Сталася непередбачувана помилка. Спробуйте пізніше.";

  const handleBackHome = () => {
    navigate("/");
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Щось пішло не так</h1>
        <p className={styles.text}>{message}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={handleBackHome}>
            Повернутись на головну
          </button>
          <button type="button" className={styles.secondaryButton} onClick={handleReload}>
            Перезавантажити сторінку
          </button>
        </div>
      </div>
    </div>
  );
}

