import { Link } from "react-router-dom";
import { useGetMyOrdersQuery, OrderItem } from "@/entities/order";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Loader } from "@/shared/ui/Loader";
import emptyOrdersImg from "@/assets/images/cart-decoration.webp";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import styles from "./OrdersList.module.scss";

export function OrdersList() {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className={styles.root}>
      {isLoading && (
        <div className={styles.wrapper}>
          <Loader size="medium" />
        </div>
      )}
      {error && !isLoading && (
        <div className={styles.wrapper}>
          <p className={styles.error}>
            Не вдалося завантажити замовлення. Спробуйте пізніше.
          </p>
        </div>
      )}
      {!isLoading && !error && (!orders || orders.length === 0) && (
        <div className={styles.emptyWrapper}>
          <EmptyState
            image={emptyOrdersImg}
            message="У вас ще немає замовлень"
            action={
              <Link to={frontRoutes.pages.HomePage.navigationPath}>
                <button type="button" className={styles.actionButton}>
                  Перейти до меню
                </button>
              </Link>
            }
          />
        </div>
      )}
      {!isLoading && !error && orders && orders.length > 0 && (
        <ul className={styles.list}>
          {orders.map((order) => (
            <li key={order.id}>
              <OrderItem order={order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
