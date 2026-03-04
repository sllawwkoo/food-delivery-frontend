import styles from "./UserAvatar.module.scss";

type UserAvatarProps = {
  name: string;
  image?: string | null;
};

export function UserAvatar({ name, image }: UserAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div className={styles.wrapper} role="img" aria-label={name}>
      {image ? (
        <img src={image} alt={name} className={styles.image} />
      ) : (
        <div className={styles.initial}>{initial}</div>
      )}
    </div>
  );
}
