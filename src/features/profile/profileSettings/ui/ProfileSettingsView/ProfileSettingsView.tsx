import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@/shared/ui/Modal";
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
    <div className={styles.root}>
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt className={styles.term}>Ім'я</dt>
          <dd className={styles.value}>{user.name ?? "—"}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.term}>Email</dt>
          <dd className={styles.value}>{user.email}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.term}>Телефон</dt>
          <dd className={styles.value}>{user.phone ?? "—"}</dd>
        </div>
      </dl>
      <button type="button" className={styles.editButton} onClick={openModal}>
        Редагувати профіль
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
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
