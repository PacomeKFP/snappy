'use client';
import React, { useEffect, useState } from 'react';
import { MessageSquare, Shield, Zap, Globe, ChevronDown ,Users, Clock, Download, MonitorSmartphone, Target, EyeIcon, MapPin, Flag } from 'lucide-react';

const LandingPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [language, setLanguage] = useState('fr');

    type Translations = {
        [key: string]: {
            nav: {
                features: string;
                about: string;
                communication: string;
                security: string;
                testimonials: string;
                pricing: string;
                login: string;
                signup: string;
                developers: string;
            };
            hero: {
                title: string;
                subtitle: string;
                tryOnline: string;
                downloadApp: string;
                watchDemo: string;
            };
            features: {
                title: string;
                instantMessages: {
                    title: string;
                    description: string;
                };
                thematicRooms: {
                    title: string;
                    description: string;
                };
                fileSharing: {
                    title: string;
                    description: string;
                };
            };
            about: {
                title: string;
                why: {
                    title: string;
                    description: string;
                };
                objectives: {
                    title: string;
                    description: string;
                };
                vision: {
                    title: string;
                    description: string;
                };
                mission: {
                    title: string;
                    description: string;
                };
            };
            demo: {
                title: string;
            };
            security: {
                title: string;
                encryption: {
                    title: string;
                    description: string;
                };
                accessControl: {
                    title: string;
                    description: string;
                };
            };
            pricing: {
                title: string;
                starter: {
                    title: string;
                    price: string;
                    features: string[];
                };
                pro: {
                    title: string;
                    price: string;
                    popular: string;
                    features: string[];
                };
                enterprise: {
                    title: string;
                    price: string;
                    features: string[];
                };
                contactUs: string;
                getStarted: string;
            };
            footer: {
                product: string;
                company: string;
                support: string;
                legal: string;
                about: string;
                blog: string;
                careers: string;
                helpCenter: string;
                contact: string;
                status: string;
                privacy: string;
                terms: string;
                gdpr: string;
                rights: string;
            };
        };
    };
    
    const translations: Translations = {
        fr: {
            nav: {
                features: 'Fonctionnalités',
                about: 'À propos',
                communication: 'Communication',
                security: 'Sécurité',
                testimonials: 'Témoignages',
                pricing: 'Prix',
                login: 'Connexion',
                signup: 'S\'inscrire',
                developers: 'Développeurs'
            },
            hero: {
                title: 'Communication instantanée pour votre équipe',
                subtitle: 'Plateforme de messagerie sécurisée et intuitive pour une collaboration efficace.',
                tryOnline: 'Utiliser en ligne',
                downloadApp: 'Télécharger l\'application',
                watchDemo: 'Voir la démo'
            },
            features: {
                title: 'Fonctionnalités principales',
                instantMessages: {
                    title: 'Messages instantanés',
                    description: 'Échangez des messages en temps réel avec votre équipe.'
                },
                thematicRooms: {
                    title: 'Salons thématiques',
                    description: 'Créez des canaux dédiés pour chaque projet ou équipe.'
                },
                fileSharing: {
                    title: 'Partage de fichiers',
                    description: 'Partagez facilement documents, images et fichiers.'
                }
            },
            about: {
                title: 'À propos de Snappy Chat',
                why: {
                    title: 'Pourquoi',
                    description: 'Nous avons créé Snappy Chat car nous croyons que la communication en équipe doit être fluide, sécurisée et accessible à tous, partout dans le monde.'
                },
                objectives: {
                    title: 'Objectifs',
                    description: 'Simplifier la collaboration professionnelle en éliminant les barrières à la communication instantanée et en facilitant le partage d\'idées.'
                },
                vision: {
                    title: 'Vision',
                    description: 'Un monde où les équipes peuvent collaborer sans friction, quelle que soit leur localisation ou leur fuseau horaire.'
                },
                mission: {
                    title: 'Mission',
                    description: 'Fournir la plateforme de communication la plus intuitive et sécurisée pour les équipes du monde entier.'
                }
            },
            demo: {
                title: 'Découvrez notre interface'
            },
            security: {
                title: 'Sécurité renforcée',
                encryption: {
                    title: 'Chiffrement de bout en bout',
                    description: 'Vos messages sont protégés par un chiffrement avancé.'
                },
                accessControl: {
                    title: 'Contrôle d\'accès',
                    description: 'Gérez finement les permissions de vos utilisateurs.'
                }
            },
            pricing: {
                title: 'Tarifs adaptés à vos besoins',
                starter: {
                    title: 'Starter',
                    price: '0€/mois',
                    features: ['Jusqu\'à 10 utilisateurs', 'Messages illimités', '5 GB stockage', 'Support email']
                },
                pro: {
                    title: 'Pro',
                    price: '29€/mois',
                    popular: 'Plus populaire',
                    features: ['Jusqu\'à 100 utilisateurs', 'Messages illimités', '50 GB stockage', 'Support prioritaire', 'Intégrations avancées']
                },
                enterprise: {
                    title: 'Entreprise',
                    price: 'Sur mesure',
                    features: ['Utilisateurs illimités', 'Messages illimités', 'Stockage illimité', 'Support 24/7', 'API personnalisée', 'SLA garanti']
                },
                contactUs: 'Nous contacter',
                getStarted: 'Commencer'
            },
            footer: {
                product: 'Produit',
                company: 'Entreprise',
                support: 'Support',
                legal: 'Légal',
                about: 'À propos',
                blog: 'Blog',
                careers: 'Carrières',
                helpCenter: 'Centre d\'aide',
                contact: 'Contact',
                status: 'Statut',
                privacy: 'Confidentialité',
                terms: 'Conditions',
                gdpr: 'RGPD',
                rights: 'Tous droits réservés'
            }
        },
        en: {
            nav: {
                features: 'Features',
                about: 'About',
                communication: 'Communication',
                security: 'Security',
                testimonials: 'Testimonials',
                pricing: 'Pricing',
                login: 'Login',
                signup: 'Sign up',
                developers: 'Developers'
            },
            hero: {
                title: 'Instant communication for your team',
                subtitle: 'Secure and intuitive messaging platform for effective collaboration.',
                tryOnline: 'Use online',
                downloadApp: 'Download app',
                watchDemo: 'Watch demo'
            },
            features: {
                title: 'Key Features',
                instantMessages: {
                    title: 'Instant Messaging',
                    description: 'Exchange real-time messages with your team.'
                },
                thematicRooms: {
                    title: 'Thematic Channels',
                    description: 'Create dedicated channels for each project or team.'
                },
                fileSharing: {
                    title: 'File Sharing',
                    description: 'Easily share documents, images and files.'
                }
            },
            about: {
                title: 'About Snappy Chat',
                why: {
                    title: 'Why',
                    description: 'We created Snappy Chat because we believe team communication should be fluid, secure, and accessible to everyone, anywhere in the world.'
                },
                objectives: {
                    title: 'Objectives',
                    description: 'Simplify professional collaboration by removing barriers to instant communication and facilitating the sharing of ideas.'
                },
                vision: {
                    title: 'Vision',
                    description: 'A world where teams can collaborate without friction, regardless of their location or time zone.'
                },
                mission: {
                    title: 'Mission',
                    description: 'Provide the most intuitive and secure communication platform for teams worldwide.'
                }
            },
            demo: {
                title: 'Discover our interface'
            },
            security: {
                title: 'Enhanced Security',
                encryption: {
                    title: 'End-to-end Encryption',
                    description: 'Your messages are protected by advanced encryption.'
                },
                accessControl: {
                    title: 'Access Control',
                    description: 'Finely manage your users\' permissions.'
                }
            },
            pricing: {
                title: 'Pricing tailored to your needs',
                starter: {
                    title: 'Starter',
                    price: '$0/month',
                    features: ['Up to 10 users', 'Unlimited messages', '5 GB storage', 'Email support']
                },
                pro: {
                    title: 'Pro',
                    price: '$29/month',
                    popular: 'Most popular',
                    features: ['Up to 100 users', 'Unlimited messages', '50 GB storage', 'Priority support', 'Advanced integrations']
                },
                enterprise: {
                    title: 'Enterprise',
                    price: 'Custom',
                    features: ['Unlimited users', 'Unlimited messages', 'Unlimited storage', '24/7 support', 'Custom API', 'Guaranteed SLA']
                },
                contactUs: 'Contact us',
                getStarted: 'Get started'
            },
            footer: {
                product: 'Product',
                company: 'Company',
                support: 'Support',
                legal: 'Legal',
                about: 'About',
                blog: 'Blog',
                careers: 'Careers',
                helpCenter: 'Help Center',
                contact: 'Contact',
                status: 'Status',
                privacy: 'Privacy',
                terms: 'Terms',
                gdpr: 'GDPR',
                rights: 'All rights reserved'
            }
        },
        de: {
            nav: {
                features: 'Funktionen',
                about: 'Über uns',
                communication: 'Kommunikation',
                security: 'Sicherheit',
                testimonials: 'Referenzen',
                pricing: 'Preise',
                login: 'Anmelden',
                signup: 'Registrieren',
                developers: 'Entwickler'
            },
            hero: {
                title: 'Sofortkommunikation für Ihr Team',
                subtitle: 'Sichere und intuitive Messaging-Plattform für effektive Zusammenarbeit.',
                tryOnline: 'Online nutzen',
                downloadApp: 'App herunterladen',
                watchDemo: 'Demo ansehen'
            },
            features: {
                title: 'Hauptfunktionen',
                instantMessages: {
                    title: 'Sofortnachrichten',
                    description: 'Tauschen Sie Echtzeitnachrichten mit Ihrem Team aus.'
                },
                thematicRooms: {
                    title: 'Thematische Kanäle',
                    description: 'Erstellen Sie dedizierte Kanäle für jedes Projekt oder Team.'
                },
                fileSharing: {
                    title: 'Datenaustausch',
                    description: 'Teilen Sie einfach Dokumente, Bilder und Dateien.'
                }
            },
            about: {
                title: 'Über Snappy Chat',
                why: {
                    title: 'Warum',
                    description: 'Wir haben Snappy Chat entwickelt, weil wir glauben, dass Teamkommunikation fließend, sicher und für jeden überall auf der Welt zugänglich sein sollte.'
                },
                objectives: {
                    title: 'Ziele',
                    description: 'Vereinfachung der professionellen Zusammenarbeit durch Beseitigung von Barrieren bei der Sofortkommunikation und Erleichterung des Ideenaustauschs.'
                },
                vision: {
                    title: 'Vision',
                    description: 'Eine Welt, in der Teams reibungslos zusammenarbeiten können, unabhängig von ihrem Standort oder ihrer Zeitzone.'
                },
                mission: {
                    title: 'Mission',
                    description: 'Die intuitivste und sicherste Kommunikationsplattform für Teams weltweit bereitzustellen.'
                }
            },
            demo: {
                title: 'Entdecken Sie unsere Benutzeroberfläche'
            },
            security: {
                title: 'Verstärkte Sicherheit',
                encryption: {
                    title: 'Ende-zu-Ende-Verschlüsselung',
                    description: 'Ihre Nachrichten sind durch fortschrittliche Verschlüsselung geschützt.'
                },
                accessControl: {
                    title: 'Zugangskontrolle',
                    description: 'Verwalten Sie die Berechtigungen Ihrer Benutzer präzise.'
                }
            },
            pricing: {
                title: 'Preise nach Ihren Bedürfnissen',
                starter: {
                    title: 'Starter',
                    price: '0€/Monat',
                    features: ['Bis zu 10 Benutzer', 'Unbegrenzte Nachrichten', '5 GB Speicher', 'E-Mail-Support']
                },
                pro: {
                    title: 'Pro',
                    price: '29€/Monat',
                    popular: 'Am beliebtesten',
                    features: ['Bis zu 100 Benutzer', 'Unbegrenzte Nachrichten', '50 GB Speicher', 'Prioritäts-Support', 'Erweiterte Integrationen']
                },
                enterprise: {
                    title: 'Enterprise',
                    price: 'Individuell',
                    features: ['Unbegrenzte Benutzer', 'Unbegrenzte Nachrichten', 'Unbegrenzter Speicher', '24/7 Support', 'Individuelle API', 'Garantierte SLA']
                },
                contactUs: 'Kontaktieren Sie uns',
                getStarted: 'Jetzt starten'
            },
            footer: {
                product: 'Produkt',
                company: 'Unternehmen',
                support: 'Support',
                legal: 'Rechtliches',
                about: 'Über uns',
                blog: 'Blog',
                careers: 'Karriere',
                helpCenter: 'Hilfezentrum',
                contact: 'Kontakt',
                status: 'Status',
                privacy: 'Datenschutz',
                terms: 'Bedingungen',
                gdpr: 'DSGVO',
                rights: 'Alle Rechte vorbehalten'
            }
        }
    };
  const t = translations[language];

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
            setIsVisible(true);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(prevLanguage => {
            switch (prevLanguage) {
                case 'fr':
                    return 'en';
                case 'en':
                    return 'de';
                case 'de':
                    return 'fr';
                default:
                    return 'en';
            }
        });
    };
        const getLanguageDisplay = (language: string) => {
          switch (language) {
            case 'fr':
              return 'FR';
            case 'en':
              return 'EN';
            case 'de':
              return 'DE';
            default:
              return 'EN';
          }
        }

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
                        <a href="#features" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.features}</a>
                        <a href="#about" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.about}</a>
                        <a href="#communication" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.communication}</a>
                        <a href="#security" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.security}</a>
                        <a href="#testimonials" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.testimonials}</a>
                        <a href="#pricing" className="mx-2 hover:text-blue-200 transition-colors duration-300">{t.nav.pricing}</a>
                    </nav>
                    <div className="flex items-center space-x-4">
<div className="mx-3 flex items-center">
                        <button onClick={toggleLanguage} className="text-sm flex items-center hover:opacity-80">
                            {getLanguageDisplay(language)}
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </button>
                        </div>
                        {localStorage.getItem('token') ? (
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
            </header>

            {/* Hero Section avec animation et image */}
            <section className="bg-blue-600 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                    <img src="/api/placeholder/800/600" alt="Background pattern" className="w-full h-full object-cover" />
                </div>
                <div className="container mx-auto px-4 text-center relative">
                    <h1 className="text-5xl font-bold mb-4 animate-fade-in">{t.hero.title}</h1>
                    <p className="text-xl mb-8 animate-fade-in-delay">{t.hero.subtitle}</p>
                    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                        <a href="/app" className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105 transform flex items-center justify-center">
                            <MonitorSmartphone className="w-5 h-5 mr-2" />
                            {t.hero.tryOnline}
                        </a>
                        <a href="/download" className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-800 transition-all duration-300 hover:scale-105 transform flex items-center justify-center">
                            <Download className="w-5 h-5 mr-2" />
                            {t.hero.downloadApp}
                        </a>
                        <a href="#demo" className="border-2 border-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center">
                            <Zap className="w-5 h-5 mr-2" />
                            {t.hero.watchDemo}
                        </a>
                    </div>
                    <div className="mt-12">
                        <img src="/images/tests/image.jpg" alt="Interface de messagerie" className="rounded-lg shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>
            </section>

            {/* Features Section avec animations au scroll */}
            <section id="features" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">{t.features.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
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

            {/* New About Section */}
            <section id="about" className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">{t.about.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Target className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
                                title: t.about.why.title,
                                description: t.about.why.description
                            },
                            {
                                icon: <Flag className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
                                title: t.about.objectives.title,
                                description: t.about.objectives.description
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
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
                                {item.icon}
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interface Demo Section */}
            <section id="demo" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">{t.demo.title}</h2>
                    <div className="relative">
                        <img src="/images/tests/image.png" alt="Interface demo" className="rounded-lg shadow-2xl mx-auto" />
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
                    <h2 className="text-3xl font-bold text-center mb-12">{t.security.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                            <Shield className="w-8 h-8 mb-4 text-blue-600 animate-pulse" />
                            <h3 className="text-xl font-bold mb-4">{t.security.encryption.title}</h3>
                            <p className="mb-4">{t.security.encryption.description}</p>
                            <img src="images/tests/57811.jpg" alt="Sécurité" className="rounded-lg w-full" />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                            <Users className="w-8 h-8 mb-4 text-blue-600 animate-pulse" />
                            <h3 className="text-xl font-bold mb-4">{t.security.accessControl.title}</h3>
                            <p className="mb-4">{t.security.accessControl.description}</p>
                            <img src="/images/tests/3949019.jpg" alt="Contrôle d'accès" className="rounded-lg w-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section avec hover effects */}
            <section id="pricing" className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">{t.pricing.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: t.pricing.starter.title,
                                price: t.pricing.starter.price,
                                features: t.pricing.starter.features
                            },
                            {
                                title: t.pricing.pro.title,
                                price: t.pricing.pro.price,
                                features: t.pricing.pro.features,
                                popular: true,
                                popularText: t.pricing.pro.popular
                            },
                            {
                                title: t.pricing.enterprise.title,
                                price: t.pricing.enterprise.price,
                                features: t.pricing.enterprise.features
                            }
                        ].map((plan, index) => (
                            <div key={index} className={`bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300 ${
                                plan.popular ? 'border-2 border-blue-600' : ''
                            }`}>
                                {plan.popular && (
                                    <div className="bg-blue-600 text-white py-1 px-4 rounded-full text-sm inline-block mb-4">{plan.popularText}</div>
                                )}
                                <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                                <p className="text-2xl font-bold mb-4">{plan.price}</p>
                                <ul className="mb-8 space-y-3">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex}>{feature}</li>
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
                                        <a href="/download" className="text-blue-600 hover:text-blue-800 transition-all duration-300 inline-block flex items-center justify-center mx-auto">
                                            <Download className="w-4 h-4 mr-2" />
                                            {t.hero.downloadApp}
                                        </a>
                                    </div>
                                )}
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
                                title: t.footer.product,
                                links: [
                                    { text: t.nav.features, href: "#features" },
                                    { text: t.nav.security, href: "#security" },
                                    { text: t.nav.pricing, href: "#pricing" }
                                ]
                            },
                            {
                                title: t.footer.company,
                                links: [
                                    { text: t.footer.about, href: "#about" },
                                    { text: t.footer.blog, href: "/blog" },
                                    { text: t.footer.careers, href: "/careers" }
                                ]
                            },
                            {
                                title: t.footer.support,
                                links: [
                                    { text: t.footer.helpCenter, href: "/help" },
                                    { text: t.footer.contact, href: "/contact" },
                                    { text: t.footer.status, href: "/status" }
                                ]
                            },
                            {
                                title: t.footer.legal,
                                links: [
                                    { text: t.footer.privacy, href: "/privacy" },
                                    { text: t.footer.terms, href: "/terms" },
                                    { text: t.footer.gdpr, href: "/gdpr" }
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
                        <p>&copy; 2024 Snappy Chat. {t.footer.rights}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;