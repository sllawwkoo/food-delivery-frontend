import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { HomePage } from "@/pages/home/HomePage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

