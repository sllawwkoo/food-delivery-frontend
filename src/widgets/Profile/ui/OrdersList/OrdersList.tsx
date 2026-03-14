import { useGetMyOrdersQuery, OrderItem } from "@/entities/order";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Loader } from "@/shared/ui/Loader";
import styles from "./OrdersList.module.scss";

export function OrdersList() {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Loader size="medium" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>
          Не вдалося завантажити замовлення. Спробуйте пізніше.
        </p>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className={styles.wrapper}>
        <EmptyState message="You have no orders yet" />
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {orders.map((order) => (
        <li key={order.id}>
          <OrderItem order={order} />
        </li>
      ))}
    </ul>
  );
}
