import React from 'react';
import Link from 'next/link';
import { MessageCircle, Shield, Zap, Users } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-[#247EE4]" />,
      title: "Messagerie Instantanée",
      description: "Communiquez en temps réel avec vos proches"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#FF8000]" />,
      title: "Sécurisé",
      description: "Vos conversations sont protégées"
    },
    {
      icon: <Zap className="w-8 h-8 text-[#14F400]" />,
      title: "Ultra Rapide",
      description: "Performance optimale garantie"
    },
    {
      icon: <Users className="w-8 h-8 text-[#0069E0]" />,
      title: "Groupes Illimités",
      description: "Créez autant de groupes que vous voulez"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#D9D9D9]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-[#171717] mb-6">
              Bienvenue sur <span className="text-[#247EE4]">Snappy</span>
            </h1>
            <p className="text-xl text-[#322F44] mb-12 max-w-2xl mx-auto">
              La messagerie nouvelle génération qui vous rapproche de vos proches en toute simplicité
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/register" 
                className="px-8 py-3 bg-[#247EE4] text-white rounded-lg font-semibold hover:bg-[#0069E0] transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Commencer
              </Link>
              <Link 
                href="/login" 
                className="px-8 py-3 bg-white text-[#171717] rounded-lg font-semibold hover:bg-[#D9D9D9] border border-[#171717] transform hover:scale-105 transition-all duration-300"
              >
                Se Connecter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#171717] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#322F44]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#171717] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 Snappy. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}