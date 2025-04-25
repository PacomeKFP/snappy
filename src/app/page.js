// app/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import Image from 'next/image';
import { HiChevronRight, HiKey } from 'react-icons/hi';

export default function Home() {
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!accessKey.trim()) {
      setError('Veuillez entrer une clé d\'accès');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Vérifier si la clé d'accès est valide
      const response = await fetch(`/api/validate-key?key=${encodeURIComponent(accessKey)}`);
      const data = await response.json();
      
      if (data.valid) {
        // Rediriger vers la page des instances si valide
        console.log(accessKey)
        router.push(`/instances/${accessKey}`);

      } else {
        setError('Clé d\'accès invalide. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary/90 to-primary pt-20 pb-32 px-4 sm:px-6 lg:px-8 text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Chatbot RAG Professionnel
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Une plateforme puissante pour interagir avec des chatbots intelligents basés sur vos documents et connaissances spécifiques.
          </p>
        </div>
      </div>
      
      {/* Access key form */}
      <div className="max-w-md mx-auto -mt-16 px-4 sm:px-0">
        <div className="bg-blue-50 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Accéder à vos chatbots
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="accessKey" className="block text-sm font-medium text-gray-700 mb-1">
                  Clé daccès
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiKey className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="accessKey"
                    type="text"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    placeholder="Entrez votre clé d'accès"
                    className="pl-10 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                {loading ? (
                  <span className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    Continuer <HiChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
            
            {/* Demo access */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Pas de clé daccès ? Essayez notre{' '}
                <button 
                  onClick={() => setAccessKey('550e8400-e29b-41d4-a716-446655440000')}
                  className="text-blue-500 hover:text-blue-500/80 font-medium"
                >
                  démo
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Caractéristiques principales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="RAG avancé"
              description="Utilisation de la technologie de génération augmentée par récupération pour des réponses précises basées sur vos documents."
              icon={<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            />
            <FeatureCard
              title="Conversations multiples"
              description="Gérez plusieurs instances de conversation avec le même chatbot pour différents contextes ou utilisateurs."
              icon={<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>}
            />
            <FeatureCard
              title="Historique complet"
              description="Accédez à l'historique complet de vos conversations pour référence et continuité."
              icon={<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-blue-500/10 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <div className="rounded-full bg-blue-500/10 p-3 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}