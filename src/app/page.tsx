'use client';
import React, { useEffect, useState } from 'react';
import { MessageSquare, Shield, Zap, Globe, ChevronDown, Users, Clock, Download, 
         MonitorSmartphone, Target, EyeIcon, MapPin, Flag, BarChart2, 
         CheckCircle, Award, Smartphone } from 'lucide-react';
import { translations } from '@/data/translations'; 

type SupportedLanguage = 'fr' | 'en' | 'de';

const LandingPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [language, setLanguage] = useState<SupportedLanguage>('fr');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const t = translations[language];

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
            setIsVisible(true);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    
    const languages = [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
    ];
    
    const changeLanguage = (langCode) => {
        setLanguage(langCode);
        setShowLanguageMenu(false);
    };

    // Updated feature section to use translations
    const featureItems = [
        {
            icon: <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            title: t.features.instantMessages.title,
            description: t.features.instantMessages.description,
            image: "/images/tests/chat-conversation-communication-connection-concept.jpg"
        },
        {
            icon: <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            title: t.features.thematicRooms.title,
            description: t.features.thematicRooms.description,
            image: "/images/tests/image.jpg"
        },
        {
            icon: <Globe className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            title: t.features.fileSharing.title,
            description: t.features.fileSharing.description,
            image: "/images/tests/2996467.jpg"
        },
        {
            icon: <Smartphone className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            title: t.features.mobileApp.title,
            description: t.features.mobileApp.description,
            image: "/api/placeholder/400/300"
        }
    ];

    // Enhanced about section with translations
    const aboutItems = [
        {
            icon: <Target className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            title: t.about.why.title,
            description: t.about.why.description
        },
        {
            icon: <EyeIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            title: t.about.vision.title,
            description: t.about.vision.description
        },
        {
            icon: <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            title: t.about.mission.title,
            description: t.about.mission.description
        },
        {
            icon: <Flag className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            title: t.about.objectives.title,
            description: t.about.objectives.description
        }
    ];

    // Updated security section with translations
    const securityItems = [
        {
            icon: <Shield className="w-8 h-8 mb-4 text-blue-600 animate-pulse" />,
            title: t.security.encryption.title,
            description: t.security.encryption.description,
            image: "images/tests/57811.jpg"
        },
        {
            icon: <Users className="w-8 h-8 mb-4 text-blue-600 animate-pulse" />,
            title: t.security.accessControl.title,
            description: t.security.accessControl.description,
            image: "/images/tests/3949019.jpg"
        },
        {
            icon: <CheckCircle className="w-8 h-8 mb-4 text-blue-600 animate-pulse" />,
            title: t.security.gdpr.title,
            description: t.security.gdpr.description,
            image: "/api/placeholder/400/300"
        }
    ];

    // Updated metrics section with translations
    const metricItems = [
        {
            icon: <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            value: t.metrics.users.value,
            title: t.metrics.users.title,
            description: t.metrics.users.description
        },
        {
            icon: <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            value: t.metrics.messages.value,
            title: t.metrics.messages.title,
            description: t.metrics.messages.description
        },
        {
            icon: <Globe className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            value: t.metrics.countries.value,
            title: t.metrics.countries.title,
            description: t.metrics.countries.description
        },
        {
            icon: <Award className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
            value: t.metrics.availability.value,
            title: t.metrics.availability.title,
            description: t.metrics.availability.description
        }
    ];

    // Updated pricing plans with translations
    const pricingPlans = [
        {
            title: t.pricing.free.title,
            price: t.pricing.free.price,
            features: t.pricing.free.features
        },
        {
            title: t.pricing.business.title,
            price: t.pricing.business.price,
            features: t.pricing.business.features,
            popular: true,
            popularText: t.pricing.business.popular
        },
        {
            title: t.pricing.enterprise.title,
            price: t.pricing.enterprise.price,
            features: t.pricing.enterprise.features
        }
    ];

    const footerSections = [
        {
            title: t.footer.product,
            links: [
                { text: t.nav.features, href: "#features" },
                { text: t.nav.security, href: "#security" },
                { text: t.nav.pricing, href: "#pricing" },
                { text: "API", href: "/api" },
                { text: "Intégrations", href: "/integrations" }
            ]
        },
        {
            title: t.footer.company,
            links: [
                { text: t.footer.about, href: "#about" },
                { text: t.footer.blog, href: "/blog" },
                { text: t.footer.careers, href: "/careers" },
                { text: "Partenaires", href: "/partners" },
                { text: "Press", href: "/press" }
            ]
        },
        {
            title: t.footer.support,
            links: [
                { text: t.footer.helpCenter, href: "/help" },
                { text: t.footer.contact, href: "/contact" },
                { text: t.footer.status, href: "/status" },
                { text: "FAQ", href: "/faq" },
                { text: "Documentation", href: "/docs" }
            ]
        },
        {
            title: t.footer.legal,
            links: [
                { text: t.footer.privacy, href: "/privacy" },
                { text: t.footer.terms, href: "/terms" },
                { text: t.footer.gdpr, href: "/gdpr" },
                { text: "Cookies", href: "/cookies" },
                { text: "Sécurité", href: "/security-policy" }
            ]
        }
    ];
    // Updated Header component with mobile menu
    const Header = () => (
        <header className={`bg-blue-600 text-white py-6 fixed w-full z-10 transition-all duration-300 ${
            scrollPosition > 50 ? 'bg-opacity-95 shadow-lg' : ''
        }`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <MessageSquare className="w-6 h-6 animate-bounce" />
                    <div className="text-2xl font-bold">Snappy Chat</div>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <a href="#features" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.features}</a>
                    <a href="#about" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.about}</a>
                    <a href="#communication" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.communication}</a>
                    <a href="#security" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.security}</a>
                    <a href="#metrics" className="mx-2 hover:text-blue-200 transition-colors duration-300">Métriques</a>
                    <a href="#pricing" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.pricing}</a>
                </nav>
                
                {/* Mobile menu button */}
                <button 
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                    </svg>
                </button>
                
                <div className="hidden md:flex items-center space-x-4">
                    <div className="mx-3 relative">
                        <button 
                            onClick={() => setShowLanguageMenu(!showLanguageMenu)} 
                            className="text-sm flex items-center hover:opacity-80 bg-blue-700 px-3 py-2 rounded-md"
                        >
                            <span className="mr-2">{languages.find(lang => lang.code === language).flag}</span>
                            {languages.find(lang => lang.code === language).name}
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </button>
                        
                        {showLanguageMenu && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                {languages.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left"
                                    >
                                        <span className="mr-2">{lang.flag}</span> {lang.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {typeof window !== 'undefined' && localStorage.getItem('token') ? (
                        <div className="space-x-4">
                            <a href="/dashboard" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105">{t.nav.developers}</a>
                        </div>  
                    ) : (
                        <div className="space-x-4">
                            <a href="/signin" className="hover:text-blue-200 transition-colors duration-300">{t.nav.login}</a>
                            <a href="/signin" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105">{t.nav.signup}</a>
                        </div>  
                    )}
                </div>
            </div>
            
            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden bg-blue-700 py-4">
                    <div className="container mx-auto px-4">
                        <nav className="flex flex-col space-y-3">
                            <a href="#features" className="text-white hover:text-blue-200" onClick={() => setShowMobileMenu(false)}>{t.nav.features}</a>
                            <a href="#about" className="text-white hover:text-blue-200" onClick={() => setShowMobileMenu(false)}>{t.nav.about}</a>
                            <a href="#communication" className="text-white hover:text-blue-200" onClick={() => setShowMobileMenu(false)}>{t.nav.communication}</a>
                            <a href="#security" className="text-white hover:text-blue-200" onClick={() => setShowMobileMenu(false)}>{t.nav.security}</a>
                            <a href="#metrics" className="text-white hover:text-blue-200" onClick={() => setShowMobileMenu(false)}>Métriques</a>
                            <a href="#pricing" className="text-white hover:text-blue-200" onClick={() => setShowMobileMenu(false)}>{t.nav.pricing}</a>
                            <div className="pt-2 border-t border-blue-600">
                                <div className="mb-3">
                                    {languages.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`mr-2 px-3 py-1 rounded ${language === lang.code ? 'bg-blue-800 text-white' : 'text-white'}`}
                                        >
                                            <span className="mr-1">{lang.flag}</span> {lang.name}
                                        </button>
                                    ))}
                                </div>
                                <a href="/signin" className="block text-white hover:text-blue-200 mb-2">{t.nav.login}</a>
                                <a href="/signin" className="block bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 w-full text-center">{t.nav.signup}</a>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );

    // Updated hero section inspired by Image 2
    const HeroSection = () => (
        <section className="bg-blue-600 text-white pt-32 pb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <img src="/api/placeholder/800/600" alt="Background pattern" className="w-full h-full object-cover" />
            </div>
            <div className="container mx-auto px-4 text-center md:text-left relative">
                <div className="md:flex md:items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">{t.hero.title}</h1>
                        <p className="text-xl mb-8 animate-fade-in-delay">{t.hero.subtitle}</p>
                        <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <a href="/app" className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105 transform flex items-center justify-center">
                                <MonitorSmartphone className="w-5 h-5 mr-2" />
                                {t.hero.tryOnline}
                            </a>
                            <a href="/download" className="border-2 border-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center">
                                <Download className="w-5 h-5 mr-2" />
                                {t.hero.downloadApp}
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img src="/api/placeholder/600/400" alt="Interface de messagerie" className="rounded-lg shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>
            </div>
        </section>
    );

    const FeaturesSection = () => (
        <section id="features" className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">{t.features.title}</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Découvrez toutes les fonctionnalités qui font de Snappy Chat la solution idéale pour la communication d'équipe.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featureItems.map((feature, index) => (
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
    );

    const AboutSection = () => (
        <section id="about" className="bg-blue-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">{t.about.title}</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t.about.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {aboutItems.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
                            {item.icon}
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    // WhatsApp-inspired demo section with translations
    const DemoSection = () => (
        <section id="demo" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">{t.demo.title}</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t.demo.subtitle}</p>
                
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        {/* WhatsApp-like UI */}
                        <div className="max-w-sm mx-auto border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                            {/* Header */}
                            <div className="bg-blue-600 text-white p-3 flex items-center">
                                <div className="flex-shrink-0">
                                    <img src="/api/placeholder/40/40" alt="Avatar" className="h-10 w-10 rounded-full" />
                                </div>
                                <div className="ml-3 flex-1">
                                    <div className="font-bold">Snappy Chat</div>
                                    <div className="text-xs">en ligne</div>
                                </div>
                                <div className="flex space-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4 3a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Chat area with WhatsApp-style bubbles */}
                            <div className="bg-gray-100 h-80 p-3 overflow-y-auto flex flex-col space-y-3">
                                <div className="flex justify-end">
                                    <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs relative chat-bubble-right">
                                        Bonjour, bienvenue sur Snappy Chat!
                                        <div className="text-xs text-right mt-1 text-gray-500">10:03</div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-lg shadow max-w-xs relative chat-bubble-left">
                                        Bonjour! Comment puis-je utiliser cette application pour mon équipe?
                                        <div className="text-xs text-right mt-1 text-gray-500">10:05</div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end">
                                    <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs relative chat-bubble-right">
                                        C'est très simple! Vous pouvez créer des salons thématiques, inviter votre équipe et commencer à communiquer instantanément.
                                        <div className="text-xs text-right mt-1 text-gray-500">10:06</div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-lg shadow max-w-xs relative chat-bubble-left">
                                        Est-ce que je peux partager des fichiers et des médias?
                                        <div className="text-xs text-right mt-1 text-gray-500">10:07</div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end">
                                    <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs relative chat-bubble-right">
                                        Bien sûr! Vous pouvez partager des documents, des images, des vidéos et bien plus encore.
                                        <div className="text-xs text-right mt-1 text-gray-500">10:08</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Input area */}
                            <div className="bg-white p-3 flex items-center space-x-2">
                                <button className="text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <button className="text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>
                                <input type="text" placeholder="Tapez un message" className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <button className="text-white bg-blue-600 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2 md:pl-8">
                        <h3 className="text-2xl font-bold mb-4">{t.demo.uiTitle}</h3>
                        <p className="mb-4">{t.demo.uiDescription}</p>
                        
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                                <span>{t.demo.features.design}</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                                <span>{t.demo.features.messages}</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                                <span>{t.demo.features.sharing}</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                                <span>{t.demo.features.apps}</span>
                            </li>
                        </ul>
                        
                        <div className="mt-8 flex space-x-4">
                            <a href="/app" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 inline-flex items-center">
                                <MonitorSmartphone className="w-5 h-5 mr-2" />
                                {t.hero.tryOnline}
                            </a>
                            <a href="/download" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 inline-flex items-center">
                                <Download className="w-5 h-5 mr-2" />
                                {t.hero.downloadApp}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const SecuritySection = () => (
        <section id="security" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">{t.security.title}</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">La sécurité de vos données est notre priorité absolue. Découvrez nos mesures de protection.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {securityItems.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                            {item.icon}
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="mb-4">{item.description}</p>
                            <img src={item.image} alt={item.title} className="rounded-lg w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    // Updated team section with translations
    const TeamSection = () => {
        return (
            <section id="team" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">{t.team.title}</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        {t.team.subtitle}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.team.members.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden transform transition-transform duration-500 hover:scale-105">
                                    <img 
                                        src="/images/user/image.png" 
                                        alt={member.name} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-blue-600 bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 hover:opacity-100 flex space-x-3">
                                            <a href="#" className="text-white bg-blue-600 p-2 rounded-full">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                                                </svg>
                                            </a>
                                            <a href="#" className="text-white bg-blue-600 p-2 rounded-full">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-blue-600 mb-2">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    // Updated CTA section with translations
    const CTASection = () => (
        <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
                <p className="mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 transform flex items-center justify-center">
                        <MonitorSmartphone className="w-5 h-5 mr-2" />
                        {t.cta.useOnline}
                    </a>
                    <a href="#" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center">
                        <Download className="w-5 h-5 mr-2" />
                        {t.cta.download}
                    </a>
                </div>
            </div>
        </section>
    );


  
    const Footer = () => (
        <footer className="bg-blue-600 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {footerSections.map((section, index) => (
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
                
                <div className="border-t border-blue-500 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <MessageSquare className="w-6 h-6 mr-2" />
                            <span className="font-bold text-xl">Snappy Chat</span>
                        </div>
                        
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                            <a href="#" className="hover:text-blue-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </a>
                            <a href="#" className="hover:text-blue-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                            <a href="#" className="hover:text-blue-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <p className="text-center mt-4">&copy; 2024 Snappy Chat. {t.footer.rights}</p>
                </div>
            </div>
        </footer>
    );

    const MetricsSection = () => (
        <section id="metrics" className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">{t.metrics.title}</h2>
                <p className="text-center mb-12 max-w-2xl mx-auto">{t.metrics.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metricItems.map((item, index) => (
                        <div key={index} className="bg-blue-700 p-6 rounded-lg text-center transform hover:scale-105 transition-all duration-300">
                            {item.icon}
                            <div className="text-3xl font-bold mb-2">{item.value}</div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    const PricingSection = () => (
        <section id="pricing" className="bg-white py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">{t.pricing.title}</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Des offres adaptées à tous vos besoins, de la petite équipe à la grande entreprise.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className={`bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300 ${
                            plan.popular ? 'border-2 border-blue-600 relative' : ''
                        }`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-blue-600 text-white py-1 px-4 text-sm">
                                    {plan.popularText}
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                            <p className="text-3xl font-bold mb-4">{plan.price}</p>
                            <ul className="mb-8 space-y-3">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            {plan.title === t.pricing.enterprise.title ? (
                                <a href="/contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 inline-block">
                                    {t.pricing.contactUs}
                                </a>
                            ) : (
                                <div className="space-y-2">
                                    <a href="/app" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 inline-block flex items-center justify-center mx-auto">
                                        <MonitorSmartphone className="w-4 h-4 mr-2" />
                                        {t.hero.tryOnline}
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );


  
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <HeroSection />
            <FeaturesSection />
            <AboutSection />
            <DemoSection />
            <SecuritySection />
            <TeamSection />
            <MetricsSection />
            <PricingSection />
            <CTASection />
            <Footer />
        </div>
    );
};

export default LandingPage;