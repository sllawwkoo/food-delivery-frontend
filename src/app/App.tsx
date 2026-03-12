import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Loader } from "@/shared/ui/Loader";
import { AppInit } from "./init/AppInit";

function App() {
  return (
    <>
      <AppInit />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;

