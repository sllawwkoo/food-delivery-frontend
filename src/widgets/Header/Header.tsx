import styles from "./Header.module.scss";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/widgets/Logo";
import { CartButton, AuthMenu } from "@/widgets/Header/ui";

// Базовий хедер без бізнес-логіки.
export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Logo />
          <div className={styles.right}>
            <AuthMenu />
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
}

