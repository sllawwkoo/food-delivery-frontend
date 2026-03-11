import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Loader } from "@/shared/ui/Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;

