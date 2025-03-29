# Snappy - Bibliothèque de Communication Client

## Introduction

Snappy est une bibliothèque TypeScript qui fournit des interfaces et implémentations pour faciliter la communication client-serveur via différents protocoles (WebSocket et HTTP). Elle est conçue pour être flexible, extensible et facile à utiliser dans vos applications web modernes.

## Installation

Cette bibliothèque n'est pas encore disponible sur npmjs. Pour l'utiliser:

1. Copiez le dossier `lib` dans votre projet
2. Installez les dépendances requises:

```bash
npm install axios sonner socket.io-client
# ou
yarn add axios sonner socket.io-client
```
## Structure de la bibliothèque
```
snappy/
├── lib/
│   ├── ISnappySocketClient.ts     # Interface pour les clients Socket
│   ├── SnappySocketClient.ts      # Implémentation Socket.io
│   ├── SnappyHTTPClient.ts        # Client HTTP pour les API RESTful
│   └── models/                    # Modèles de données partagés
│       └── Message.ts             # Modèle de message
└── [autres modules]
```
## Client Socket (SnappySocketClient)

Le client Socket permet d'établir une connexion WebSocket en temps réel avec un serveur Snappy.

### Initialisation

```typescript
import { SnappySocketClient } from "snappy";

// Création d'une instance
const socketClient = new SnappySocketClient(
  "http://localhost:3308",        // URL du serveur Socket.io
  "c9248b89-00b1-4c24-8678-c2ed923c83a1",  // ID du projet
  "user123"                       // Identifiant utilisateur
);

// Initialisation avec les gestionnaires d'événements par défaut
socketClient.initialize();

// OU initialisation avec des gestionnaires d'événements personnalisés
const customHandlers = {
  onConnect: () => {
    console.log("Connection établie avec succès!");
  },
  onDisconnect: () => {
    console.log("Déconnecté du serveur");
  },
  newConnectionListener: (user: string) => {
    console.log(`Nouvel utilisateur connecté: ${user}`);
  },
  newDisconnectionListener: (user: string) => {
    console.log(`Utilisateur déconnecté: ${user}`);
  },
  onMessageReceivedListener: (message: Message) => {
    console.log("Nouveau message:", message);
    // Traiter le message
  }
};

socketClient.initialize(customHandlers);
```

### API SnappySocketClient

| Méthode | Description |
|---------|-------------|
| `constructor(server: string, projectId: string, user: string)` | Initialise un client avec l'URL du serveur, l'ID du projet et l'ID utilisateur |
| `initialize(client?: ISnappySocketClient, force?: boolean)` | Configure la connexion Socket.io et les gestionnaires d'événements |
| `onConnect()` | Appelé lors de l'établissement de la connexion |
| `onDisconnect()` | Appelé lors de la déconnexion |
| `newConnectionListener(user: string)` | Appelé lorsqu'un nouvel utilisateur se connecte |
| `newDisconnectionListener(user: string)` | Appelé lorsqu'un utilisateur se déconnecte |
| `onMessageReceivedListener(message: Message)` | Appelé à la réception d'un nouveau message |

### Interface ISnappySocketClient

Cette interface définit le contrat pour les gestionnaires d'événements Socket:

```typescript
export interface ISnappySocketClient {
    onConnect: () => void;
    onDisconnect: () => void;
    newConnectionListener: (user: string) => void;
    newDisconnectionListener: (user: string) => void;
    onMessageReceivedListener: (message: Message) => void;
}
```

## Client HTTP (SnappyHTTPClient)

Le client HTTP permet d'interagir avec les API RESTful du serveur Snappy.

### Initialisation

```typescript
import { SnappyHTTPClient } from "snappy";

// Création d'une instance avec l'URL de base de l'API
const httpClient = new SnappyHTTPClient("http://api.example.com");
```

### Utilisation du client HTTP

```typescript
// Exemple: Créer une organisation
const result = await httpClient.createOrganization({
  name: "Mon Organisation",
  email: "contact@organisation.com",
  password: "motdepasse"
});
console.log(result);

// D'autres méthodes disponibles selon votre implémentation:
// - getMessages()
// - sendMessage()
// - getUser()
// etc.
```

## Modèles de données

Les clients Socket et HTTP partagent des modèles de données communs pour assurer la cohérence.

Ces derniers sont dans le sous repertoire `./lib/models`

## Exemple d'utilisation complet

Voici un exemple d'intégration dans une application React:

```typescript
import React, { useEffect, useState } from 'react';
import { SnappyHTTPClient, SnappySocketClient, ISnappySocketClient } from 'snappy';
import { Message } from 'snappy/lib/models';

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    // Initialisation du client HTTP
    const httpClient = new SnappyHTTPClient("http://api.example.com");
    
    // Initialisation du client Socket
    const socketClient = new SnappySocketClient(
      "http://socket.example.com",
      "project-id",
      "current-user"
    );
    
    // Configuration personnalisée des gestionnaires d'événements
    const socketHandlers: ISnappySocketClient = {
      onConnect: () => {
        console.log("Connecté au serveur");
        setConnected(true);
      },
      onDisconnect: () => {
        console.log("Déconnecté du serveur");
        setConnected(false);
      },
      newConnectionListener: (user) => {
        console.log(`${user} vient de se connecter`);
      },
      newDisconnectionListener: (user) => {
        console.log(`${user} vient de se déconnecter`);
      },
      onMessageReceivedListener: (message) => {
        console.log("Message reçu:", message);
        setMessages(prev => [...prev, message]);
      }
    };
    
    // Initialisation du socket avec les gestionnaires personnalisés
    socketClient.initialize(socketHandlers);
    
    // Chargement initial des messages via HTTP
    httpClient.getMessages()
      .then(initialMessages => {
        setMessages(initialMessages);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des messages:", error);
      });
      
    // Nettoyage
    return () => {
      // Logique de nettoyage si nécessaire
    };
  }, []);
  
  const sendMessage = async (content: string) => {
    const httpClient = new SnappyHTTPClient("http://api.example.com");
    
    const message = {
      content,
      sender: "current-user",
      timestamp: new Date()
    };
    
    try {
      await httpClient.sendMessage(message);
      // Le message sera reçu via le socket si tout se passe bien
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };
  
  return (
    <div className="chat">
      <div className="status">
        {connected ? "Connecté" : "Déconnecté"}
      </div>
      
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="sender">{msg.sender}</div>
            <div className="content">{msg.content}</div>
            <div className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      
      <div className="input">
        <input 
          type="text" 
          placeholder="Votre message..." 
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}
```


## Bonnes pratiques

1. **Gestion des erreurs**: Encapsulez les appels aux méthodes dans des try/catch
2. **État de connexion**: Suivez l'état de connexion pour adapter l'interface utilisateur
3. **Paramètres de reconnexion**: Socket.io tente de se reconnecter automatiquement par défaut
4. **Sécurité**: Ne stockez pas d'informations sensibles dans les identifiants projet/utilisateur

## Dépannage

**Problème**: Le client Socket ne se connecte pas
**Solution**: Vérifiez que l'URL du serveur est correcte et que les paramètres projectId et user sont valides

**Problème**: Les messages sont envoyés mais non reçus
**Solution**: Assurez-vous que le gestionnaire onMessageReceivedListener est correctement configuré

## Compatibilité

- **Navigateurs**: Tous les navigateurs modernes supportant WebSocket/Socket.io
- **Environnements**: Compatible avec React, Vue, Angular et applications TypeScript/JavaScript standards
- **Socket.io**: Utilise Socket.io pour la communication WebSocket, assurez-vous d'avoir une version compatible côté serveur

## Contributing

Les contributions sont les bienvenues! N'hésitez pas à soumettre des pull requests ou à signaler des bugs.


```
## Consignes
1. Ouvrir la documentation http://16.171.151.193:8001/api-docs, http://16.171.151.193:8001/doc
2. Ouvrir la documentation avec swagger editor https://editor-next.swagger.io/, et charger le contenu donné par le tout premier lien
3. Ouvrir SnappyHTTPClient et ecrire ce qui y est demandé (tout ce qui n'est pas encore fait)
4. Tous les endpoints (restants) demandent l'authentification (S'assurer de bien faire le this.refresh... (this.basePath, true, this.bearerToken))
5. Une fois toutes les méthodes implémentées, bien vouloir essayer de faire de petits tests pour s'assurer que tout marche correctement
    - creer une organisation
    - Creer des utilisatateurs, 
    - puis utiliser tous les autres endpoints un par un, 
    - 
   NOTE: à chaque fois qu'on demande un Id d'utilisateur, il faut utiliser l'externalId.
6. Pour toute préocupation, consulter la documentation https://documenter.getpostman.com/view/21955833/2sAYXCixnp
## Divers
Un peu fatigué, en cas de soucis, bien vouloir me voir en classe
```
