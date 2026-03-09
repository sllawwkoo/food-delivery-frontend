import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { CartItem as CartItemType } from "@/entities/cart";
import { removeFromCart } from "@/features/removeFromCart";
import { QuantityControls } from "@/features/changeCartQuantity";
import styles from "./CartItem.module.scss";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();
  const [animating, setAnimating] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const id = window.setTimeout(() => setAnimating(false), 300);
    return () => window.clearTimeout(id);
  }, [item.quantity]);

  const handleRemove = () => {
    if (isRemoving) {
      return;
    }
    setIsRemoving(true);
    window.setTimeout(() => {
      dispatch(removeFromCart(item._id));
    }, 250);
  };

  const rootClassName = [
    styles.root,
    animating ? styles.cartItemAdded : "",
    isRemoving ? styles.cartItemRemoving : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={rootClassName}
    >
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
        onClick={handleRemove}
        aria-label="Видалити з кошика"
      >
        <DeleteOutlineIcon className={styles.removeIcon} />
      </button>
    </article>
  );
}
