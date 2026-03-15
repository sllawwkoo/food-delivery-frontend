import type { Order } from "../../model/types";
import { formatDate } from "../../lib/formatDate";
import { formatTotal } from "../../lib/formatTotal";
import { getRestaurantImage } from "../../lib/getRestaurantImage";
import { formatRestaurantName } from "../../lib/formatRestaurantName";
import styles from "./OrderItem.module.scss";

type OrderItemProps = {
  order: Order;
};

export function OrderItem({ order }: OrderItemProps) {
  const restaurant = order.restaurant;
  const imageSrc = getRestaurantImage(restaurant);
  const displayName = restaurant ? formatRestaurantName(restaurant) : null;

  return (
    <article className={styles.root}>
      <header className={styles.orderHeader}>
        {restaurant && (
          <div className={styles.restaurantRow}>
            <div className={styles.restaurantImageWrap}>
              {imageSrc ? (
                <img src={imageSrc} alt="" className={styles.restaurantImage} />
              ) : (
                <div className={styles.restaurantImagePlaceholder} />
              )}
            </div>
            <span className={styles.restaurantName}>{displayName}</span>
          </div>
        )}
        <div className={styles.meta}>
          <span className={styles.id}>#{order.id.slice(0, 8)}</span>
          <span className={styles.date}>{formatDate(order.createdAt)}</span>
        </div>
      </header>
      {order.items && order.items.length > 0 && (
        <ul className={styles.itemsList}>
          {order.items.map((item, index) => (
            <li key={index} className={styles.itemRow}>
              {item.quantity} × {item.title}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.total}>
        <span className={styles.totalLabel}>Разом</span>
        <span className={styles.totalValue}>{formatTotal(order.total)}</span>
      </div>
    </article>
  );
}
