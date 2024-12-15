# Alan API - Service de Messagerie Intelligent avec IA

## Description
Alan API est un service de messagerie intelligent qui intègre l'API Gemini de Google pour générer des réponses automatiques aux messages. Cette API permet de gérer des conversations avec ou sans réponses automatiques générées par l'IA.

## Fonctionnalités
- Gestion des messages et conversations
- Génération automatique de réponses via Gemini AI
- Support des fils de discussion (reply)
- Mode de conversation configurable
- Suivi de l'état de lecture des messages

## Architecture du Projet
```
alan_api/
├── app/
│   ├── __init__.py
│   ├── config/
│   │   └── config.py         # Configuration (variables d'environnement)
│   ├── crud/
│   │   └── message_crud.py   # Opérations CRUD pour les messages
│   ├── database/
│   │   └── database.py       # Configuration de la base de données
│   ├── models/
│   │   └── message_model.py  # Modèle de données des messages
│   ├── routers/
│   │   └── message_router.py # Routes de l'API
│   ├── schemas/
│   │   └── message_schema.py # Schémas Pydantic
│   ├── services/
│   │   ├── message_service.py # Logique métier des messages
│   │   └── gemini_service.py  # Service d'intégration Gemini
│   └── utils/                 # Utilitaires
├── requirements.txt
└── reset_db.py               # Script de réinitialisation de la BDD
```

## Prérequis
- Python 3.8+
- MySQL
- Clé API Gemini

## Installation

1. **Cloner le dépôt**
```bash
git clone [URL_DU_REPO]
cd alan_api
```

2. **Créer un environnement virtuel**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
.\venv\Scripts\activate  # Windows
```

3. **Installer les dépendances**
```bash
pip install -r requirements.txt
```

4. **Configuration**
Créer un fichier `.env` à la racine du projet :
```env
DATABASE_URL=mysql+pymysql://user:password@localhost/database_name
GEMINI_API_KEY=votre_cle_api_gemini
```

5. **Initialiser la base de données**
```bash
python reset_db.py
```

## Démarrage

1. **Lancer l'API**
```bash
uvicorn app.main:app --reload
```
L'API sera accessible à l'adresse : http://127.0.0.1:8000

2. **Documentation API**
- Swagger UI : http://127.0.0.1:8000/docs
- ReDoc : http://127.0.0.1:8000/redoc

## Endpoints API

### POST /messages/
Crée un nouveau message et génère optionnellement une réponse.

**Requête**
```json
{
    "author": "string",
    "conversation": "string",
    "content": "string",
    "isRead": boolean,
    "replyTo": "string" | null,
    "conversationMode": integer
}
```

**Paramètres**
- `author` : Identifiant de l'auteur
- `conversation` : Identifiant de la conversation
- `content` : Contenu du message
- `isRead` : État de lecture du message
- `replyTo` : ID du message auquel celui-ci répond (optionnel)
- `conversationMode` : Mode de conversation
  - `0` : Pas de réponse automatique
  - `1` : Génération d'une réponse par l'IA

**Réponse**
```json
{
    "response": "string"  // Si conversationMode = 1
}
```
ou
```json
{
    "message": "Message enregistré avec succès."  // Si conversationMode = 0
}
```

## Structure de la Base de Données

### Table `messages`
| Colonne          | Type         | Description                               |
|------------------|--------------|-------------------------------------------|
| uuid             | String(36)   | Identifiant unique (Primary Key)          |
| author           | String(36)   | Identifiant de l'auteur                  |
| conversation     | String(36)   | Identifiant de la conversation           |
| content          | String(255)  | Contenu du message                       |
| isRead           | Boolean      | État de lecture                          |
| replyTo          | String(36)   | ID du message parent (nullable)          |
| conversationMode | Integer      | Mode de conversation (0 ou 1)            |
| createdAt        | DateTime     | Date de création                         |
| updatedAt        | DateTime     | Date de dernière modification            |

## Sécurité
- Utilisation de variables d'environnement pour les informations sensibles
- Validation des données avec Pydantic
- CORS configuré (à restreindre en production)

## Configuration CORS
Le CORS est actuellement configuré pour permettre toutes les origines (`"*"`). En production, il est recommandé de restreindre cela aux domaines spécifiques.

## Tests
Pour exécuter les tests (à implémenter) :
```bash
pytest
```

## Workflow de Développement
1. Créer une branche pour la nouvelle fonctionnalité
2. Développer et tester localement
3. Créer une Pull Request
4. Review et merge après validation

## Résolution des Problèmes Courants

### Erreur de connexion à la base de données
1. Vérifier les informations de connexion dans `.env`
2. S'assurer que MySQL est en cours d'exécution
3. Vérifier que la base de données existe

### Erreur avec l'API Gemini
1. Vérifier la clé API dans `.env`
2. S'assurer que la clé a les permissions nécessaires
3. Vérifier la connexion internet

## Améliorations Futures
- [ ] Ajout de tests unitaires et d'intégration
- [ ] Mise en place d'une authentification
- [ ] Support de WebSocket pour les messages en temps réel
- [ ] Pagination des résultats
- [ ] Cache pour optimiser les performances
- [ ] Support de fichiers attachés

## Licence
[Votre licence]

## Contribution
Les contributions sont les bienvenues ! Voir `CONTRIBUTING.md` pour les détails.

## Support
Pour toute question ou problème :
- Ouvrir une issue
- Contacter l'équipe de développement