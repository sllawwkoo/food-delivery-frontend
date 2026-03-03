import styles from "./Footer.module.scss";
import { Container } from "@/shared/ui/Container";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <p>Дякуємо, що вибрали нас для своєї доставки їжі!</p>
          <p>Смачного!</p>
          <p>Food Delivery © 2026</p>
        </div>
      </Container>
    </footer>
  );
}

