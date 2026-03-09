import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { Product } from "@/entities/product";
import { useAddToCart } from "../model/useAddToCart";
import styles from "./AddToCartButton.module.scss";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { isInCart, handleClick } = useAddToCart(product);

  return (
    <button
      type="button"
      className={isInCart ? `${styles.button} ${styles.buttonInCart}` : styles.button}
      onClick={handleClick}
    >
      {isInCart ? (
        <>
          <ShoppingCartIcon />
          <span>В кошику</span>
        </>
      ) : (
        "Додати до кошика"
      )}
    </button>
  );
}

