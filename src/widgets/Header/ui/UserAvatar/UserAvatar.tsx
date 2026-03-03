import { Link } from "react-router-dom";
import styles from "./UserAvatar.module.scss";

type UserAvatarProps = {
  name: string;
  image?: string | null;
};

export function UserAvatar({ name, image }: UserAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <Link to="/profile" className={styles.wrapper} aria-label="Профіль">
      {image ? (
        <img src={image} alt={name} className={styles.image} />
      ) : (
        <div className={styles.initial}>{initial}</div>
      )}
    </Link>
  );
}

