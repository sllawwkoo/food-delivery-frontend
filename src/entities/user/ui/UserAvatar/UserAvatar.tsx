import styles from "./UserAvatar.module.scss";

export type UserAvatarVariant = "default" | "profile";

type UserAvatarProps = {
  name: string;
  image?: string | null;
  /** Варіант відображення: default — як у хедері (малий, з бордером); profile — великий, без бордера */
  variant?: UserAvatarVariant;
};

export function UserAvatar({ name, image, variant = "default" }: UserAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();
  const isProfile = variant === "profile";

  return (
    <div
      className={isProfile ? `${styles.wrapper} ${styles.wrapperProfile}` : styles.wrapper}
      role="img"
      aria-label={name}
    >
      {image ? (
        <img src={image} alt={name} className={styles.image} />
      ) : (
        <div className={styles.initial}>{initial}</div>
      )}
    </div>
  );
}
