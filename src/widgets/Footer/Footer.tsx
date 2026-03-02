import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Дякуємо, що вибрали нас для своєї доставки їжі!</p>
      <p>Смачного!</p>
      <p>Food Delivery © 2025</p>
    </footer>
  );
}

