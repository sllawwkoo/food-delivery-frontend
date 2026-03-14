import type { Order } from "../../model/types";
import styles from "./OrderItem.module.scss";

// const STATUS_LABELS: Record<Order["status"], string> = {
//   pending: "Очікує",
//   confirmed: "Підтверджено",
//   preparing: "Готується",
//   delivering: "Доставляється",
//   delivered: "Доставлено",
//   cancelled: "Скасовано",
// };

type OrderItemProps = {
  order: Order;
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(amount: number): string {
  return `${amount} ₴`;
}

export function OrderItem({ order }: OrderItemProps) {
  return (
    <article className={styles.root}>
      <div className={styles.header}>
        <span className={styles.id}>#{order.id.slice(0, 8)}</span>
        {/* <span className={styles.status}>{STATUS_LABELS[order.status]}</span> */}
      </div>
      <div className={styles.meta}>
        <span className={styles.date}>{formatDate(order.createdAt)}</span>
        <span className={styles.amount}>{formatAmount(order.total)}</span>
      </div>
      {order.deliveryAddress && (
        <p className={styles.address}>{order.deliveryAddress}</p>
      )}
    </article>
  );
}
