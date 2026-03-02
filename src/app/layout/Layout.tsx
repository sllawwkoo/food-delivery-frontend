import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import styles from "./Layout.module.scss";

export function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

