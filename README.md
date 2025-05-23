# Dashboard Webhook

Ce projet est une mini-application de tableau de bord en ligne permettant :

- La visualisation en temps réel de données clients historisées.
- Le téléversement de fichiers `.json` ou `.csv`.
- L’actualisation automatique via webhook simulé (`EventSource`).

## Installation locale

1. **Cloner le projet**  
```bash
git clone https://github.com/EJM0101/Dashboard-Webhook-app && cd Dashboard-Webhook-app
```

2. **Installer les dépendances**  
```bash
npm install
```

3. **Lancer le serveur de développement**  
```bash
npm run dev
```

## Déploiement sur Vercel

- Poussez ce dossier vers GitHub.
- Connectez votre repo à [Vercel](https://vercel.com/).
- Déployez automatiquement.

## Structure des fichiers CSV pris en charge

```csv
name,email,last_order
Jean Dupont,jean@example.com,2025-05-21
Alice Martin,alice@example.com,2025-05-20
David Kabila,david@example.com,2025-05-19
Marie Mboma,marie@example.com,2025-05-18
```

## Dépendances

- Next.js 14
- React 18
- TailwindCSS
- Formidable (gestion fichiers)
