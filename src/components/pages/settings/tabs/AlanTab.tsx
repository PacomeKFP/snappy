import React, { useState } from "react";
import { Copy, Eye, EyeOff, RefreshCw, Shield, UserPlus } from "lucide-react";
import { toast } from "sonner";

export const AlanTab: React.FC = () => {
  const [modelVersion, setModelVersion] = useState("Alan Assistant v2.0");
  const [apiKey, setApiKey] = useState("ak-alan-replacement-assistant");
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("Je suis Alan, un assistant IA conçu pour remplacer complètement son utilisateur dans les conversations. Je dois adopter l'identité, le style et le ton de mon'utilisateur avec une certaine précision .");
  
  const [replacementSettings, setReplacementSettings] = useState({
    contextRetention: 95,
    styleAdaptation: 90,
    personalityMimicry: 85
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.info(`Copié : ${text}`);
      })
      .catch((err) => {
        toast.error("Échec de la copie");
      });
  };

  const regenerateApiKey = () => {
    // Mock key regeneration
    setApiKey(`ak-alan-${Math.random().toString(36).substring(7)}`);
    toast.success("Nouvelle clé API générée");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:shadow-dark">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Configuration d'Alan
        </h3>

        {/* Replacement Capabilities Section */}
        <div className="mb-4">
          <h4 className="mb-3 text-md font-semibold flex items-center">
            <Shield className="mr-2 text-purple-600" size={20} />
            Capacités de Remplacement
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rétention Contextuelle
              </label>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{width: `${replacementSettings.contextRetention}%`}}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {replacementSettings.contextRetention}%
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adaptation de Style
              </label>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{width: `${replacementSettings.styleAdaptation}%`}}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {replacementSettings.styleAdaptation}%
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mimétisme Personnalité
              </label>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{width: `${replacementSettings.personalityMimicry}%`}}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {replacementSettings.personalityMimicry}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Model Version Section */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Version du modèle
          </label>
          <div className="flex items-center">
            <div className="flex-grow truncate rounded-md bg-gray-100 px-3 py-2">
              {modelVersion}
            </div>
          </div>
        </div>

        {/* API Key Section */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Clé API
          </label>
          <div className="flex items-center">
            <div className="mr-2 flex-grow truncate rounded-md bg-gray-100 px-3 py-2">
              {isApiKeyVisible ? apiKey : "*".repeat(apiKey.length)}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                className="rounded-md bg-purple-50 p-2 text-purple-600 transition-colors hover:bg-purple-100"
                aria-label="Basculer la visibilité de la clé API"
              >
                {isApiKeyVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <button
                onClick={() => copyToClipboard(apiKey)}
                className="rounded-md bg-purple-50 p-2 text-purple-600 transition-colors hover:bg-purple-100"
                aria-label="Copier la clé API"
              >
                <Copy size={20} />
              </button>
              <button
                onClick={regenerateApiKey}
                className="rounded-md bg-purple-50 p-2 text-purple-600 transition-colors hover:bg-purple-100"
                aria-label="Régénérer la clé API"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* System Prompt Section */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Prompt système
          </label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default AlanTab;