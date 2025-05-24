# Datawarehouse Client Dashboard

Cette application est une démonstration professionnelle d'un système de visualisation de données centralisées, basé sur les principes des entrepôts de données (datawarehousing).

## Fonctionnalités

- **Téléversement multi-fichiers** : Importez plusieurs fichiers `.csv` ou `.json` d’un seul coup.
- **Exploration des données** : Toutes les colonnes et lignes des fichiers sont affichées automatiquement.
- **Interface intuitive** : UI moderne et responsive pour une expérience utilisateur professionnelle.

## Utilisation dans le domaine des entrepôts de données

Ce tableau de bord simule un système d'ingestion de données client à partir de fichiers externes. Il peut être utilisé pour :

- **Tester des flux ETL légers** (Extract, Transform, Load)
- **Simuler un mini data lake local**
- **Fournir une interface aux analystes pour consulter les données**
- **Construire un prototype de dashboard pour des directions métiers**

## Technologies utilisées

- **Next.js** — Framework React moderne
- **Tailwind CSS** — Pour le style rapide et professionnel
- **JavaScript** — Côté client & serveur
- **Stockage en mémoire (RAM)** — Pas de base de données, données éphémères

## Instructions

1. Démarrez l’application avec :
    ```bash
    npm install
    npm run dev
    ```
2. Accédez à `http://localhost:3000`
3. Téléversez un ou plusieurs fichiers CSV ou JSON
4. Visualisez les données immédiatement

---

**Auteur** : Emman Mlmb  
**Usage recommandé** : pour prototypage, POC, ou formation à l'analyse de données.