import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartList, CartTotal, CartDecoration, EmptyCart } from "@/widgets/Cart";
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
  const progress =
    total >= FREE_DELIVERY_THRESHOLD
      ? 100
      : (total / FREE_DELIVERY_THRESHOLD) * 100;

  return (
    <div className={styles.root}>
      <Container>
        <h1 className={styles.cartTitle}>Кошик</h1>
        <div className={styles.cartHeaderDivider} />

        {!hasItems ? (
          <div className={styles.emptyCartWrapper}>
            <div className={styles.emptyCartContent}>
              <EmptyCart />
            </div>
          </div>
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.cartMain}>
              <CartList />
              <div className={styles.cartSummary}>
                <CartTotal />
                {amountToFreeDelivery > 0 && (
                  <div className={styles.deliveryProgress}>
                    <span>
                      До безкоштовної доставки ще {amountToFreeDelivery} ₴
                    </span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <Link to="/home" className={styles.checkout}>
                  Оформити замовлення
                </Link>
              </div>
            </div>
            <CartDecoration />
          </div>
        )}
      </Container>
    </div>
  );
}
