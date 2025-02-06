import React from 'react';
import { MessageSquare, Shield, Zap, Globe, Users, Clock } from 'lucide-react';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-6 fixed w-full z-10">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <MessageSquare className="w-6 h-6" />
                        <div className="text-2xl font-bold">Snappy Chat</div>
                    </div>
                    <nav className="hidden md:block">
                        <a href="#features" className="mx-2 hover:text-blue-200">Fonctionnalités</a>
                        <a href="#communication" className="mx-2 hover:text-blue-200">Communication</a>
                        <a href="#security" className="mx-2 hover:text-blue-200">Sécurité</a>
                        {/* <a href="#testimonials" className="mx-2 hover:text-blue-200">Témoignages</a> */}
                        <a href="#pricing" className="mx-2 hover:text-blue-200">Prix</a>
                    </nav>
                    <div className="space-x-4">
                        <a href="/signin" className="hover:text-blue-200">Connexion</a>
                        <a href="/signin" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">S'inscrire</a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-blue-600 text-white pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Communication instantanée pour votre équipe</h1>
                    <p className="text-xl mb-8">Plateforme de messagerie sécurisée et intuitive pour une collaboration efficace.</p>
                    <div className="flex justify-center space-x-4">
                        <a href="/signin" className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-100">
                            Essai gratuit 14 jours
                        </a>
                        <a href="#demo" className="border-2 border-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
                            Voir la démo
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                            <h3 className="text-xl font-bold mb-4">Messages instantanés</h3>
                            <p>Échangez des messages en temps réel avec votre équipe.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                            <h3 className="text-xl font-bold mb-4">Salons thématiques</h3>
                            <p>Créez des canaux dédiés pour chaque projet ou équipe.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <Globe className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                            <h3 className="text-xl font-bold mb-4">Partage de fichiers</h3>
                            <p>Partagez facilement documents, images et fichiers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Communication Section */}
            <section id="communication" className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Communication avancée</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <Clock className="w-8 h-8 mb-4 text-blue-600" />
                            <h3 className="text-xl font-bold mb-4">Messages programmés</h3>
                            <p>Planifiez vos messages pour une diffusion ultérieure.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <Zap className="w-8 h-8 mb-4 text-blue-600" />
                            <h3 className="text-xl font-bold mb-4">Réponses rapides</h3>
                            <p>Utilisez des réponses prédéfinies pour gagner du temps.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section id="security" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Sécurité renforcée</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <Shield className="w-8 h-8 mb-4 text-blue-600" />
                            <h3 className="text-xl font-bold mb-4">Chiffrement de bout en bout</h3>
                            <p>Vos messages sont protégés par un chiffrement avancé.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <Users className="w-8 h-8 mb-4 text-blue-600" />
                            <h3 className="text-xl font-bold mb-4">Contrôle d'accès</h3>
                            <p>Gérez finement les permissions de vos utilisateurs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Tarifs adaptés à vos besoins</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-bold mb-4">Starter</h3>
                            <p className="text-2xl font-bold mb-4">0€/mois</p>
                            <ul className="mb-8 space-y-3">
                                <li>Jusqu'à 10 utilisateurs</li>
                                <li>Messages illimités</li>
                                <li>5 GB stockage</li>
                                <li>Support email</li>
                            </ul>
                            <a href="/signin" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block">Commencer</a>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center transform scale-105 border-2 border-blue-600">
                            <div className="bg-blue-600 text-white py-1 px-4 rounded-full text-sm inline-block mb-4">Plus populaire</div>
                            <h3 className="text-xl font-bold mb-4">Pro</h3>
                            <p className="text-2xl font-bold mb-4">29€/mois</p>
                            <ul className="mb-8 space-y-3">
                                <li>Jusqu'à 100 utilisateurs</li>
                                <li>Messages illimités</li>
                                <li>50 GB stockage</li>
                                <li>Support prioritaire</li>
                                <li>Intégrations avancées</li>
                            </ul>
                            <a href="/signin" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block">Commencer</a>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-bold mb-4">Entreprise</h3>
                            <p className="text-2xl font-bold mb-4">Sur mesure</p>
                            <ul className="mb-8 space-y-3">
                                <li>Utilisateurs illimités</li>
                                <li>Messages illimités</li>
                                <li>Stockage illimité</li>
                                <li>Support 24/7</li>
                                <li>API personnalisée</li>
                                <li>SLA garanti</li>
                            </ul>
                            <a href="/contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block">Nous contacter</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold mb-4">Produit</h4>
                            <ul className="space-y-2">
                                <li><a href="#features" className="hover:text-blue-200">Fonctionnalités</a></li>
                                <li><a href="#security" className="hover:text-blue-200">Sécurité</a></li>
                                <li><a href="#pricing" className="hover:text-blue-200">Tarifs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Entreprise</h4>
                            <ul className="space-y-2">
                                <li><a href="/about" className="hover:text-blue-200">À propos</a></li>
                                <li><a href="/blog" className="hover:text-blue-200">Blog</a></li>
                                <li><a href="/careers" className="hover:text-blue-200">Carrières</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="/help" className="hover:text-blue-200">Centre d'aide</a></li>
                                <li><a href="/contact" className="hover:text-blue-200">Contact</a></li>
                                <li><a href="/status" className="hover:text-blue-200">Statut</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Légal</h4>
                            <ul className="space-y-2">
                                <li><a href="/privacy" className="hover:text-blue-200">Confidentialité</a></li>
                                <li><a href="/terms" className="hover:text-blue-200">Conditions</a></li>
                                <li><a href="/gdpr" className="hover:text-blue-200">RGPD</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-blue-500 pt-8 text-center">
                        <p>&copy; 2024 Snappy Chat. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;