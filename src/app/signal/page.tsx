import React from 'react';

const SignalProtocolExplained = () => {
  const containerStyle = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    color: '#333'
  };

  const sectionStyle = {
    marginBottom: '40px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '25px',
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  };

  const diagramContainerStyle = {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '20px',
    marginBottom: '20px'
  };

  const headerStyle = {
    borderBottom: '2px solid #2c3e50',
    paddingBottom: '10px',
    color: '#2c3e50'
  };

  const subHeaderStyle = {
    borderBottom: '1px solid #bdc3c7',
    paddingBottom: '5px',
    color: '#2c3e50'
  };

  const boldText = {
    fontWeight: 'bold',
    color: '#2c3e50'
  };

  const keyTermStyle = {
    color: '#c0392b',
    fontWeight: 'bold'
  };

  const noteBoxStyle = {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderLeft: '4px solid #3498db',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Le Protocole Signal Expliqué : Schémas et Concepts</h1>
      
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>1. Vue d'ensemble du chiffrement bout en bout (E2EE)</h2>
        
        <div style={diagramContainerStyle}>
          <svg width="100%" height="340" viewBox="0 0 800 340">
            {/* Background */}
            <rect x="0" y="0" width="800" height="340" fill="#f8f9fa" rx="10" ry="10" />
            
            {/* Devices */}
            <rect x="50" y="70" width="180" height="200" fill="#3498db" rx="10" ry="10" opacity="0.8" />
            <rect x="570" y="70" width="180" height="200" fill="#3498db" rx="10" ry="10" opacity="0.8" />
            
            {/* Screen areas */}
            <rect x="65" y="90" width="150" height="100" fill="#ecf0f1" rx="5" ry="5" />
            <rect x="585" y="90" width="150" height="100" fill="#ecf0f1" rx="5" ry="5" />
            
            {/* Messages */}
            <text x="140" y="130" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="14">Hello Bob!</text>
            <text x="660" y="130" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="14">Hello Bob!</text>
            
            {/* Server */}
            <rect x="320" y="120" width="160" height="100" fill="#95a5a6" rx="10" ry="10" />
            <text x="400" y="170" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">Serveur</text>
            <text x="400" y="190" textAnchor="middle" fill="white" fontSize="12">(ne peut pas lire</text>
            <text x="400" y="210" textAnchor="middle" fill="white" fontSize="12">les messages)</text>
            
            {/* Encrypted Message Path */}
            <path d="M230 140 C280 110, 320 110, 320 170" stroke="#e74c3c" strokeWidth="3" fill="none" strokeDasharray="5,5" />
            <path d="M480 170 C530 170, 570 130, 585 140" stroke="#e74c3c" strokeWidth="3" fill="none" strokeDasharray="5,5" />
            
            {/* Alice and Bob */}
            <text x="140" y="50" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="16">Téléphone d'Alice</text>
            <text x="660" y="50" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="16">Téléphone de Bob</text>
            
            {/* Lock icons */}
            <circle cx="100" y="230" r="15" fill="#27ae60" />
            <path d="M95 230 L95 225 Q95 220, 100 220 Q105 220, 105 225 L105 230" stroke="white" strokeWidth="2" fill="none" />
            <rect x="92" y="228" width="16" height="12" fill="#27ae60" stroke="white" strokeWidth="2" rx="2" ry="2" />
            <circle cx="700" y="230" r="15" fill="#27ae60" />
            <path d="M695 230 L695 225 Q695 220, 700 220 Q705 220, 705 225 L705 230" stroke="white" strokeWidth="2" fill="none" />
            <rect x="692" y="228" width="16" height="12" fill="#27ae60" stroke="white" strokeWidth="2" rx="2" ry="2" />
            
            {/* Encryption labels */}
            <text x="150" y="235" textAnchor="middle" fill="white" fontSize="14">Chiffrement</text>
            <text x="650" y="235" textAnchor="middle" fill="white" fontSize="14">Déchiffrement</text>
            
            {/* Legend */}
            <rect x="280" y="280" width="240" height="40" fill="white" stroke="#bdc3c7" rx="5" ry="5" />
            <line x1="300" y1="300" x2="330" y2="300" stroke="#e74c3c" strokeWidth="3" strokeDasharray="5,5" />
            <text x="340" y="305" fill="#2c3e50" fontSize="14">Message chiffré</text>
            <circle cx="480" y="300" r="8" fill="#27ae60" />
            <text x="495" y="305" fill="#2c3e50" fontSize="14">Clés</text>
          </svg>
        </div>
        
        <p>Le chiffrement de bout en bout (E2EE) permet à deux utilisateurs de communiquer de manière sécurisée en s'assurant que seuls l'expéditeur et le destinataire peuvent lire les messages. Même le serveur qui transmet les messages ne peut pas déchiffrer leur contenu.</p>
        
        <div style={noteBoxStyle}>
          <p><span style={boldText}>Principe clé :</span> Dans le E2EE, le chiffrement et le déchiffrement se produisent uniquement sur les appareils des utilisateurs, jamais sur le serveur.</p>
        </div>
      </section>
      
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>2. Les types de clés dans le protocole Signal</h2>
        
        <div style={diagramContainerStyle}>
          <svg width="100%" height="360" viewBox="0 0 800 360">
            {/* Background */}
            <rect x="0" y="0" width="800" height="360" fill="#f8f9fa" rx="10" ry="10" />
            
            {/* User device */}
            <rect x="50" y="50" width="700" height="240" fill="#ecf0f1" rx="10" ry="10" stroke="#bdc3c7" strokeWidth="2" />
            <text x="400" y="30" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="16">Types de clés sur l'appareil d'un utilisateur</text>
            
            {/* Identity Key */}
            <rect x="80" y="80" width="180" height="180" fill="#3498db" rx="8" ry="8" opacity="0.8" />
            <text x="170" y="110" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">Clé d'Identité</text>
            <text x="170" y="130" textAnchor="middle" fill="white" fontSize="12">(Identity Key)</text>
            <text x="170" y="160" textAnchor="middle" fill="white" fontSize="12">• Paire de clés à long terme</text>
            <text x="170" y="180" textAnchor="middle" fill="white" fontSize="12">• Représente l'identité</text>
            <text x="170" y="200" textAnchor="middle" fill="white" fontSize="12">• Utilisée pour la vérification</text>
            <text x="170" y="220" textAnchor="middle" fill="white" fontSize="12">• Ne change jamais</text>
            <text x="170" y="240" textAnchor="middle" fill="white" fontSize="12">(sauf réinstallation)</text>
            
            {/* PreKeys */}
            <rect x="310" y="80" width="180" height="180" fill="#e67e22" rx="8" ry="8" opacity="0.8" />
            <text x="400" y="110" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">Préclés</text>
            <text x="400" y="130" textAnchor="middle" fill="white" fontSize="12">(PreKeys)</text>
            <text x="400" y="160" textAnchor="middle" fill="white" fontSize="12">• Multiples paires de clés</text>
            <text x="400" y="180" textAnchor="middle" fill="white" fontSize="12">• Utilisées une seule fois</text>
            <text x="400" y="200" textAnchor="middle" fill="white" fontSize="12">• Permettent l'établissement</text>
            <text x="400" y="220" textAnchor="middle" fill="white" fontSize="12">  de session asynchrone</text>
            <text x="400" y="240" textAnchor="middle" fill="white" fontSize="12">• Régénérées régulièrement</text>
            
            {/* Signed PreKey */}
            <rect x="540" y="80" width="180" height="180" fill="#9b59b6" rx="8" ry="8" opacity="0.8" />
            <text x="630" y="110" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">Préclé Signée</text>
            <text x="630" y="130" textAnchor="middle" fill="white" fontSize="12">(Signed PreKey)</text>
            <text x="630" y="160" textAnchor="middle" fill="white" fontSize="12">• Une seule paire de clés</text>
            <text x="630" y="180" textAnchor="middle" fill="white" fontSize="12">• Signée avec la clé d'identité</text>
            <text x="630" y="200" textAnchor="middle" fill="white" fontSize="12">• Rotation périodique</text>
            <text x="630" y="220" textAnchor="middle" fill="white" fontSize="12">• Protection contre les</text>
            <text x="630" y="240" textAnchor="middle" fill="white" fontSize="12">  attaques par perte de préclés</text>
            
            {/* Legend */}
            <rect x="200" y="310" width="400" height="30" fill="white" stroke="#bdc3c7" rx="5" ry="5" />
            <text x="400" y="330" textAnchor="middle" fill="#2c3e50" fontSize="14">Toutes les clés sont stockées dans un stockage sécurisé sur l'appareil</text>
          </svg>
        </div>
        
        <p>Le protocole Signal utilise plusieurs types de clés cryptographiques pour assurer un chiffrement robuste :</p>
        
        <ul>
          <li><span style={keyTermStyle}>Clé d'Identité (Identity Key)</span> : Paire de clés à long terme qui identifie cryptographiquement l'utilisateur. La clé publique est partagée avec d'autres utilisateurs, tandis que la clé privée reste sur l'appareil. Elle sert à signer d'autres clés et à vérifier l'identité.</li>
          
          <li><span style={keyTermStyle}>Préclés (PreKeys)</span> : Ensemble de paires de clés éphémères générées à l'avance et stockées sur le serveur. Chaque préclé est utilisée une seule fois pour établir une session avec un autre utilisateur. Elles permettent d'établir une communication même si le destinataire est hors ligne.</li>
          
          <li><span style={keyTermStyle}>Préclé Signée (Signed PreKey)</span> : Une paire de clés spéciale qui est signée avec la clé d'identité pour prouver son authenticité. Elle est utilisée dans le processus d'établissement de session et est renouvelée périodiquement (typiquement chaque semaine).</li>
        </ul>
        
        <div style={noteBoxStyle}>
          <p><span style={boldText}>Pourquoi les préclés sont cruciales :</span> Les préclés permettent l'établissement asynchrone de session, ce qui est essentiel pour une messagerie mobile où les utilisateurs ne sont pas toujours en ligne simultanément. Sans ce mécanisme, deux utilisateurs devraient être connectés en même temps pour échanger leurs clés.</p>
        </div>
      </section>
      
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>3. Établissement de session (X3DH)</h2>
        
        <div style={diagramContainerStyle}>
          <svg width="100%" height="480" viewBox="0 0 800 480">
            {/* Background */}
            <rect x="0" y="0" width="800" height="480" fill="#f8f9fa" rx="10" ry="10" />
            
            {/* Devices */}
            <rect x="50" y="70" width="200" height="360" fill="#3498db" rx="10" ry="10" opacity="0.2" />
            <rect x="550" y="70" width="200" height="360" fill="#e74c3c" rx="10" ry="10" opacity="0.2" />
            
            {/* Headers */}
            <text x="150" y="50" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="16">Alice</text>
            <text x="650" y="50" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="16">Bob</text>
            <text x="400" y="50" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="16">Serveur</text>
            
            {/* Initial Steps - Registration */}
            <text x="650" y="100" textAnchor="middle" fill="#2c3e50" fontSize="12">1. Génère et enregistre:</text>
            <text x="650" y="120" textAnchor="middle" fill="#2c3e50" fontSize="12">- Clé d'identité (IK)</text>
            <text x="650" y="140" textAnchor="middle" fill="#2c3e50" fontSize="12">- Préclé signée (SPK)</text>
            <text x="650" y="160" textAnchor="middle" fill="#2c3e50" fontSize="12">- Lot de préclés (PK)</text>
            
            {/* Upload to server */}
            <path d="M550 150 L400 150" stroke="#7f8c8d" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="475" y="140" textAnchor="middle" fill="#7f8c8d" fontSize="12">2. Télécharge clés publiques</text>
            <text x="475" y="160" textAnchor="middle" fill="#7f8c8d" fontSize="12">(IKpub, SPKpub, PKpub)</text>
            
            {/* Alice starts session */}
            <text x="150" y="200" textAnchor="middle" fill="#2c3e50" fontSize="12">3. Veut envoyer un message</text>
            <text x="150" y="220" textAnchor="middle" fill="#2c3e50" fontSize="12">à Bob pour la première fois</text>
            
            {/* Fetching Bob's keys */}
            <path d="M150 240 L400 240" stroke="#2980b9" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="275" y="230" textAnchor="middle" fill="#2980b9" fontSize="12">4. Demande les clés de Bob</text>
            
            <path d="M400 260 L150 260" stroke="#2980b9" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="275" y="280" textAnchor="middle" fill="#2980b9" fontSize="12">5. Reçoit IKpub, SPKpub, et une PK</text>
            
            {/* Key calculations */}
            <text x="150" y="310" textAnchor="middle" fill="#2c3e50" fontSize="12">6. Génère une clé éphémère (EK)</text>
            <text x="150" y="330" textAnchor="middle" fill="#2c3e50" fontSize="12">7. Calcule des secrets partagés avec:</text>
            <text x="150" y="350" textAnchor="middle" fill="#2c3e50" fontSize="12">- DH(IK_A, SPK_B)</text>
            <text x="150" y="370" textAnchor="middle" fill="#2c3e50" fontSize="12">- DH(EK_A, IK_B)</text>
            <text x="150" y="390" textAnchor="middle" fill="#2c3e50" fontSize="12">- DH(EK_A, SPK_B)</text>
            <text x="150" y="410" textAnchor="middle" fill="#2c3e50" fontSize="12">- DH(EK_A, PK_B) [optionnel]</text>
            
            {/* Initial Message */}
            <path d="M150 440 L650 440" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
            <text x="400" y="430" textAnchor="middle" fill="#e74c3c" fontSize="12">8. Envoie message initial avec IK_A, EK_A</text>
            <text x="400" y="450" textAnchor="middle" fill="#e74c3c" fontSize="12">et le premier message chiffré</text>
            
            {/* Bob processing */}
            <text x="650" y="400" textAnchor="middle" fill="#2c3e50" fontSize="12">9. Reçoit et calcule les mêmes</text>
            <text x="650" y="420" textAnchor="middle" fill="#2c3e50" fontSize="12">secrets partagés</text>

            {/* Arrow marker definition */}
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#2c3e50" />
              </marker>
            </defs>
          </svg>
        </div>
        
        <p>Le protocole Signal utilise une méthode appelée <span style={keyTermStyle}>X3DH (Extended Triple Diffie-Hellman)</span> pour établir une session sécurisée entre deux utilisateurs, même si l'un d'eux est hors ligne.</p>
        
        <h3>Rôle des préclés dans l'établissement de session :</h3>
        
        <ol>
          <li><span style={boldText}>Enregistrement initial :</span> Chaque utilisateur génère et enregistre sur le serveur sa clé d'identité publique, sa préclé signée publique, et un lot de préclés publiques.</li>
          
          <li><span style={boldText}>Initialisation de session :</span> Quand Alice veut communiquer avec Bob pour la première fois, elle récupère ses clés publiques depuis le serveur.</li>
          
          <li><span style={boldText}>Sélection de préclé :</span> Le serveur fournit à Alice la clé d'identité publique de Bob, sa préclé signée publique, et une de ses préclés publiques (qui ne sera utilisée qu'une seule fois).</li>
          
          <li><span style={boldText}>Calcul des clés partagées :</span> Alice utilise ces informations pour calculer une clé partagée, que Bob pourra également calculer lorsqu'il recevra le message initial d'Alice.</li>
        </ol>
        
        <div style={noteBoxStyle}>
          <p><span style={boldText}>Avantage clé :</span> Ce système permet à Alice d'envoyer un message chiffré à Bob même s'il est hors ligne. Quand Bob se reconnecte, il peut calculer la même clé partagée qu'Alice et déchiffrer le message.</p>
        </div>
      </section>
      
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>4. Le Double Ratchet : Évolution constante des clés</h2>
        
        <div style={diagramContainerStyle}>
          <svg width="100%" height="400" viewBox="0 0 800 400">
            {/* Background */}
            <rect x="0" y="0" width="800" height="400" fill="#f8f9fa" rx="10" ry="10" />
            
            {/* Timeline */}
            <line x1="100" y1="200" x2="700" y2="200" stroke="#bdc3c7" strokeWidth="4" />
            
            {/* Initial shared key */}
            <circle cx="150" cy="200" r="15" fill="#3498db" />
            <text x="150" y="240" textAnchor="middle" fill="#2c3e50" fontSize="14">Clé initiale</text>
            <text x="150" y="260" textAnchor="middle" fill="#2c3e50" fontSize="14">(de X3DH)</text>
            
            {/* Message keys */}
            <circle cx="250" cy="160" r="10" fill="#e74c3c" />
            <text x="250" y="140" textAnchor="middle" fill="#2c3e50" fontSize="12">Clé de message 1</text>
            <line x1="150" y1="200" x2="250" y2="160" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" />
            
            <circle cx="350" cy="160" r="10" fill="#e74c3c" />
            <text x="350" y="140" textAnchor="middle" fill="#2c3e50" fontSize="12">Clé de message 2</text>
            <line x1="250" y1="160" x2="350" y2="160" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" />
            
            {/* New DH exchange */}
            <circle cx="400" cy="200" r="15" fill="#9b59b6" />
            <text x="400" y="240" textAnchor="middle" fill="#2c3e50" fontSize="14">Échange DH</text>
            <text x="400" y="260" textAnchor="middle" fill="#2c3e50" fontSize="14">(Ratchet de chaîne)</text>
            <path d="M350 160 C370 160, 380 180, 400 200" stroke="#9b59b6" strokeWidth="2" />
            
            {/* More message keys */}
            <circle cx="500" cy="160" r="10" fill="#e74c3c" />
            <text x="500" y="140" textAnchor="middle" fill="#2c3e50" fontSize="12">Clé de message 3</text>
            <line x1="400" y1="200" x2="500" y2="160" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" />
            
            <circle cx="600" cy="160" r="10" fill="#e74c3c" />
            <text x="600" y="140" textAnchor="middle" fill="#2c3e50" fontSize="12">Clé de message 4</text>
            <line x1="500" y1="160" x2="600" y2="160" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" />
            
            {/* Another DH exchange */}
            <circle cx="650" cy="200" r="15" fill="#9b59b6" />
            <text x="650" y="240" textAnchor="middle" fill="#2c3e50" fontSize="14">Nouvel échange DH</text>
            <path d="M600 160 C620 160, 630 180, 650 200" stroke="#9b59b6" strokeWidth="2" />
            
            {/* Legend */}
            <rect x="100" y="320" width="600" height="60" fill="white" stroke="#bdc3c7" rx="5" ry="5" />
            <circle cx="130" cy="340" r="10" fill="#3498db" />
            <text x="270" y="345" textAnchor="start" fill="#2c3e50" fontSize="14">Clé racine (dérivée de X3DH)</text>
            
            <circle cx="130" cy="370" r="10" fill="#9b59b6" />
            <text x="270" y="375" textAnchor="start" fill="#2c3e50" fontSize="14">Échange Diffie-Hellman (ratchet de chaîne)</text>
            
            <circle cx="450" cy="340" r="8" fill="#e74c3c" />
            <text x="590" y="345" textAnchor="start" fill="#2c3e50" fontSize="14">Clés de message (usage unique)</text>
            
            <line x1="450" y1="370" x2="500" y2="370" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" />
            <text x="590" y="375" textAnchor="start" fill="#2c3e50" fontSize="14">Dérivation de clé (ratchet de message)</text>
          </svg>
        </div>
        
        <p>Après l'établissement initial de la session via X3DH, le protocole Signal utilise le <span style={keyTermStyle}>Double Ratchet</span> pour faire évoluer constamment les clés de chiffrement, ce qui assure la <span style={keyTermStyle}>confidentialité persistante</span> (forward secrecy).</p>
        
        <h3>Comment fonctionne le Double Ratchet :</h3>
        
        <ol>
          <li><span style={boldText}>Clé initiale :</span> La clé partagée issue du X3DH sert de point de départ.</li>
          
          <li><span style={boldText}>Ratchet de chaîne :</span> Chaque fois qu'un nouvel échange Diffie-Hellman a lieu (généralement quand l'autre partie envoie un message), la clé racine évolue. C'est le premier "cran" du Double Ratchet.</li>
          
          <li><span style={boldText}>Ratchet de message :</span> Pour chaque message envoyé, une nouvelle clé de message est dérivée de la clé de chaîne actuelle. C'est le second "cran" du Double Ratchet.</li>
          
          <li><span style={boldText}>Usage unique :</span> Chaque clé de message n'est utilisée qu'une seule fois pour chiffrer ou déchiffrer un message.</li>
        </ol>
        
        <div style={noteBoxStyle}>
          <p><span style={boldText}>Avantages clés :</span> Ce système garantit que la compromission d'une clé ne compromet pas les messages passés (confidentialité persistante) ou futurs (auto-guérison). Même si un attaquant obtient une clé de message, il ne pourra déchiffrer qu'un seul message.</p>
        </div>
      </section>
      
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>5. Gestion des groupes et messagerie chiffrée de groupe</h2>
        
        <div style={diagramContainerStyle}>
          <svg width="100%" height="400" viewBox="0 0 800 400">
            {/* Background */}
            <rect x="0" y="0" width="800" height="400" fill="#f8f9fa" rx="10" ry="10" />
            
            {/* Group chat container */}
            <rect x="250" y="50" width="300" height="100" fill="#3498db" rx="10" ry="10" opacity="0.2" />
            <text x="400" y="80" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="16">Groupe "Projet X"</text>
            <text x="400" y="110" textAnchor="middle" fill="#2c3e50" fontSize="14">Clé symétrique du groupe</text>
            <rect x="350" y="120" width="100" height="20" fill="#27ae60" rx="5" ry="5" />
            
            {/* Users */}
            <circle cx="150" cy="250" r="40" fill="#3498db" opacity="0.8" />
            <text x="150" y="255" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">Alice</text>
            
            <circle cx="400" cy="250" r="40" fill="#e74c3c" opacity="0.8" />
            <text x="400" y="255" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">Bob</text>
            
            <circle cx="650" cy="250" r="40" fill="#9b59b6" opacity="0.8" />
            <text x="650" y="255" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">Charlie</text>
            
            {/* Connection lines */}
            <line x1="175" y1="215" x2="370" y2="130" stroke="#3498db" strokeWidth="2" />
            <line x1="400" y1="210" x2="400" y2="150" stroke="#e74c3c" strokeWidth="2" />
            <line x1="625" y1="215" x2="430" y2="130" stroke="#9b59b6" strokeWidth="2" />
            
            {/* Encrypted Messages */}
            <rect x="80" y="300" width="140" height="70" fill="#ecf0f1" rx="10" ry="10" stroke="#bdc3c7" strokeWidth="1" />
            <text x="150" y="325" textAnchor="middle" fill="#2c3e50" fontSize="14">Message d'Alice</text>
            <text x="150" y="345" textAnchor="middle" fill="#2c3e50" fontSize="12">(chiffré avec</text>
            <text x="150" y="365" textAnchor="middle" fill="#2c3e50" fontSize="12">la clé du groupe)</text>
            
            <rect x="330" y="300" width="140" height="70" fill="#ecf0f1" rx="10" ry="10" stroke="#bdc3c7" strokeWidth="1" />
            <text x="400" y="325" textAnchor="middle" fill="#2c3e50" fontSize="14">Message de Bob</text>
            <text x="400" y="345" textAnchor="middle" fill="#2c3e50" fontSize="12">(chiffré avec</text>
            <text x="400" y="365" textAnchor="middle" fill="#2c3e50" fontSize="12">la clé du groupe)</text>
            
            <rect x="580" y="300" width="140" height="70" fill="#ecf0f1" rx="10" ry="10" stroke="#bdc3c7" strokeWidth="1" />
            <text x="650" y="325" textAnchor="middle" fill="#2c3e50" fontSize="14">Message de Charlie</text>
            <text x="650" y="345" textAnchor="middle" fill="#2c3e50" fontSize="12">(chiffré avec</text>
            <text x="650" y="365" textAnchor="middle" fill="#2c3e50" fontSize="12">la clé du groupe)</text>
            
            {/* Broadcast arrows */}
            <path d="M150 300 C150 280, 200 270, 250 270" stroke="#3498db" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
            <path d="M400 300 C400 280, 350 270, 300 270" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
            <path d="M400 300 C400 280, 450 270, 500 270" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
            <path d="M650 300 C650 280, 600 270, 550 270" stroke="#9b59b6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
            
            {/* Arrow marker definition */}
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#2c3e50" />
              </marker>
            </defs>
          </svg>
        </div>
        
        <p>Le protocole Signal gère les conversations de groupe en utilisant une approche différente de celle des conversations individuelles :</p>
        
        <h3>Comment fonctionne la messagerie de groupe :</h3>
        
        <ol>
          <li><span style={boldText}>Clé de groupe symétrique :</span> Chaque groupe utilise une clé symétrique partagée, plutôt que des clés asymétriques comme dans les conversations individuelles.</li>
          
          <li><span style={boldText}>Distribution sécurisée :</span> Cette clé de groupe est distribuée à chaque membre via des messages individuels chiffrés avec le protocole standard de Signal (X3DH + Double Ratchet).</li>
          
          <li><span style={boldText}>Chiffrement des messages :</span> Tous les messages du groupe sont chiffrés avec la clé symétrique du groupe.</li>
          
          <li><span style={boldText}>Rotation des clés :</span> Lorsque la composition du groupe change (ajout ou suppression d'un membre), une nouvelle clé de groupe est générée et distribuée aux membres restants.</li>
        </ol>
        
        <div style={noteBoxStyle}>
          <p><span style={boldText}>Sécurité :</span> Quand un membre quitte le groupe, une nouvelle clé est générée pour que l'ancien membre ne puisse plus lire les nouveaux messages. C'est ce qu'on appelle la "confidentialité future" (future secrecy).</p>
        </div>
      </section>
      
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>6. Vérification d'identité et empreintes numériques</h2>
        
        <div style={diagramContainerStyle}>
          <svg width="100%" height="350" viewBox="0 0 800 350">
            {/* Background */}
            <rect x="0" y="0" width="800" height="350" fill="#f8f9fa" rx="10" ry="10" />
            
            {/* Devices */}
            <rect x="50" y="70" width="200" height="220" fill="#3498db" rx="10" ry="10" opacity="0.2" />
            <rect x="550" y="70" width="200" height="220" fill="#e74c3c" rx="10" ry="10" opacity="0.2" />
            
            {/* Headers */}
            <text x="150" y="50" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="16">Téléphone d'Alice</text>
            <text x="650" y="50" textAnchor="middle" fill="#2c3e50" fontWeight="bold" fontSize="16">Téléphone de Bob</text>
            
            {/* QR codes (simplified) */}
            <rect x="100" y="100" width="100" height="100" fill="white" stroke="#2c3e50" />
            <rect x="600" y="100" width="100" height="100" fill="white" stroke="#2c3e50" />
            
            {/* QR code details */}
            <rect x="110" y="110" width="10" height="10" fill="#2c3e50" />
            <rect x="130" y="110" width="10" height="10" fill="#2c3e50" />
            <rect x="150" y="110" width="10" height="10" fill="#2c3e50" />
            <rect x="170" y="110" width="10" height="10" fill="#2c3e50" />
            
            <rect x="110" y="130" width="10" height="10" fill="#2c3e50" />
            <rect x="150" y="130" width="10" height="10" fill="#2c3e50" />
            <rect x="170" y="130" width="10" height="10" fill="#2c3e50" />
            
            <rect x="110" y="150" width="10" height="10" fill="#2c3e50" />
            <rect x="130" y="150" width="10" height="10" fill="#2c3e50" />
            <rect x="170" y="150" width="10" height="10" fill="#2c3e50" />
            
            <rect x="110" y="170" width="10" height="10" fill="#2c3e50" />
            <rect x="130" y="170" width="10" height="10" fill="#2c3e50" />
            <rect x="150" y="170" width="10" height="10" fill="#2c3e50" />
            <rect x="170" y="170" width="10" height="10" fill="#2c3e50" />
            
            <rect x="610" y="110" width="10" height="10" fill="#2c3e50" />
            <rect x="630" y="110" width="10" height="10" fill="#2c3e50" />
            <rect x="650" y="110" width="10" height="10" fill="#2c3e50" />
            <rect x="670" y="110" width="10" height="10" fill="#2c3e50" />
            
            <rect x="610" y="130" width="10" height="10" fill="#2c3e50" />
            <rect x="650" y="130" width="10" height="10" fill="#2c3e50" />
            <rect x="670" y="130" width="10" height="10" fill="#2c3e50" />
            
            <rect x="610" y="150" width="10" height="10" fill="#2c3e50" />
            <rect x="630" y="150" width="10" height="10" fill="#2c3e50" />
            <rect x="670" y="150" width="10" height="10" fill="#2c3e50" />
            
            <rect x="610" y="170" width="10" height="10" fill="#2c3e50" />
            <rect x="630" y="170" width="10" height="10" fill="#2c3e50" />
            <rect x="650" y="170" width="10" height="10" fill="#2c3e50" />
            <rect x="670" y="170" width="10" height="10" fill="#2c3e50" />
            
            {/* Fingerprint codes */}
            <rect x="70" y="220" width="160" height="50" fill="white" stroke="#bdc3c7" />
            <text x="150" y="245" textAnchor="middle" fill="#2c3e50" fontSize="12">Code de sécurité:</text>
            <text x="150" y="265" textAnchor="middle" fill="#e74c3c" fontFamily="monospace" fontWeight="bold" fontSize="14">59 48 13 72 33 85 19 26</text>
            
            <rect x="570" y="220" width="160" height="50" fill="white" stroke="#bdc3c7" />
            <text x="650" y="245" textAnchor="middle" fill="#2c3e50" fontSize="12">Code de sécurité:</text>
            <text x="650" y="265" textAnchor="middle" fill="#e74c3c" fontFamily="monospace" fontWeight="bold" fontSize="14">59 48 13 72 33 85 19 26</text>
            
            {/* In-person verification */}
            <path d="M200 150 L600 150" stroke="#27ae60" strokeWidth="3" strokeDasharray="10,10" />
            <text x="400" y="130" textAnchor="middle" fill="#27ae60" fontWeight="bold" fontSize="14">Vérification en personne</text>
            
            {/* Legend */}
            <rect x="150" y="310" width="500" height="30" fill="white" stroke="#bdc3c7" rx="5" ry="5" />
            <text x="400" y="330" textAnchor="middle" fill="#2c3e50" fontSize="14">L'empreinte numérique est dérivée des clés d'identité des deux utilisateurs</text>
          </svg>
        </div>
        
        <p>Pour se protéger contre les attaques de type "homme du milieu", le protocole Signal permet aux utilisateurs de vérifier l'identité de leurs contacts :</p>
        
        <h3>Comment fonctionne la vérification d'identité :</h3>
        
        <ol>
          <li><span style={boldText}>Génération d'empreinte :</span> Une empreinte numérique (fingerprint) est générée à partir des clés d'identité publiques des deux utilisateurs.</li>
          
          <li><span style={boldText}>Formats de présentation :</span> Cette empreinte peut être affichée sous forme de code numérique ou de QR code que les utilisateurs peuvent scanner.</li>
          
          <li><span style={boldText}>Vérification hors-bande :</span> Les utilisateurs comparent ces empreintes en personne ou via un canal de communication sécurisé distinct.</li>
          
          <li><span style={boldText}>Confiance établie :</span> Si les empreintes correspondent, les utilisateurs peuvent marquer l'identité de l'autre comme "vérifiée" dans l'application.</li>
        </ol>
        
        <div style={noteBoxStyle}>
          <p><span style={boldText}>Importance :</span> Cette vérification manuelle est la seule façon de s'assurer à 100% qu'il n'y a pas d'attaque de l'homme du milieu. Par défaut, Signal utilise un modèle de confiance "Trust On First Use" (TOFU), mais la vérification manuelle renforce considérablement la sécurité.</p>
        </div>
      </section>
    </div>
  );
};

export default SignalProtocolExplained;