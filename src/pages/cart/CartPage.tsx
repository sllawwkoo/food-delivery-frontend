import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartList, CartTotal } from "@/widgets/Cart";
import { selectCartItems, selectCartTotal } from "@/entities/cart";
import { Container } from "@/shared/ui/Container";
import styles from "./CartPage.module.scss";

const FREE_DELIVERY_THRESHOLD = 1000;

export function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const hasItems = items.length > 0;
  const amountToFreeDelivery =
    total < FREE_DELIVERY_THRESHOLD ? FREE_DELIVERY_THRESHOLD - total : 0;

  return (
    <div className={styles.root}>
      <Container>
        <h1 className={styles.title}>Кошик</h1>
        <div className={styles.content}>
          <CartList />
          {hasItems && (
            <div className={styles.summary}>
              <CartTotal />
              {amountToFreeDelivery > 0 && (
                <p className={styles.deliveryHint}>
                  До безкоштовної доставки ще {amountToFreeDelivery} ₴
                </p>
              )}
              <Link to="/home" className={styles.checkout}>
                Оформити замовлення
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
