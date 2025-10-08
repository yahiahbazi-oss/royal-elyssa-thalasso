# ROYAL ELYSSA WEBSITE - DOCUMENTATION TECHNIQUE

## Table des Matières

1. [Vue d'ensemble du Projet](#vue-densemble-du-projet)
2. [Architecture Technique](#architecture-technique)
3. [Structure des Fichiers](#structure-des-fichiers)
4. [Configuration et Déploiement](#configuration-et-déploiement)
5. [Guide de Modification](#guide-de-modification)
6. [Système de Traduction](#système-de-traduction)
7. [Gestion des Images](#gestion-des-images)
8. [Maintenance](#maintenance)
9. [Dépannage](#dépannage)

---

## 1. Vue d'ensemble du Projet

### Description
Site web vitrine pour Royal Elyssa Thalasso & Spa, présentant quatre enseignes principales :
- **THALION** - Créateur de cosmétique marine
- **ERIC ZEMMOUR** - Salon de coiffure haute gamme
- **L'USINE** - Club de sport
- **CARRÉ VIP SPA** - Suites de luxe

### Technologies Utilisées
- **Frontend**: React 19.1.0 + Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **Animations**: Framer Motion 12.23.12
- **Traductions**: React-i18next 15.6.1
- **Icons**: Lucide React 0.533.0
- **Cartes**: React Leaflet 5.0.0
- **Déploiement**: Vercel

### Langues Supportées
- Français (FR) - Par défaut
- Anglais (EN)
- Russe (RU)

---

## 2. Architecture Technique

### Stack Technologique
```
Frontend: React (SPA - Single Page Application)
├── Build Tool: Vite
├── CSS Framework: Tailwind CSS
├── Routing: React Router DOM
├── Animations: Framer Motion
├── Internationalization: i18next
└── Deployment: Vercel
```

### Structure de Navigation
```
/ (Accueil)
├── /thalion (Page Thalion)
├── /erich-zemmour (Page Eric Zemmour)
├── /usine (Page L'Usine)
├── /suite (Page Carré VIP)
└── /contact (Page Contact)
```

### Composants Principaux
- **Header** - Navigation responsive avec dropdown
- **Hero** - Sections d'en-tête avec animations
- **Gallery** - Galeries d'images optimisées
- **Services** - Affichage des prestations et tarifs
- **Contact** - Formulaires et informations
- **Footer** - Pied de page avec liens

---

## 3. Structure des Fichiers

```
royalelyssav1/
├── public/                     # Assets statiques
│   ├── favicon.ico
│   ├── logo.png
│   └── brochures/              # PDFs et documents
├── src/
│   ├── components/             # Composants réutilisables
│   │   ├── Header.jsx          # Navigation principale
│   │   ├── Footer/             # Composants footer
│   │   ├── Map/                # Composant carte interactive
│   │   └── OptimizedImage.jsx  # Images optimisées
│   ├── pages/                  # Pages principales
│   │   ├── Home.jsx            # Page d'accueil
│   │   ├── ErichZemmour/       # Page salon coiffure
│   │   ├── Thalion/            # Page cosmétique marine
│   │   ├── Usine/              # Page club sport
│   │   ├── Suite/              # Page suites VIP
│   │   └── ContactPage.jsx     # Page contact
│   ├── locales/                # Fichiers de traduction
│   │   ├── fr/translation.json # Traductions françaises
│   │   ├── en/translation.json # Traductions anglaises
│   │   └── ru/translation.json # Traductions russes
│   ├── assets/                 # Images et médias
│   ├── contexts/               # Contextes React
│   ├── hooks/                  # Hooks personnalisés
│   └── sections/               # Sections réutilisables
├── package.json                # Dépendances du projet
├── vite.config.js             # Configuration Vite
├── vercel.json                # Configuration déploiement
└── tailwind.config.js         # Configuration Tailwind
```

---

## 4. Configuration et Déploiement

### Prérequis Système
- **Node.js**: Version 18+ recommandée
- **npm**: Version 9+ ou **yarn**
- **Git**: Pour le versioning

### Installation Locale
```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd royalelyssav1

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
# → Accessible sur http://localhost:5173

# Construire pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

### Déploiement Vercel
Le site est configuré pour un déploiement automatique sur Vercel :

1. **Configuration automatique** via `vercel.json`
2. **Déploiement continu** : Push sur la branche `main` = déploiement automatique
3. **URL de production** : [Votre domaine Vercel]

### Variables d'Environnement (si nécessaires)
Créer un fichier `.env.local` :
```env
# Exemple pour APIs externes
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

---

## 5. Guide de Modification

### Modification de Contenu Textuel

#### 1. Textes Multilingues
**Fichiers concernés**: `src/locales/{fr,en,ru}/translation.json`

**Structure des clés** :
```json
{
  "header": {
    "navigation": {
      "royalElyssa": {
        "title": "ROYAL ELYSSA",
        "accueil": "ACCUEIL"
      }
    }
  },
  "ericZemmour": {
    "hero": {
      "title": "Notre Salon à",
      "location": "MONASTIR"
    }
  }
}
```

**Pour modifier un texte** :
1. Identifier la clé dans le composant (ex: `t("ericZemmour.hero.title")`)
2. Modifier dans les 3 fichiers de traduction
3. Tester dans chaque langue

#### 2. Tarifs et Prestations
**Fichier**: Pages spécifiques (ex: `src/pages/ErichZemmour/ErichZemmour.jsx`)

**Structure des prix** :
```javascript
const pricingData = {
  coupe: {
    title: t("ericZemmour.services.categories.coupe"),
    items: [
      {
        services: [
          {
            name: t("ericZemmour.services.pricing.services.shampoing"),
            tnd: 10
          }
        ]
      }
    ]
  }
}
```

### Modification d'Images

#### 1. Images Hébergées sur Cloudinary
**URLs actuelles** :
```javascript
// Exemples d'images Cloudinary
const AccueilImage = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759766936/Club_de_sport_lusine_2_yvzotc.jpg";
```

**Pour remplacer une image** :
1. Uploader la nouvelle image sur Cloudinary
2. Copier la nouvelle URL
3. Remplacer dans le fichier correspondant

#### 2. Images Locales
**Dossier**: `src/assets/`
- Ajouter l'image dans le bon sous-dossier
- Importer dans le composant : `import MonImage from "../assets/dossier/image.jpg"`

### Ajout d'une Nouvelle Page

#### 1. Créer le Composant
```javascript
// src/pages/NouvellePage/NouvellePage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const NouvellePage = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("nouvellePage.title")}</h1>
      {/* Contenu de la page */}
    </div>
  );
};

export default NouvellePage;
```

#### 2. Ajouter la Route
**Fichier**: `src/App.jsx` ou équivalent
```javascript
import { Routes, Route } from 'react-router-dom';
import NouvellePage from './pages/NouvellePage/NouvellePage';

// Dans le JSX
<Routes>
  {/* Routes existantes */}
  <Route path="/nouvelle-page" element={<NouvellePage />} />
</Routes>
```

#### 3. Ajouter les Traductions
Dans `src/locales/{fr,en,ru}/translation.json` :
```json
{
  "nouvellePage": {
    "title": "Titre de la Nouvelle Page",
    "subtitle": "Sous-titre..."
  }
}
```

---

## 6. Système de Traduction

### Configuration i18next
**Fichier principal**: `src/i18n.js`

### Utilisation dans les Composants
```javascript
import { useTranslation } from 'react-i18next';

const MonComposant = () => {
  const { t, i18n } = useTranslation();
  
  // Changer de langue
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div>
      <h1>{t('cle.de.traduction')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
};
```

### Structure des Fichiers de Traduction
- **Hiérarchique** : `section.subsection.element`
- **Cohérente** : Même structure dans les 3 langues
- **Descriptive** : Noms de clés explicites

### Détection Automatique de Langue
Le système détecte automatiquement :
1. Langue du navigateur
2. Langue stockée localement
3. Fallback sur le français

---

## 7. Gestion des Images

### Images Cloudinary (Recommandé)
**Avantages** :
- Optimisation automatique
- Redimensionnement à la volée
- CDN mondial
- Pas de limitation de stockage local

**Format d'URL** :
```
https://res.cloudinary.com/dxoje33mm/image/upload/v[timestamp]/[nom_image].[ext]
```

### Images Locales (Assets)
**Utilisation** :
- Images statiques (logos, icônes)
- Images de petite taille
- Images ne nécessitant pas d'optimisation

### Optimisation des Performances
- **Lazy Loading** : Images chargées à la demande
- **WebP Support** : Format moderne pour réduire la taille
- **Responsive Images** : Différentes tailles selon l'écran

---

## 8. Maintenance

### Mises à Jour de Dépendances
```bash
# Vérifier les dépendances obsolètes
npm outdated

# Mettre à jour les dépendances mineures
npm update

# Mettre à jour une dépendance majeure
npm install package@latest
```

### Monitoring et Analytics
- **Vercel Analytics** : Performances automatiques
- **Console Vercel** : Logs et erreurs de déploiement
- **Browser DevTools** : Debug local

### Sauvegardes
- **Git** : Historique complet des modifications
- **Vercel** : Rollback instantané des déploiements
- **Assets** : Cloudinary sauvegarde automatiquement

### Performance
```bash
# Analyser la taille du bundle
npm run build
# Vérifier les fichiers dans dist/

# Audit des performances
npm audit
```

---

## 9. Dépannage

### Problèmes Courants

#### 1. Site ne se charge pas
**Causes possibles** :
- Erreur de build
- Problème de déploiement Vercel
- Erreur JavaScript

**Solutions** :
1. Vérifier la console du navigateur
2. Consulter les logs Vercel
3. Tester en local : `npm run dev`

#### 2. Traductions non affichées
**Causes** :
- Clé manquante dans les fichiers JSON
- Erreur de syntaxe JSON
- Mauvaise utilisation de `t()`

**Solutions** :
1. Vérifier la clé dans tous les fichiers de traduction
2. Valider la syntaxe JSON
3. Vérifier l'import de `useTranslation`

#### 3. Images non affichées
**Causes** :
- URL Cloudinary incorrecte
- Chemin d'import incorrect
- Image supprimée

**Solutions** :
1. Tester l'URL directement dans le navigateur
2. Vérifier le chemin d'import
3. Re-uploader l'image si nécessaire

#### 4. Erreurs de Build
**Messages courants** :
```bash
# Module not found
npm install [module-manquant]

# Syntax error
# Vérifier la syntaxe du fichier mentionné

# Memory limit
# Augmenter la limite Node.js
```

### Contacts Techniques
- **Documentation Vite** : https://vitejs.dev/
- **Documentation React** : https://react.dev/
- **Documentation Tailwind** : https://tailwindcss.com/
- **Support Vercel** : https://vercel.com/support

---

## Commandes Utiles

### Développement
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
npm run lint         # Vérifier le code
```

### Git (Contrôle de Version)
```bash
git add .                    # Ajouter tous les changements
git commit -m "Message"      # Confirmer les changements
git push                     # Envoyer vers le serveur
git pull                     # Récupérer les changements
```

### Vercel (Déploiement)
```bash
vercel                      # Déployer manuellement
vercel --prod              # Déployer en production
vercel logs                # Voir les logs
```

---

**Document créé le** : 7 octobre 2025
**Version du projet** : 1.0.0
**Dernière mise à jour** : [À actualiser lors des modifications]