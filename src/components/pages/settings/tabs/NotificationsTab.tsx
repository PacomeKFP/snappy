interface AlanTabProps {
  notifications: Record<string, boolean>;
  onNotificationChange: (type: string) => void;
}

export const AlanTab: React.FC<AlanTabProps> = ({
  notifications,
  onNotificationChange,
}) => (
  <div className="space-y-6">
    <div className="rounded-lg bg-white shadow dark:bg-gray-800 dark:shadow-dark">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">
          Notification Preferences
        </h3>
        <div className="mt-6 space-y-6">
          {Object.entries(notifications).map(([type, enabled]) => (
            <div key={type} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium capitalize text-gray-900">
                  {type} Notifications
                </h4>
                <p className="text-sm text-gray-500">
                  Receive notifications via {type}
                </p>
              </div>
              <button
                onClick={() => onNotificationChange(type)}
                className={`${
                  enabled ? "bg-purple-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    enabled ? "translate-x-5" : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
