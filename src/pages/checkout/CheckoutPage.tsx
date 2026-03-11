import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckoutForm } from "@/widgets/CheckoutForm";
import { OrderSummary } from "@/widgets/OrderSummary";
import { selectCartItems } from "@/entities/cart";
import { Container } from "@/shared/ui/Container";
import styles from "./CheckoutPage.module.scss";

function CheckoutPage() {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items.length, navigate]);

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

export default CheckoutPage;