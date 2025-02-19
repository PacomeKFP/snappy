'use client';
import { useEffect, useState } from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function Custom404() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated 404 Text */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-200 animate-pulse">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">
              {count === 0 && "🤔"}
              {count === 1 && "🧐"}
              {count === 2 && "😅"}
              {count === 3 && "🫣"}
            </span>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Oops! Page not found
          </h2>
          <p className="text-gray-600">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all duration-150 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-150 hover:scale-105"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}