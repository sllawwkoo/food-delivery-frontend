import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/images/logo.webp";
import styles from "./Logo.module.scss";

export function Logo() {
  const { pathname } = useLocation();

  const content = (
    <img
      src={logoImg}
      alt="Food Delivery Logo"
      className={styles.image}
    />
  );

  if (pathname === "/") {
    return <div className={styles.wrapper}>{content}</div>;
  }

  return (
    <Link to="/" className={styles.wrapper}>
      {content}
    </Link>
  );
}

