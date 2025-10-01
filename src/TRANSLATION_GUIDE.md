# 🚀 SUPER FAST TRANSLATION SYSTEM

## ✅ Already Done for You:

1. **LanguageProvider** - Global language context
2. **Centralized translations** - All text in one file
3. **Simple hooks** - Easy to use in any component
4. **App wrapper** - Everything connected

## 🔥 How to Use (SUPER EASY):

### Method 1: useT() Hook (Recommended)

```jsx
import { useT } from "../hooks/useTranslation";

const MyComponent = () => {
  const t = useT(); // Get all translations

  return (
    <div>
      <h1>{t.heroTitle}</h1>
      <p>{t.heroDescription}</p>
      <button>{t.bookNow}</button>
    </div>
  );
};
```

### Method 2: T Component (For Simple Text)

```jsx
import { T } from "../hooks/useTranslation";

const MyComponent = () => {
  return (
    <div>
      <T k="heroTitle" className="text-2xl font-bold" />
      <T k="heroDescription" />
      <T k="bookNow" />
    </div>
  );
};
```

### Method 3: Language Control

```jsx
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
      <option value="fr">🇫🇷 Français</option>
      <option value="en">🇬🇧 English</option>
    </select>
  );
};
```

## 📝 To Translate ANY Component:

### BEFORE (Old way):

```jsx
const MyComponent = () => {
  return (
    <div>
      <h1>Bienvenue</h1>
      <p>Découvrez nos services</p>
      <button>Réserver maintenant</button>
    </div>
  );
};
```

### AFTER (New way - 2 steps):

```jsx
import { useT } from "../hooks/useTranslation";

const MyComponent = () => {
  const t = useT(); // Step 1: Add this line

  return (
    <div>
      <h1>{t.welcome}</h1> {/* Step 2: Replace text with t.key */}
      <p>{t.discoverServices}</p>
      <button>{t.bookNow}</button>
    </div>
  );
};
```

### Add Your Text to translations.js:

```javascript
// In src/locales/translations.js
export const translations = {
  fr: {
    welcome: "Bienvenue",
    discoverServices: "Découvrez nos services",
    bookNow: "Réserver maintenant",
    // ... add more
  },
  en: {
    welcome: "Welcome",
    discoverServices: "Discover our services",
    bookNow: "Book now",
    // ... add more
  },
};
```

## 🎯 What You Need to Do:

### For Each Component/Page:

1. **Import the hook**: `import { useT } from '../hooks/useTranslation';`
2. **Use the hook**: `const t = useT();`
3. **Replace text**: `"Hello" → {t.hello}`
4. **Add translation**: Add keys to `src/locales/translations.js`

### That's it! 🎉

## 💡 Pro Tips:

### Batch Translation:

```jsx
// Instead of this:
<div>
  <h1>{t.title1}</h1>
  <h2>{t.title2}</h2>
  <p>{t.text1}</p>
  <p>{t.text2}</p>
</div>;

// You can use object destructuring:
const { title1, title2, text1, text2 } = t;

return (
  <div>
    <h1>{title1}</h1>
    <h2>{title2}</h2>
    <p>{text1}</p>
    <p>{text2}</p>
  </div>
);
```

### Conditional Translation:

```jsx
const t = useT();
const { language } = useLanguage();

// Different content based on language
return (
  <div>
    {language === "fr" ? (
      <p>Contenu spécifique en français</p>
    ) : (
      <p>English specific content</p>
    )}
    <p>{t.commonText}</p>
  </div>
);
```

## 🚀 Next Steps:

1. **Start with one component** (like Hero.jsx)
2. **Add translations to translations.js**
3. **Test language switching**
4. **Repeat for other components**

## 📁 File Structure:

```
src/
├── contexts/LanguageContext.jsx     ✅ Done
├── locales/translations.js          ✅ Done (add your text here)
├── hooks/useTranslation.js          ✅ Done
├── App.jsx                          ✅ Updated
└── components/
    ├── YourComponent.jsx            ← Update these
    └── SimpleHeader.jsx             ✅ Example provided
```

This system is **1000x faster** than the old individual approach!
Just use `const t = useT()` and replace text with `{t.yourKey}` 🔥
