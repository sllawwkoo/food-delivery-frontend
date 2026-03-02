import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

/**
 * Глобальний Error Boundary для всього додатку.
 *
 * - Перехоплює некеровані помилки React-компонентів.
 * - Відображає дружній fallback-інтерфейс замість «білої сторінки».
 * - Дає можливість користувачу спробувати перезавантажити UI без повного reload.
 *
 * Знаходиться в app-шарі, тому що:
 * - це інфраструктурний, а не бізнесовий рівень;
 * - має охоплювати всі шари вище (pages, widgets, features, entities);
 * - налаштовується один раз на рівні кореня додатку.
 */
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
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "1.75rem", margin: 0 }}>Щось пішло не так</h1>
      <p style={{ maxWidth: 480, color: "#555", margin: 0 }}>
        Виникла неочікувана помилка. Ви можете спробувати перезавантажити
        інтерфейс, натиснувши кнопку нижче.
      </p>
      {error?.message && (
        <pre
          style={{
            maxWidth: 480,
            overflowX: "auto",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            backgroundColor: "#f5f5f5",
            color: "#c00",
            fontSize: "0.85rem",
            textAlign: "left",
          }}
        >
          {error.message}
        </pre>
      )}
      <button
        type="button"
        onClick={resetErrorBoundary}
        style={{
          marginTop: "0.5rem",
          padding: "0.6rem 1.25rem",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.95rem",
          fontWeight: 500,
          backgroundColor: "#1976d2",
          color: "#ffffff",
        }}
      >
        Спробувати ще раз
      </button>
    </div>
  );
}

