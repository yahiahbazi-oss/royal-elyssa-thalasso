# ROYAL ELYSSA - GUIDE RAPIDE D'UTILISATION

## 🚀 Démarrage Rapide

### Pour développer localement
```bash
npm install
npm run dev
```
→ Site accessible sur http://localhost:5173

### Pour déployer
```bash
git add .
git commit -m "Mes modifications"
git push
```
→ Déploiement automatique sur Vercel

---

## 📝 Modifications Fréquentes

### 1. Changer un texte
**Fichiers** : `src/locales/fr|en|ru/translation.json`
- Français : `src/locales/fr/translation.json`
- Anglais : `src/locales/en/translation.json`  
- Russe : `src/locales/ru/translation.json`

**Exemple** : Pour changer le titre de la page Thalion
```json
{
  "thalion": {
    "hero": {
      "title": "NOUVEAU TITRE ICI"
    }
  }
}
```

### 2. Modifier les tarifs
**Fichier** : `src/pages/ErichZemmour/ErichZemmour.jsx`

Chercher la section `pricingData` et modifier :
```javascript
{
  name: "Nom du service",
  tnd: 50  // Prix en TND
}
```

### 3. Remplacer une image
**Option A - Cloudinary (Recommandé)** :
1. Uploader sur Cloudinary
2. Copier l'URL générée
3. Remplacer dans le fichier concerné

**Option B - Image locale** :
1. Ajouter dans `src/assets/`
2. Importer : `import MonImage from "../assets/image.jpg"`

### 4. Ajouter/modifier une page
- **Page Thalion** : `src/pages/Thalion/Thalion.jsx`
- **Page Eric Zemmour** : `src/pages/ErichZemmour/ErichZemmour.jsx`
- **Page L'Usine** : `src/pages/Usine/Usine.jsx`
- **Page Suites** : `src/pages/Suite/Suite.jsx`

---

## 🌐 Gestion des Langues

### Changer de langue
Les drapeaux dans l'en-tête permettent de basculer entre :
- 🇫🇷 Français (par défaut)
- 🇬🇧 Anglais  
- 🇷🇺 Russe

### Ajouter une traduction
Dans les fichiers JSON, suivre la structure existante :
```json
{
  "section": {
    "element": "Texte en français",
    "autre_element": "Autre texte"
  }
}
```

---

## 🛠 Problèmes Courants

### Le site ne se charge pas
1. Ouvrir la console du navigateur (F12)
2. Vérifier s'il y a des erreurs
3. Tester en local : `npm run dev`

### Une traduction ne s'affiche pas
1. Vérifier que la clé existe dans les 3 fichiers JSON
2. Respecter la casse et l'orthographe exacte
3. Redémarrer le serveur de développement

### Une image ne s'affiche pas
1. Vérifier l'URL Cloudinary en l'ouvrant dans le navigateur
2. Pour les images locales, vérifier le chemin d'import
3. Vérifier que l'image n'a pas été supprimée

---

## 📞 Contacts & Resources

- **Site en ligne** : [URL Vercel]
- **Admin Vercel** : [Accès admin]  
- **Cloudinary** : [Compte images]
- **Code source** : [Repository Git]

---

## 📋 Checklist avant Modification

- [ ] Créer une sauvegarde (commit Git)
- [ ] Tester en local avec `npm run dev`
- [ ] Vérifier dans les 3 langues
- [ ] Tester sur mobile et desktop
- [ ] Deployer : `git push`
- [ ] Vérifier le site en ligne

---

**Ce guide couvre 90% des modifications courantes. Pour des changements plus avancés, consulter la documentation complète.**