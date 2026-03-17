import styles from "./RestaurantLockModal.module.scss";
import { Modal } from "@/shared/ui/Modal";

// export type RestaurantLockModalProps = {
//   cartRestaurant: string;
//   targetRestaurant: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// };

export type RestaurantLockModalProps = {
  isOpen: boolean; // 🔥 додаємо
  cartRestaurant: string;
  targetRestaurant: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function RestaurantLockModal({
  isOpen,
  cartRestaurant,
  targetRestaurant,
  onConfirm,
  onCancel,
}: RestaurantLockModalProps) {
  const displayCart = formatRestaurantName(cartRestaurant);
  const displayTarget = formatRestaurantName(targetRestaurant);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      ariaLabelledBy="restaurant-lock-title"
    >
      <div className={styles.panel}>
        <h2 id="restaurant-lock-title" className={styles.title}>
          У вашому кошику вже є товари
          <br />
          з закладу &quot;{displayCart}&quot;.
        </h2>

        <p className={styles.text}>
          Очистіть кошик,
          <br />
          щоб перейти до &quot;{displayTarget}&quot;.
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.confirm} onClick={onConfirm}>
            Очистити кошик і перейти
          </button>

          <button type="button" className={styles.cancel} onClick={onCancel}>
            Скасувати
          </button>
        </div>
      </div>
    </Modal>
  );
}
/**
 * Модальне вікно блокування зміни закладу.
 * Показується, коли користувач намагається перейти до іншого закладу,
 * а в кошику вже є товари з поточного.
 */
// export function RestaurantLockModal({
//   cartRestaurant,
//   targetRestaurant,
//   onConfirm,
//   onCancel,
// }: RestaurantLockModalProps) {
//   const displayCart = formatRestaurantName(cartRestaurant);
//   const displayTarget = formatRestaurantName(targetRestaurant);

//   return (
//     <div
//       className={styles.overlay}
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="restaurant-lock-title"
//       onClick={(e) => e.target === e.currentTarget && onCancel()}
//     >
//       <div className={styles.panel}>
//         <h2 id="restaurant-lock-title" className={styles.title}>
//           У вашому кошику вже є товари
//           <br />
//           з закладу &quot;{displayCart}&quot;.
//         </h2>
//         <p className={styles.text}>
//           Очистіть кошик,
//           <br />
//           щоб перейти до &quot;{displayTarget}&quot;.
//         </p>
//         <div className={styles.actions}>
//           <button type="button" className={styles.confirm} onClick={onConfirm}>
//             Очистити кошик і перейти
//           </button>
//           <button type="button" className={styles.cancel} onClick={onCancel}>
//             Скасувати
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

function formatRestaurantName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
}

