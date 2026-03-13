import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { buildChildRoutes } from "./buildRoutes";
import { GlobalErrorPage } from "@/pages/globalError/GlobalErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <GlobalErrorPage />,
    children: buildChildRoutes(),
  },
]);
