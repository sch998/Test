# Application Web de Réparation - Angers

Application web complète pour un magasin de réparation de téléphones, ordinateurs, tablettes et consoles de jeux à Angers.

## 🚀 Fonctionnalités

### Frontend (Public)

- ✅ **Page d'accueil optimisée SEO** avec présentation des services
- ✅ **Formulaire de demande de réparation** en plusieurs étapes :
  - Sélection du type d'appareil (téléphone, ordinateur, tablette, console)
  - Choix de la marque
  - Choix du modèle
  - Sélection de la panne avec prix automatique
  - Formulaire client avec choix du service (sur place ou envoi postal)
- ✅ **Suivi en ligne des réparations** avec numéro de suivi
- ✅ **Pages FAQ** optimisées pour le référencement
- ✅ Affichage des avis Google (à configurer)
- ✅ Design responsive et moderne avec Tailwind CSS

### Backend (Administration)

- ✅ **Authentification sécurisée** par mot de passe
- ✅ **Tableau de bord** avec statistiques en temps réel
- ✅ **Gestion des appareils** :
  - Types d'appareils (téléphone, ordinateur, tablette, console)
  - Marques par type d'appareil
  - Modèles par marque
  - Pannes par modèle avec prix et durée
- ✅ **Gestion des réparations** :
  - Suivi complet du statut (en attente, diagnostiqué, en cours, terminé, etc.)
  - Notes du technicien
  - Gestion des acomptes
  - Historique détaillé
- ✅ **Gestion des clients** avec coordonnées complètes
- ✅ **Gestion des pièces détachées** avec stocks et alertes
- ✅ **Gestion des fournisseurs** et commandes
- ✅ **Génération de factures**
- ✅ **Gestion des garanties** (6 mois)

## 📋 Prérequis

- Node.js 18+
- npm ou yarn

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd phone-repair-shop-angers
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copier le fichier `.env.example` vers `.env` et configurer les valeurs :

```bash
cp .env.example .env
```

Modifier le fichier `.env` :

```env
# Base de données (SQLite par défaut)
DATABASE_URL="file:./dev.db"

# NextAuth - Générer un secret aléatoire avec: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-securise-a-changer"

# Google Places API (optionnel - pour les avis)
GOOGLE_PLACES_API_KEY="votre-cle-google-api"
GOOGLE_PLACE_ID="votre-place-id"
```

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
npm run db:generate

# Créer la base de données
npm run db:push

# Peupler avec des données initiales
npx ts-node scripts/seed.ts
```

Cela créera :
- Un utilisateur admin : `admin@reparation-express.fr` / `admin123`
- Des types d'appareils de base (Téléphone, Ordinateur, Tablette, Console)
- Des marques exemple (Apple, Samsung)
- Des modèles exemple (iPhone 12, iPhone 13, Galaxy S21)
- Des pannes courantes avec prix

### 5. Lancer l'application

```bash
# Mode développement
npm run dev

# L'application sera disponible sur http://localhost:3000
```

## 📱 Utilisation

### Frontend Public

- **Accueil** : http://localhost:3000
- **Demander une réparation** : http://localhost:3000/reparation
- **Suivre une réparation** : http://localhost:3000/suivi
- **FAQ** : http://localhost:3000/faq

### Backend Admin

- **Connexion admin** : http://localhost:3000/admin/login
  - Email : `admin@reparation-express.fr`
  - Mot de passe : `admin123` (⚠️ À changer en production !)

- **Tableau de bord** : http://localhost:3000/admin
- **Gestion des réparations** : http://localhost:3000/admin/repairs
- **Autres sections** : Disponibles dans le menu latéral

## 🗂️ Structure du Projet

```
├── app/
│   ├── (public)/              # Pages publiques
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── reparation/        # Formulaire de demande
│   │   ├── suivi/             # Suivi des réparations
│   │   └── faq/               # Questions fréquentes
│   ├── (admin)/               # Administration
│   │   └── admin/
│   │       ├── login/         # Connexion admin
│   │       ├── page.tsx       # Dashboard
│   │       └── repairs/       # Gestion des réparations
│   ├── api/                   # API Routes
│   │   ├── auth/              # NextAuth
│   │   ├── public/            # API publiques
│   │   └── [autres]/          # API admin protégées
│   └── components/            # Composants réutilisables
├── prisma/
│   └── schema.prisma          # Schéma de base de données
├── lib/                       # Utilitaires
│   ├── prisma.ts              # Client Prisma
│   ├── auth.ts                # Configuration NextAuth
│   └── utils.ts               # Fonctions utilitaires
└── scripts/
    └── seed.ts                # Script de seeding
```

## 🔧 Technologies Utilisées

- **Framework** : Next.js 14+ (App Router)
- **Language** : TypeScript
- **Base de données** : SQLite (Prisma ORM)
- **Authentification** : NextAuth.js
- **UI** : Tailwind CSS + Composants personnalisés
- **Validation** : Zod
- **Génération PDF** : jsPDF (pour les factures)

## 🎨 Personnalisation

### Modifier les couleurs

Éditer le fichier `tailwind.config.ts` pour changer la palette de couleurs.

### Ajouter des types d'appareils

1. Se connecter en admin
2. Aller dans "Appareils"
3. Ajouter un nouveau type d'appareil, puis des marques, puis des modèles

### Configurer les avis Google

1. Obtenir une clé API Google Places
2. Trouver votre Place ID
3. Ajouter les clés dans `.env`
4. L'intégration affichera automatiquement vos avis

## 🚀 Déploiement

### Production

```bash
# Build
npm run build

# Start
npm start
```

### Variables d'environnement de production

⚠️ **Important** : En production, assurez-vous de :

1. Changer `NEXTAUTH_SECRET` avec une valeur sécurisée
2. Utiliser une vraie base de données (PostgreSQL, MySQL) au lieu de SQLite
3. Configurer `NEXTAUTH_URL` avec votre domaine
4. Changer le mot de passe de l'utilisateur admin

### Déploiement sur Vercel

1. Pusher le code sur GitHub
2. Importer le projet sur Vercel
3. Configurer les variables d'environnement
4. Configurer une base de données PostgreSQL (Vercel Postgres ou autre)
5. Déployer

## 📝 Tâches Post-Installation

- [ ] Changer le mot de passe admin par défaut
- [ ] Configurer les informations de contact (téléphone, email, adresse)
- [ ] Ajouter vos types d'appareils, marques et modèles
- [ ] Configurer les prix des réparations
- [ ] Personnaliser les pages FAQ avec vos informations
- [ ] Configurer les avis Google
- [ ] Configurer l'envoi d'emails (optionnel)
- [ ] Tester le processus complet de demande de réparation

## 📧 Support

Pour toute question ou problème, contactez le développeur ou consultez la documentation de Next.js.

## 📄 Licence

Ce projet est privé et réservé à l'usage du magasin.

---

**Fait avec ❤️ pour votre magasin de réparation à Angers**
