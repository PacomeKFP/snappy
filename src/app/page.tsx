// File: app/page.tsx
'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-snappy-white">
      <h1 className="text-4xl font-bold mb-8 text-snappy-black">Bienvenue sur Snappy</h1>
      <nav className="space-y-4">
        <Link href="/login" className="block px-6 py-2 bg-snappy-first-blue text-snappy-white rounded-md hover:bg-snappy-second-blue transition duration-300">
          Se connecter
        </Link>
        <Link href="/register" className="block px-6 py-2 bg-snappy-first-blue text-snappy-white rounded-md hover:bg-snappy-second-blue transition duration-300">
          S&apos;inscrire
        </Link>
        
      
      </nav>
    </div>
  )
}