import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import styles from "./Layout.module.scss";
import { ScrollToTop } from "@/shared/lib/router/ScrollToTop";

export function Layout() {
  return (
    <div className={styles.wrapper}>
      <ScrollToTop />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

