import styles from "./EmptyState.module.scss";

type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className={styles.root}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
