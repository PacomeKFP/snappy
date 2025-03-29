# Axes d’Amélioration

Ce document présente plusieurs axes d’amélioration concernant le développement logiciel, l’intelligence artificielle et la sécurisation des échanges. Les propositions restent alignées sur vos idées initiales, tout en apportant des précisions pour faciliter leur compréhension et leur mise en œuvre.

---

## Génie Logiciel

### 1. Client Mobile de Messagerie

**Objectif :**  
Développer un client mobile pour le Proof of Concept (PoC) qui sera intégré au même projet que le PoC en ligne.

**Points clés :**
- Le client peut être développé en Flutter ou en React Native, selon la technologie retenue par l’équipe.
- Ce client permettra de tester l’interface utilisateur et la robustesse des échanges en situation réelle.

### 2. SDK pour Faciliter l’Intégration

**Objectif :**  
Fournir trois SDK destinés à simplifier l’intégration et l’interaction avec l’API.

**Détails des SDK :**
- **Couche Conceptuelle :**
    - Fournit les primitives nécessaires pour interagir avec l’API.
    - Gère la connexion aux différents événements disponibles.
- **Deux Couches Visuelles :**
    - Ces deux SDK se concentrent sur la présentation des interfaces.
    - Le premier est adapté à React, le second à React Native (RN).
    - Ils reposent sur la couche conceptuelle en exploitant ses primitives pour gérer les interactions tout en fournissant uniquement ce qui est nécessaire pour la partie visuelle.

### 3. Optimisation du Broadcasting de Messages via Socket.IO

**Problématique actuelle :**  
Notifier l’ensemble des utilisateurs concernés par un événement peut être fastidieux et coûteux en ressources, soit à cause d’un coût computationnel élevé, soit par l’absence d’algorithmes adaptés.

**Proposition :**
- Développer une méthode optimisée pour le broadcasting de messages via Socket.IO.
- Évaluer et mettre en œuvre des algorithmes qui minimisent le coût computationnel tout en assurant une diffusion rapide et efficace des notifications.

### 4. Optimisation des Performances de l'API

**Problématique actuelle :**  
Les temps de réponse de l’API sont insuffisants et pourraient ne pas garantir de bonnes performances en cas de montée en charge.

**Axes d'amélioration :**
- **Mécanismes de Caching :**  
  Mettre en place des caches pour réduire les temps de réponse et limiter les accès redondants aux données.
- **Architecture Asynchrone :**  
  Rendre l’API asynchrone afin d’augmenter le nombre de requêtes gérables simultanément et d’améliorer la réactivité.
- **Utilisation de Schedulers :**  
  Intégrer des planificateurs pour gérer les échanges avec des API externes de manière non bloquante, garantissant ainsi la fluidité des autres échanges au sein de l’application.

---


## Intelligence Artificielle (IA)

### 1. Reposer Alan sur l’API de Chatbot

**Problématique actuelle :**  
Alan dispose actuellement d’une infrastructure dédiée contenant toute la logique métier pour accéder aux modèles de langage et traiter les messages. Cette redondance de code rend la solution moins optimisée.

**Proposition :**
- Utiliser un chatbot déjà existant via son API.
- Alan fonctionnera alors en tant que client de cette API, ne conservant que le surplus de logique métier indispensable pour répondre aux messages.
- Il pourra ainsi effectuer une inférence complémentaire en se basant sur les réponses fournies par le chatbot.

### 2. Multiplier les Modèles de Langage Open Source Disponibles

**Contexte :**  
À ce jour, le développement s’appuie sur une seule version de Gemini.

**Proposition :**
- Explorer et intégrer d’autres modèles de langage open source existants.
- Cela permettra d’enrichir les capacités de l’IA et d’éviter une dépendance excessive à un seul modèle.

---

## Protocole de Chiffrement

### 1. Accès aux Messages Chiffrés par Alan

**Contexte :**  
Les messages échangés entre utilisateurs sont chiffrés. Ainsi, lorsqu’Alan reçoit ces messages, il ne peut pas les lire directement, car ils restent sous forme chiffrée.

**Objectif :**  
Définir un moyen sécurisé permettant à Alan d’accéder aux messages en clair, tout en maintenant un haut niveau de sécurité.

**Solutions envisagées :**

- **Solution 1 : Ne pas chiffrer les messages en mode LISTEN et ON**
    - À proscrire : cette méthode est extrêmement peu sécurisée.

- **Solution 2 : Envoyer le message en clair à Alan**
    - Processus : le destinataire déchiffre le message puis le transmet à Alan.
    - Remarque : cette approche nécessite une gestion rigoureuse pour éviter toute compromission des données.

- **Solution 3 : Créer des clés privées partagées (inspirées du protocole Signal)**
    - Chaque utilisateur disposera de deux groupes de clés :
        - **Clés personnelles :**
            - Les paires de clés classiques du protocole Signal.
            - L’utilisateur conserve sa clé privée et partage uniquement sa clé publique.
        - **Clés partagées :**
            - Similaires aux clés personnelles, mais la clé privée est partagée avec Alan.
    - Pour les conversations en modes LISTEN et ON, on utilisera ces clés partagées pour chiffrer le message avant l’envoi.
    - Lors d’un changement de mode de conversation, un message de diffusion (via Socket.IO par exemple) informera tous les utilisateurs qu’ils doivent désormais utiliser leurs clés privées (ou partagées, selon le cas).

**Illustration de la sécurité :**
- **Ring 0 :** Messages chiffrés avec les clés personnelles (niveau de sécurité maximal).
- **Ring 1 :** Messages chiffrés avec les clés partagées (niveau de sécurité ajusté pour permettre l’accès à Alan).

### 2. Multidevice – Partage Sécurisé des Clés Privées entre Appareils

**Contexte :**  
Le multidevice permet à un utilisateur de connecter son compte de messagerie sur plusieurs appareils simultanément. Pour que chaque appareil puisse déchiffrer les messages reçus, ils doivent partager la même clé privée.

**Objectif :**  
Mettre en place un protocole sécurisé pour transférer la clé privée d’un appareil à l’autre.

**Approche proposée : P2P + WebRTC**
- **Communication P2P :**
    - Établir une connexion directe entre les appareils, similaire aux systèmes de VoIP ou de visioconférence.
- **Sécurisation du transfert :**
    - Chiffrer la clé dès son envoi et la déchiffrer uniquement à destination.
    - Utiliser un code (similaire à un 2FA) fourni par l’appareil source, que l’appareil destination devra saisir pour authentifier le transfert.
- **Rôle de WebRTC :**
    - Permettre une connexion directe sans intermédiaire, garantissant ainsi un échange sécurisé et en temps réel.
