import { Suspense } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Loader } from "@/shared/ui/Loader";
import { AppInit } from "./init/AppInit";
import { selectAuthLoading } from "@/features/auth";

function App() {
  const loading = useSelector(selectAuthLoading);

  return (
    <>
      <AppInit />

      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      )}
    </>
  );
}

export default App;

