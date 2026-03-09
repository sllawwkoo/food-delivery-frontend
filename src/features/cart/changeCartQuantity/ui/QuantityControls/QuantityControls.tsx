import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { decreaseQuantity, increaseQuantity } from "@/entities/cart";
import styles from "./QuantityControls.module.scss";

type QuantityControlsProps = {
  itemId: string;
  quantity: number;
};

export function QuantityControls({ itemId, quantity }: QuantityControlsProps) {
  const dispatch = useDispatch();
  const isMinDisabled = quantity <= 1;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={() => dispatch(decreaseQuantity(itemId))}
        disabled={isMinDisabled}
        aria-label="Зменшити кількість"
      >
        <RemoveIcon className={styles.icon} />
      </button>
      <span className={styles.quantity} aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className={styles.button}
        onClick={() => dispatch(increaseQuantity(itemId))}
        aria-label="Збільшити кількість"
      >
        <AddIcon className={styles.icon} />
      </button>
    </div>
  );
}

