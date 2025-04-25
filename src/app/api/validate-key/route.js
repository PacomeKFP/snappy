// app/api/validate-key/route.js
import { NextResponse } from 'next/server';

const validKeys = [
  '550e8400-e29b-41d4-a716-446655440000',
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440004'
];

export async function GET(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  
  // Vérifier si la clé est valide
  const valid = validKeys.includes(key);
  
  return NextResponse.json({ valid });
}