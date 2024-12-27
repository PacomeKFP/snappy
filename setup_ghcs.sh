#!/bin/bash

# Arrêt en cas d'erreur
set -e

# Couleurs pour la sortie
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # Pas de couleur

echo -e "${GREEN}=== Initialisation de l'environnement ===${NC}"

# Mise à jour des paquets
echo -e "${GREEN}Mise à jour des paquets...${NC}"
sudo apt update -y && sudo apt upgrade -y

# Installation de Java
echo -e "${GREEN}Installation de Java...${NC}"
sudo apt install -y openjdk-21-jdk

# Installation de Maven
echo -e "${GREEN}Installation de Maven...${NC}"
sudo apt install -y maven

# Installation de MySQL Server
echo -e "${GREEN}Installation de MySQL...${NC}"
sudo apt install -y mysql-server

# Configuration de MySQL
echo -e "${GREEN}Configuration de MySQL...${NC}"
sudo service mysql start

# Définir les variables MySQL
DB_NAME="snappy"
DB_USER="snappy_user"
DB_PASS="password123"

# Exécuter les commandes MySQL
echo -e "${GREEN}Création de la base de données et de l'utilisateur...${NC}"
sudo mysql -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"
sudo mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
sudo mysql -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Vérification de la base de données
echo -e "${GREEN}Bases de données disponibles :${NC}"
sudo mysql -e "SHOW DATABASES;"

# Finalisation
echo -e "${GREEN}=== Installation et configuration terminées avec succès ===${NC}"
echo -e "${GREEN}Base de données : ${DB_NAME}${NC}"
echo -e "${GREEN}Utilisateur : ${DB_USER}${NC}"
echo -e "${GREEN}Mot de passe : ${DB_PASS}${NC}"
