import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Données de chatbots hardcodées
    const chatbots = [
      {
        "label": "Assistant Documentation Technique",
        "description": "Répond aux questions sur la documentation technique",
        "accesskeys": "550e8400-e29b-41d4-a716-446655440000"
      },
      {
        "label": "Assistant Marketing",
        "description": "Aide à créer des stratégies marketing efficaces",
        "accesskeys": "550e8400-e29b-41d4-a716-446655440001"
      },
      {
        "label": "Conseiller Financier",
        "description": "Donne des conseils sur les investissements et la gestion financière",
        "accesskeys": "550e8400-e29b-41d4-a716-446655440002"
      },
      {
        "label": "Assistant RH",
        "description": "Aide avec les politiques RH et le recrutement",
        "accesskeys": "550e8400-e29b-41d4-a716-446655440003"
      },
      {
        "label": "Support Technique",
        "description": "Résout les problèmes techniques",
        "accesskeys": "550e8400-e29b-41d4-a716-446655440004"
      }
    ];
    
    return NextResponse.json({ chatbots });
  } catch (error) {
    console.error('Erreur lors de la récupération des chatbots:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des chatbots' },
      { status: 500 }
    );
  }
}