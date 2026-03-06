import type { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/app/store";

/**
 * Глобальні провайдери додатку.
 *
 * Відповідальність Providers:
 * - ініціалізувати всі кореневі контексти/провайдери (Redux store, router, тема тощо);
 * - інкапсулювати інфраструктуру, щоб кореневий рендер лишався простим.
 *
 * У поточному фундаменті:
 * - підключається лише Redux Provider зі store з app-шару;
 * - Router, тема, MUI та інші провайдери будуть додаватися поступово
 *   саме тут, зберігаючи чисту структуру FSD.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}

