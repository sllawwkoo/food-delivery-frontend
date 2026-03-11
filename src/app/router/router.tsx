import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { buildChildRoutes } from "./buildRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: buildChildRoutes(),
  },
]);
