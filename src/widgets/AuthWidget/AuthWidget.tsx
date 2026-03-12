import { useState } from "react";
import { LoginForm } from "@/features/auth";
import { RegisterForm } from "@/features/auth/register";
import styles from "./AuthWidget.module.scss";

type AuthTab = "login" | "register";

export function AuthWidget() {
  const [tab, setTab] = useState<AuthTab>("login");

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === "login" ? styles.activeTab : ""}`}
          onClick={() => setTab("login")}
        >
          Увійти
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === "register" ? styles.activeTab : ""}`}
          onClick={() => setTab("register")}
        >
          Зареєструватися
        </button>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formSlider} data-tab={tab}>
          <div className={styles.form}>
            <LoginForm />
          </div>

          <div className={styles.form}>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

