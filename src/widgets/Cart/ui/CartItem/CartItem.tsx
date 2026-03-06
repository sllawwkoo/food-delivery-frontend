import { useDispatch } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { CartItem as CartItemType } from "@/entities/cart";
import { removeFromCart } from "@/features/remove-from-cart";
import { QuantityControls } from "@/features/change-cart-quantity";
import styles from "./CartItem.module.scss";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <article className={styles.root}>
      <img
        src={item.imageUrl}
        alt={item.title}
        className={styles.image}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.price}>{item.price} ₴</p>
        <QuantityControls itemId={item._id} quantity={item.quantity} />
      </div>
      <div className={styles.subtotal}>
        {item.price * item.quantity} ₴
      </div>
      <button
        type="button"
        className={styles.remove}
        onClick={() => dispatch(removeFromCart(item._id))}
        aria-label="Видалити з кошика"
      >
        <DeleteOutlineIcon className={styles.removeIcon} />
      </button>
    </article>
  );
}
