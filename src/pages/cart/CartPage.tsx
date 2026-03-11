import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartList, CartTotal, EmptyCart } from "@/widgets/Cart";
import { StickyCheckoutBar } from "@/widgets/StickyCheckoutBar";
import { selectCartItems, selectCartTotal } from "@/entities/cart";
import { Container } from "@/shared/ui/Container";
import styles from "./CartPage.module.scss";

const FREE_DELIVERY_THRESHOLD = 1000;

function CartPage() {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const hasItems = items.length > 0;
  const amountToFreeDelivery =
    total < FREE_DELIVERY_THRESHOLD ? FREE_DELIVERY_THRESHOLD - total : 0;
  const progress =
    total >= FREE_DELIVERY_THRESHOLD
      ? 100
      : (total / FREE_DELIVERY_THRESHOLD) * 100;

  const handleCheckout = () => {
    navigate("/checkout");
  };

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
                {total > 0 && (
                  <div className={styles.deliveryProgress}>
                    <span>
                      {amountToFreeDelivery > 0
                        ? `До безкоштовної доставки ще ${amountToFreeDelivery} ₴`
                        : "🎉 У вас безкоштовна доставка!"}
                    </span>
                    <div className={styles.progressBar}>
                      <div
                        className={
                          amountToFreeDelivery > 0
                            ? styles.progressFill
                            : styles.progressFillSuccess
                        }
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {hasItems && (
          <StickyCheckoutBar total={total} onCheckout={handleCheckout} />
        )}
      </Container>
    </div>
  );
}

export default CartPage;