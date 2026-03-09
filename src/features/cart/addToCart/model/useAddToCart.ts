import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, selectCartItems } from "@/entities/cart";
import type { Product } from "@/entities/product";

export function useAddToCart(product: Product) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const isInCart = useMemo(
    () => cartItems.some((item) => item._id === product._id),
    [cartItems, product._id],
  );

  const handleClick = useCallback(() => {
    if (isInCart) {
      navigate("/cart");
    } else {
      dispatch(addToCart(product));
    }
  }, [dispatch, navigate, isInCart, product]);

  return { isInCart, handleClick };
}

