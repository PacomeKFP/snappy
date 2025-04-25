// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chatbot RAG Professionnel',
  description: 'Plateforme de chatbot RAG basée sur vos documents'
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <div className="flex-grow">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Chatbot RAG Pro</h3>
                <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} - Tous droits réservés</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  <li><a href="#" className="hover:text-white">Accueil</a></li>
                  <li><a href="#" className="hover:text-white">Documentation</a></li>
                  <li><a href="#" className="hover:text-white">API</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}