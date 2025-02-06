'use client';
import React, { useEffect, useState } from 'react';
import { MessageSquare, Shield, Zap, Globe, Users, Clock } from 'lucide-react';

const LandingPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
            setIsVisible(true);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header - Animation au scroll */}
            <header className={`bg-blue-600 text-white py-6 fixed w-full z-10 transition-all duration-300 ${
                scrollPosition > 50 ? 'bg-opacity-95 shadow-lg' : ''
            }`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <MessageSquare className="w-6 h-6 animate-bounce" />
                        <div className="text-2xl font-bold">Snappy Chat</div>
                    </div>
                    <nav className="hidden md:block">
                        <a href="#features" className="mx-2 hover:text-blue-200 transition-colors duration-300">Fonctionnalités</a>
                        <a href="#communication" className="mx-2 hover:text-blue-200 transition-colors duration-300">Communication</a>
                        <a href="#security" className="mx-2 hover:text-blue-200 transition-colors duration-300">Sécurité</a>
                        <a href="#testimonials" className="mx-2 hover:text-blue-200 transition-colors duration-300">Témoignages</a>
                        <a href="#pricing" className="mx-2 hover:text-blue-200 transition-colors duration-300">Prix</a>
                    </nav>
                    <div className="space-x-4">
                        <a href="/signin" className="hover:text-blue-200 transition-colors duration-300">Connexion</a>
                        <a href="/signin" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105">S'inscrire</a>
                    </div>
                </div>
            </header>

            {/* Hero Section avec animation et image */}
            <section className="bg-blue-600 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                    <img src="/api/placeholder/800/600" alt="Background pattern" className="w-full h-full object-cover" />
                </div>
                <div className="container mx-auto px-4 text-center relative">
                    <h1 className="text-5xl font-bold mb-4 animate-fade-in">Communication instantanée pour votre équipe</h1>
                    <p className="text-xl mb-8 animate-fade-in-delay">Plateforme de messagerie sécurisée et intuitive pour une collaboration efficace.</p>
                    <div className="flex justify-center space-x-4">
                        <a href="/signin" className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105 transform">
                            Essai gratuit 14 jours
                        </a>
                        <a href="#demo" className="border-2 border-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300">
                            Voir la démo
                        </a>
                    </div>
                    <div className="mt-12">
                        <img src="/api/placeholder/800/400" alt="Interface de messagerie" className="rounded-lg shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>
            </section>

            {/* Features Section avec animations au scroll */}
            <section id="features" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
                                title: "Messages instantanés",
                                description: "Échangez des messages en temps réel avec votre équipe.",
                                image: "/public/images/task/task-01.jpg"
                            },
                            {
                                icon: <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
                                title: "Salons thématiques",
                                description: "Créez des canaux dédiés pour chaque projet ou équipe.",
                                image: "/api/placeholder/400/300"
                            },
                            {
                                icon: <Globe className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
                                title: "Partage de fichiers",
                                description: "Partagez facilement documents, images et fichiers.",
                                image: "/api/placeholder/400/300"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
                                {feature.icon}
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="mb-4">{feature.description}</p>
                                <img src={feature.image} alt={feature.title} className="rounded-lg w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interface Demo Section */}
            <section id="demo" className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Découvrez notre interface</h2>
                    <div className="relative">
                        <img src="/api/placeholder/1200/600" alt="Interface demo" className="rounded-lg shadow-2xl mx-auto" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <button className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors duration-300">
                                <Zap className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Section avec animations */}
            <section id="security" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Sécurité renforcée</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                            <Shield className="w-8 h-8 mb-4 text-blue-600 animate-pulse" />
                            <h3 className="text-xl font-bold mb-4">Chiffrement de bout en bout</h3>
                            <p className="mb-4">Vos messages sont protégés par un chiffrement avancé.</p>
                            <img src="/api/placeholder/500/300" alt="Sécurité" className="rounded-lg w-full" />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                            <Users className="w-8 h-8 mb-4 text-blue-600 animate-pulse" />
                            <h3 className="text-xl font-bold mb-4">Contrôle d'accès</h3>
                            <p className="mb-4">Gérez finement les permissions de vos utilisateurs.</p>
                            <img src="/api/placeholder/500/300" alt="Contrôle d'accès" className="rounded-lg w-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section avec hover effects */}
            <section id="pricing" className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Tarifs adaptés à vos besoins</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Starter",
                                price: "0€/mois",
                                features: ["Jusqu'à 10 utilisateurs", "Messages illimités", "5 GB stockage", "Support email"]
                            },
                            {
                                title: "Pro",
                                price: "29€/mois",
                                features: ["Jusqu'à 100 utilisateurs", "Messages illimités", "50 GB stockage", "Support prioritaire", "Intégrations avancées"],
                                popular: true
                            },
                            {
                                title: "Entreprise",
                                price: "Sur mesure",
                                features: ["Utilisateurs illimités", "Messages illimités", "Stockage illimité", "Support 24/7", "API personnalisée", "SLA garanti"]
                            }
                        ].map((plan, index) => (
                            <div key={index} className={`bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300 ${
                                plan.popular ? 'border-2 border-blue-600' : ''
                            }`}>
                                {plan.popular && (
                                    <div className="bg-blue-600 text-white py-1 px-4 rounded-full text-sm inline-block mb-4">Plus populaire</div>
                                )}
                                <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                                <p className="text-2xl font-bold mb-4">{plan.price}</p>
                                <ul className="mb-8 space-y-3">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex}>{feature}</li>
                                    ))}
                                </ul>
                                <a href={plan.title === "Entreprise" ? "/contact" : "/signin"}
                                   className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 inline-block">
                                    {plan.title === "Entreprise" ? "Nous contacter" : "Commencer"}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer avec effet de hover */}
            <footer className="bg-blue-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {[
                            {
                                title: "Produit",
                                links: [
                                    { text: "Fonctionnalités", href: "#features" },
                                    { text: "Sécurité", href: "#security" },
                                    { text: "Tarifs", href: "#pricing" }
                                ]
                            },
                            {
                                title: "Entreprise",
                                links: [
                                    { text: "À propos", href: "/about" },
                                    { text: "Blog", href: "/blog" },
                                    { text: "Carrières", href: "/careers" }
                                ]
                            },
                            {
                                title: "Support",
                                links: [
                                    { text: "Centre d'aide", href: "/help" },
                                    { text: "Contact", href: "/contact" },
                                    { text: "Statut", href: "/status" }
                                ]
                            },
                            {
                                title: "Légal",
                                links: [
                                    { text: "Confidentialité", href: "/privacy" },
                                    { text: "Conditions", href: "/terms" },
                                    { text: "RGPD", href: "/gdpr" }
                                ]
                            }
                        ].map((section, index) => (
                            <div key={index}>
                                <h4 className="font-bold mb-4">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href={link.href} className="hover:text-blue-200 transition-colors duration-300">
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
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