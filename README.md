# Mises à jour futures:
## HTTP
- Authentification avec JWT 
  - [OK] Erire les UseCase de Login pour Organization et User
  - [OK] Rajouter La sécurité (SecurityConfig) pour proteger les endpoints
  - [TODO] Rajouter La sécurité pour sécuriser la partie Websocket
- Gestion des modes de conversation:
  - [OK] Rajouter un endpoint pout changer le mode d'une conversation
  - [ONGOING] Update le usecase d'envoie  de messages `@[SendMessageUseCase]` pour qu'il envoie le message à Alan selon le mode
- Gestion des Media:
  - [OK] Ecrire la feature pour uploader les media
- Chiffrement de bout en bout
  - [TODO] Implementer le chiffrement de bout en bout pour securiser 

## Integration de Netty
- [PENDING] Ranger les projets par namespace; un namespace par projet pour isoler les communications
- [OK] Configuration du serveur WS
- [OK][PATCHED] Gestion des connexion et déconnexions d'utilisateurs
- [OK] Gestion de l'envoie des messages
- [TODO] Accusé de reception de message
- [TODO] Accusé de lecture de message

## BD
- [TODO] switcher la bd de MySQL à PGSQL

## Service de chatbot
- [SPRING] Ecrire la gestion des chatbot avec sprinboot
  - [TODO] Ecrire une route qui retourne la liste des llm disponibles demarrer avec 2versions de Gemini
  - [TODO] ecrire le schema d'un chatbot (llm, prompt, {attachement, comment}[], accessKey, )
  - [TODO] Gerer la creation de chatbot (ceci envoie un init sur le service python)
  - [AFTER] Gerer la mise à jour du llm d'un chatbot (ceci envoie un update sur le service python)
- [PYTHON] Ecrire le service Python de chatbot (/init, /create, /infer ) 
  - [TODO] /init permet d'initialiser/configurer un chat (called by springboot app);
  - [TODO] /create permet de creer une nouvelle instance d'un chatbot idChatbot --> idInstanceChat (clé dans la table de conversations)
  - [TODO] /infer prend en entrée un texte (message avec ou sans piece jointe) et retourne la repose du bot, cette reponse est également stockée dans
  - [AFTER] /update/llm permet d'update le llm associé à un Chatbot

### BD -- Java
- Chatbot (id:uuid, projectId: str, llm: enum, prompt: str, Attachement[], accesskey:uuid)
- Attachement (id: uuid, path:str, mime:str, path: str)

### BD -- Python
- Chatbot: (id: uuid, accesskey: uuid, llm:enum, prompt:str, vector: VectorId)
- Vector --- la base de donnée vectorielle pour le RAG, 
- Chat: (id: uuid, chatbot: Chatbot, body: str, from: USER | AGENT)
