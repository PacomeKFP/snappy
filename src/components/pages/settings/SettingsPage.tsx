"use client";
import React from "react";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsNavigation } from "./SettingsNavigation";
import { GeneralTab } from "./tabs/GeneralTab";
import { NotificationsTab } from "./tabs/NotificationsTab";
import SecurityTab from "@/components/pages/settings/tabs/SecurityTab";

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState("general");
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    monthly: true,
  });

  const handleNotificationChange = (type: string) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "general":
        return <GeneralTab />;
      case "notifications":
        return (
          <NotificationsTab
            notifications={notifications}
            onNotificationChange={handleNotificationChange}
          />
        );
      case "security":
        return <SecurityTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0 transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-auto">
        <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800 dark:shadow-dark">
          <SettingsHeader />
          <SettingsNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="p-6 dark:bg-gray-800 dark:shadow-dark">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};
