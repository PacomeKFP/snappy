#!/bin/bash

# Vérification de la présence d'un tag en argument
if [ -z "$1" ]; then
  echo "Usage: $0 <tag>"
  exit 1
fi

TAG=$1

# Se placer dans le répertoire du projet
cd /home/ubuntu/workspace/snappy/v2-server-main || { echo "Erreur : Impossible d'accéder au répertoire du projet"; exit 1; }

echo "-> Récupération des tags depuis le dépôt..."
git fetch --all --tags

echo "-> Checkout du tag '$TAG'..."
git checkout tags/$TAG || { echo "Erreur : Le tag '$TAG' n'existe pas"; exit 1; }

echo "-> Construction du projet avec Maven..."
mvn clean package || { echo "Erreur lors du build Maven"; exit 1; }

# Identifier le fichier JAR généré
JAR_FILE=$(find target -maxdepth 1 -type f -name "*.jar" | head -n 1)
if [ -z "$JAR_FILE" ]; then
  echo "Erreur : Aucun fichier JAR trouvé dans target"
  exit 1
fi

echo "-> Renommage du JAR '$JAR_FILE' en 'snappy.jar'..."
cp "$JAR_FILE" target/snappy.jar || { echo "Erreur lors du renommage du JAR"; exit 1; }

echo "-> Redémarrage du service snappy..."
sudo systemctl restart snappy.service || { echo "Erreur lors du redémarrage du service"; exit 1; }

echo "-> Déploiement terminé avec succès."
