import { useState } from "react";
import { Container } from "@/shared/ui/Container";
import { ProfileSettingsView } from "@/features/profile/profileSettings";
import { OrdersList } from "../OrdersList";
import styles from "./ProfileSection.module.scss";

type TabId = "settings" | "orders";

const TABS: { id: TabId; label: string }[] = [
  { id: "settings", label: "Settings" },
  { id: "orders", label: "Orders" },
];

export function ProfileSection() {
  const [activeTab, setActiveTab] = useState<TabId>("settings");

  return (
    <Container>
      <section className={styles.section}>
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
        <div className={styles.content}>
          {activeTab === "settings" && <ProfileSettingsView />}
          {activeTab === "orders" && <OrdersList />}
        </div>
      </section>
    </Container>
  );
}
