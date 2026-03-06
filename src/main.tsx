import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./app/App";
import { StoreProvider, AppErrorBoundary } from "@/app/providers";

const container = document.getElementById("root");

if (!container) {
  throw new Error('Root container element with id "root" was not found.');
}

createRoot(container).render(
  <StrictMode>
    <StoreProvider>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </StoreProvider>
  </StrictMode>,
);
