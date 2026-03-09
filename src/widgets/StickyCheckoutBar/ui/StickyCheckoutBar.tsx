import styles from "./StickyCheckoutBar.module.scss";

type StickyCheckoutBarProps = {
  total: number;
  onCheckout: () => void;
};

export function StickyCheckoutBar({ total, onCheckout }: StickyCheckoutBarProps) {
  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.button}
        onClick={onCheckout}
      >
        Оформити замовлення • {total} ₴
      </button>
    </div>
  );
}

