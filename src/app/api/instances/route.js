// app/api/instances/route.js
import { NextResponse } from 'next/server';

// Données fictives pour la démo
const chatbots = {
  '550e8400-e29b-41d4-a716-446655440000': {
    label: 'Assistant Documentation Technique',
    description: 'Répond aux questions sur la documentation technique'
  },
  '550e8400-e29b-41d4-a716-446655440001': {
    label: 'Assistant Marketing',
    description: 'Aide à créer des stratégies marketing efficaces'
  },
  // ... autres chatbots
};

const instances = {
  '550e8400-e29b-41d4-a716-446655440000': [
    {
      idInstanceChat: 'instance-1',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 jours avant
      messages_count: 24,
      index: 1
    },
    {
      idInstanceChat: 'instance-2',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 jours avant
      messages_count: 12,
      index: 2
    },
    {
      idInstanceChat: 'instance-3',
      created_at: new Date().toISOString(), // aujourd'hui
      messages_count: 3,
      index: 3
    }
  ],
  // ... instances pour les autres chatbots
};

// app/api/instances/route.js (suite)
export async function GET(request) {
    const url = new URL(request.url);
    const accessKey = url.searchParams.get('accessKey');
    
    // Vérifier si la clé d'accès existe
    if (!chatbots[accessKey]) {
      return NextResponse.json(
        { error: 'Clé d\'accès invalide' },
        { status: 404 }
      );
    }
    
    // Récupérer les instances pour cette clé d'accès
    const chatbotInstances = instances[accessKey] || [];
    
    // Récupérer les informations du chatbot
    const chatbotInfo = chatbots[accessKey];
    
    return NextResponse.json({
      chatbotInfo,
      instances: chatbotInstances
    });
  }