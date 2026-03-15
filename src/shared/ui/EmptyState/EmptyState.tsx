import type { ReactNode } from "react";
import styles from "./EmptyState.module.scss";

type EmptyStateProps = {
  message: string;
  image?: string;
  action?: ReactNode;
};

export function EmptyState({ message, image, action }: EmptyStateProps) {
  return (
    <div className={styles.root}>
      {image != null && (
        <img src={image} alt="" className={styles.image} />
      )}
      <p className={styles.message}>{message}</p>
      {action != null && <div className={styles.action}>{action}</div>}
    </div>
  );
}
