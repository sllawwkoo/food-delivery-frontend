import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "../App.tsx";
import { Providers } from "./providers";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container element with id \"root\" was not found.");
}

createRoot(container).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);

