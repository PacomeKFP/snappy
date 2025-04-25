// app/instances/[accessKey]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineChatAlt, HiOutlinePlus, HiChevronRight, HiArrowLeft, HiRefresh } from 'react-icons/hi';
import { createChatInstance } from '../../../lib/api';

export default function InstancesPage({ params }) {


  const { accesskey } = params;
  const router = useRouter();
  const [instances, setInstances] = useState([]);
  const [chatbotInfo, setChatbotInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function fetchInstances() {
      try {
        setLoading(true);
        // Récupérer la liste des instances pour cette clé d'accès

        console.log(`http://localhost:8000/instances?accessKey=${accesskey}`);
        const response = await fetch(`http://localhost:8000/instances?accessKey=${accesskey}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Impossible de récupérer les instances');
        }
        
        const data = await response.json();
        setInstances(data.instances);
        setChatbotInfo(data.chatbotInfo);
      } catch (err) {
        setError('Erreur lors de la récupération des instances');
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchInstances();
  }, [accesskey]);

  const handleCreateInstance = async () => {
    try {
      setCreating(true);
      const response = await createChatInstance(accesskey);
      
      if (response && response.idInstanceChat) {
        router.push(`/chat/${response.idInstanceChat}`);
      }
    } catch (err) {
      setError('Erreur lors de la création d\'une nouvelle instance');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleSelectInstance = (idInstanceChat) => {
    router.push(`/chat/${idInstanceChat}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <HiArrowLeft className="mr-2 h-5 w-5" />
            Retour à laccueil
          </button>
          
          {chatbotInfo && (
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <h1 className="text-2xl font-bold text-gray-900">{chatbotInfo.label}</h1>
              <p className="text-gray-600 mt-1">{chatbotInfo.description}</p>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Instances de conversation</h2>
              <button
                onClick={() => window.location.reload()}
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <HiRefresh className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="p-6 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
                <p>{error}</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {instances.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-6 mb-4">
                    <HiOutlineChatAlt className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="mb-4">Aucune instance de conversation trouvée</p>
                  <p className="text-sm">Créez une nouvelle conversation pour commencer</p>
                </div>
              ) : (
                instances.map((instance) => (
                  <div 
                    key={instance.idInstanceChat}
                    onClick={() => handleSelectInstance(instance.idInstanceChat)}
                    className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-500/10 rounded-full p-3 mr-4">
                          <HiOutlineChatAlt className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Conversation {instance.index}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Créée le {new Date(instance.created_at).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {instance.messages_count} messages
                          </p>
                        </div>
                      </div>
                      <HiChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleCreateInstance}
              disabled={creating}
              className="flex items-center justify-center w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {creating ? (
                <span className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2" />
              ) : (
                <HiOutlinePlus className="h-5 w-5 mr-2" />
              )}
              Nouvelle conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}