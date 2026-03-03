import type { ComponentPropsWithoutRef } from "react";
import { ThreeDot } from "react-loading-indicators";
import styles from "./Loader.module.scss";

type LoaderSize = "small" | "medium" | "large";

type LoaderProps = {
  /**
   * Розмір лоадера.
   * За замовчуванням використовується "medium".
   */
  size?: LoaderSize;
  /**
   * Додатковий CSS-клас для зовнішнього контейнера.
   */
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className">;

const sizeMap: Record<LoaderSize, ComponentPropsWithoutRef<typeof ThreeDot>["size"]> =
  {
    small: "small",
    medium: "medium",
    large: "large",
  };

export function Loader({ size = "medium", className, ...rest }: LoaderProps) {
  const wrapperClassName = className
    ? `${styles.wrapper} ${className}`
    : styles.wrapper;

  return (
    <div className={wrapperClassName} {...rest}>
      <ThreeDot color="var(--color-primary)" size={sizeMap[size]} />
    </div>
  );
}

