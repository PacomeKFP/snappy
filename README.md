# Documentation du WebSocket API pour l’application Snappy

## Aperçu et règles d’utilisation

Cette documentation détaille l’API WebSocket pour l’application **Snappy**. Le WebSocket est utilisé pour gérer les connexions, déconnexions et échanges de messages en temps réel entre utilisateurs.

### Authentification

Chaque requête WebSocket doit actuellement inclure un paramètre `user` qui contient l'UUID de l'utilisateur émetteur de la requête. Cela permet d’identifier chaque utilisateur connecté et de l’associer à une session WebSocket unique.

**Note** : À terme, l'authentification sera améliorée pour inclure un token dans l'en-tête des requêtes, autorisé lors du handshake WebSocket. Cela permettra de dissocier l'authentification HTTP de celle du WebSocket.

## Endpoints

### Emissions (Événements envoyés par le serveur)

- **`new-connection?user=<uuid>`** : Notifie tous les utilisateurs connectés qu’un nouvel utilisateur identifié par `user` vient de se connecter.
- **`new-disconnection?user=<uuid>`** : Notifie tous les utilisateurs connectés qu’un utilisateur identifié par `user` vient de se déconnecter.
- **`get-message`**: Envoie un message à une utilisateur connecté
### Requêtes (Événements reçus par le serveur)

- **`connect?user=<uuid>`** : Établit la connexion avec le serveur (handshake). Ce paramètre est obligatoire pour authentifier l'utilisateur.
- **`disconnect`** : Ferme la connexion. Cet événement est déclenché automatiquement lors de la déconnexion.
- **`post-message?user=<uuid>`** : Permet à un utilisateur d’envoyer un message dans une conversation. Les utilisateurs connectés dans cette conversation recevront le message en temps réel.

## Composants et structure du code

### `WebSocketServer`

- **Classe de configuration WebSocket** : Cette classe configure le serveur WebSocket en initialisant les paramètres de connexion, les listeners (connect et disconnect), et en autorisant les requêtes entrantes via un listener d’autorisation.

- **Attributs principaux** :
    - `SOCKETHOST` et `SOCKETPORT` : définissent l'hôte et le port du serveur WebSocket.
    - `connectedUsers` : Map contenant les utilisateurs connectés, où chaque UUID d’utilisateur est associé à un `sessionId`.

- **Listeners** :
    - `ConnectListener` : Lorsqu’un utilisateur se connecte, son `userUuid` et `sessionId` sont ajoutés à `connectedUsers`. Le serveur informe alors tous les utilisateurs de cette nouvelle connexion.
    - `DisconnectListener` : Lorsqu’un utilisateur se déconnecte, son entrée dans `connectedUsers` est supprimée et le serveur en informe les autres utilisateurs.

### `WebSocketController`

- **Contrôleur des événements WebSocket** : Gère les événements de messagerie en temps réel, en utilisant `socketServer` pour interagir avec les utilisateurs connectés.

- **Listeners** :
    - `onSendMessage` : Gère l'envoi de messages en vérifiant d'abord l'existence de la conversation et en envoyant le message uniquement aux utilisateurs connectés de cette conversation. Si la conversation n’existe pas, une réponse d'erreur est envoyée à l'expéditeur.

## Exemple de flux de message

1. **Connexion** : Un utilisateur se connecte en fournissant son UUID. Le serveur confirme la connexion et notifie les autres utilisateurs de sa présence.
2. **Envoi de message** : L'utilisateur envoie un message en précisant la conversation cible. Le message est stocké dans la base de données et relayé aux autres utilisateurs actifs dans cette conversation.
3. **Déconnexion** : L’utilisateur se déconnecte. Le serveur notifie tous les autres utilisateurs et retire l’utilisateur de `connectedUsers`.

---

## Améliorations futures
- **Authentification avec tokens** : Intégration de tokens dans les headers pour une sécurité renforcée.
- **Notifications optimisées** : Envoi de notifications personnalisées en fonction des permissions et préférences de chaque utilisateur.
- **Scalabilité** : Support pour plusieurs instances de serveur afin de gérer un grand nombre de connexions en temps réel.