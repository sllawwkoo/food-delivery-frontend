import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@/shared/ui/Modal";
import { UserAvatar } from "@/entities/user";
import { selectAuthUser } from "@/features/auth/api/authSlice";
import { ProfileSettingsForm } from "../ProfileSettingsForm";
import styles from "./ProfileSettingsView.module.scss";

export function ProfileSettingsView() {
  const user = useSelector(selectAuthUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return null;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.card}>
      <UserAvatar name={user.name ?? user.email} image={user.avatar} variant="profile" />
      <ul className={styles.infoList}>
        <li className={styles.infoItem}>
          <span className={styles.label}>Ім'я</span>
          <span className={styles.value}>{user.name ?? "—"}</span>
        </li>
        <li className={styles.infoItem}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user.email}</span>
        </li>
        <li className={styles.infoItem}>
          <span className={styles.label}>Телефон</span>
          <span className={styles.value}>{user.phone ?? "—"}</span>
        </li>
      </ul>
      <button type="button" className={styles.editButton} onClick={openModal}>
        Редагувати профіль
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} ariaLabelledBy="profile-settings-title">
        <ProfileSettingsForm
          initialValues={{
            name: user.name ?? undefined,
            email: user.email,
            phone: user.phone ?? undefined,
          }}
          onSuccess={closeModal}
          />
      </Modal>
    </div>
  );
}
