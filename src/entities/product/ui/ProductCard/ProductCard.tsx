import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart, selectCartItems, type CartItem } from "@/entities/cart";
import type { Product } from "../../model/types";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cartItem = cartItems.find((item: CartItem) => item._id === product._id);

  const handleClick = () => {
    if (cartItem) {
      navigate("/cart");
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={product.imageUrl}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>
        Ціна: <strong>{product.price} ₴</strong>
      </div>
      <button
        type="button"
        className={cartItem ? `${styles.button} ${styles.buttonInCart}` : styles.button}
        onClick={handleClick}
      >
        {cartItem ? (
          <>
            <ShoppingCartIcon />
            <span>В кошику</span>
          </>
        ) : (
          "Додати до кошика"
        )}
      </button>
    </div>
  );
}

