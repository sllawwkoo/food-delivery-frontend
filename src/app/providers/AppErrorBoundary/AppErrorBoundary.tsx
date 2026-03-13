import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import styles from "./AppErrorBoundary.module.scss";

export function AppErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={AppErrorFallback}
      onError={(error, info) => {
        // Тут можна інтегрувати Sentry або інший сервіс логування помилок.
        // Наприклад: Sentry.captureException(error);
        // eslint-disable-next-line no-console
        console.error("Unhandled application error:", error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const safeMessage =
    error instanceof Error ? error.message : "Сталася невідома помилка";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Щось пішло не так</h1>
      <p className={styles.text}>
        Виникла неочікувана помилка. Ви можете спробувати перезавантажити
        інтерфейс, натиснувши кнопку нижче.
      </p>
      {safeMessage && <pre className={styles.message}>{safeMessage}</pre>}
      <button
        type="button"
        onClick={resetErrorBoundary}
        className={styles.button}
      >
        Спробувати ще раз
      </button>
    </div>
  );
}

