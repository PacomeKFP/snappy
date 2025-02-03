# Mises à jour futures:
## HTTP
- Authentification avec JWT 
  - [OK] Erire les UseCase de Login pour Organization et User
  - [OK] Rajouter La sécurité (SecurityConfig) pour proteger les endpoints
  - [TODO] Rajouter La sécurité pour sécuriser la partie Websocket
- Gestion des modes de conversation:
  - [BLOCKED] Rajouter un endpoint pout changer le mode d'une conversation
  - [PENDING] Update le usecase d'envoie  de messages `@[SendMessageUseCase]` pour qu'il envoie le message à Alan selon le mode
- Gestion des Media:
  - [PENDING] Ecrire la feature pour uploader les media

## Integration de Netty
- [PENDING] Ranger les projets par namespace; un namespace par projet pour isoler les communications
- [OK] Configuration du serveur WS
- [OK][PATCHED] Gestion des connexion et déconnexions d'utilisateurs
- [OK] Gestion de l'envoie des messages
- [TODO] Accusé de reception de message
- [TODO] Accusé de lecture de message