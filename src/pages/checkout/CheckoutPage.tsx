import { CheckoutForm } from "@/widgets/CheckoutForm";
import { OrderSummary } from "@/widgets/OrderSummary";
import { Container } from "@/shared/ui/Container";
import styles from "./CheckoutPage.module.scss";

export function CheckoutPage() {
  return (
    <div className={styles.root}>
      <Container>
        <h1 className={styles.title}>Оформлення замовлення</h1>
        <div className={styles.layout}>
          <CheckoutForm />
          <OrderSummary />
        </div>
      </Container>
    </div>
  );
}

