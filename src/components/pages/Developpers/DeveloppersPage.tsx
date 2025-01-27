"use client";
import React from "react";
import { DeveloppersHeader } from "./DeveloppersHeader";
//import { DeveloppersNavigation } from "./DeveloppersNavigation";
import SecurityTab from "@/components/pages/settings/tabs/SecurityTab";
import AlanTab from "@/components/pages/settings/tabs/AlanTab";

export const DeveloppersPage = () => {
  const [activeTab, setActiveTab] = React.useState("API Doc");
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    monthly: true,
  });

  const renderActiveTab = () => {
    switch (activeTab) {
      case "API Doc":
        return <SecurityTab />;
      case "Chat example":
        return <AlanTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0 transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-auto">
        <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800 dark:shadow-dark">
          <DeveloppersHeader />
          {/*<DeveloppersNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />*/}
          <div className="p-6 dark:bg-gray-800 dark:shadow-dark">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};