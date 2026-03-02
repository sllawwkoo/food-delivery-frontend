import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./app/App";
import { Providers } from "./app/providers";
import { AppErrorBoundary } from "./app/providers/AppErrorBoundary";

const container = document.getElementById("root");

if (!container) {
  throw new Error('Root container element with id "root" was not found.');
}

createRoot(container).render(
  <StrictMode>
    <Providers>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </Providers>
  </StrictMode>,
);
