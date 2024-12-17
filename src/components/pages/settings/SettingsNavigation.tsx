interface SettingsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SettingsNavigation: React.FC<SettingsNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = ["General", "Notifications", "Security", "Billing"];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.toLowerCase()}
            onClick={() => onTabChange(tab.toLowerCase())}
            className={`${
              activeTab === tab.toLowerCase()
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};
