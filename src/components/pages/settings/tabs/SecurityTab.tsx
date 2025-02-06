import React, { useState } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/auth";

export const SecurityTab: React.FC = () => {
  // Generate mock UUIDs (in a real app, these would come from your backend)
  // const [projectId] = useState("550e8400-e29b-41d4-a716-446655440000");
  const {organization} = useAuth({middleware: 'auth'});
  // const [privateKey, setPrivateKey] = useState(
  //   "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  // );
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Optional: Add a temporary visual feedback
        toast.info(`Copied to clipboard: ${text}`);
      })
      .catch((err) => {
        toast.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:shadow-dark">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Security Settings
        </h3>

        {/* Project ID Section */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Project ID
          </label>
          <div className="flex items-center">
            <div className="mr-2 flex-grow truncate rounded-md bg-gray-100 px-3 py-2">
              {organization?.projectId}
            </div>
            <button
              onClick={() => organization && copyToClipboard(organization.projectId || '')}
              className="rounded-md bg-purple-50 p-2 text-purple-600 transition-colors hover:bg-purple-100"
              aria-label="Copy Project ID"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>

        {/* Private Key Section */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Private Key
          </label>
          <div className="flex items-center">
            <div className="mr-2 flex-grow truncate rounded-md bg-gray-100 px-3 py-2">
              {organization && (isPrivateKeyVisible ? organization.privateKey : "*".repeat(organization.privateKey.length))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsPrivateKeyVisible(!isPrivateKeyVisible)}
                className="rounded-md bg-purple-50 p-2 text-purple-600 transition-colors hover:bg-purple-100"
                aria-label="Toggle Private Key Visibility"
              >
                {isPrivateKeyVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <button
                onClick={() => organization && copyToClipboard(organization.privateKey)}
                className="rounded-md bg-purple-50 p-2 text-purple-600 transition-colors hover:bg-purple-100"
                aria-label="Copy Private Key"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {isPrivateKeyVisible
              ? "Keep your private key confidential"
              : "Click the eye icon to view your private key"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
