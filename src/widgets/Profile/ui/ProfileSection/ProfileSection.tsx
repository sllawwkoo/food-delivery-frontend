import { useState } from "react";
import { Container } from "@/shared/ui/Container";
import { ProfileSettingsView } from "@/features/profile/profileSettings";
import { OrdersList } from "../OrdersList";
import styles from "./ProfileSection.module.scss";

type TabId = "settings" | "orders";

const TABS: { id: TabId; label: string }[] = [
  { id: "settings", label: "Налаштування" },
  { id: "orders", label: "Замовлення" },
];

export function ProfileSection() {
  const [activeTab, setActiveTab] = useState<TabId>("settings");

  return (
    <Container>
      <section className={styles.section}>
        <h1 className={styles.title}>Мій профіль</h1>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.profileLayout}>
          <div className={styles.sidebar}>
            <h2 className={styles.columnTitle}>Налаштування</h2>
            <ProfileSettingsView />
          </div>
          <div className={styles.main}>
            <h2 className={styles.columnTitle}>Замовлення</h2>
            <OrdersList />
          </div>
        </div>
        <div className={styles.mobileContent}>
          {activeTab === "settings" && <ProfileSettingsView />}
          {activeTab === "orders" && <OrdersList />}
        </div>
      </section>
    </Container>
  );
}
