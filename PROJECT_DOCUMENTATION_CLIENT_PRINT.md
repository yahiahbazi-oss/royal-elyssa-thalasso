# Royal Elyssa Thalasso & Spa — Project Documentation

## Project Overview
Royal Elyssa Thalasso & Spa is a luxury spa and wellness web application designed to showcase the spa's services, facilities, and unique offerings. The site is multilingual (French, English, Russian), mobile-friendly, and features a modern, elegant design with a focus on user experience and accessibility.

---

## Table of Contents
1. Project Structure
2. Key Features
3. Technology Stack
4. Folder & File Overview
5. Internationalization (i18n)
6. Responsive Design
7. Custom Components
8. How to Build & Run
9. Deployment
10. Maintenance & Extensibility

---

## 1. Project Structure

```
royalelyssav1/
├── public/                # Static assets (images, pdfs, favicon, etc.)
├── src/                   # Main source code
│   ├── assets/            # Images and static resources
│   ├── components/        # Reusable React components
│   ├── contexts/          # React context providers (e.g., Language)
│   ├── hooks/             # Custom React hooks
│   ├── locales/           # Translation files (fr, en, ru)
│   ├── pages/             # Main pages (Home, Thalion, Spa, etc.)
│   ├── sections/          # Page sections (Hero, Gallery, etc.)
│   └── App.jsx            # Main app entry
├── package.json           # Project metadata and dependencies
├── vite.config.js         # Vite build configuration
├── README.md              # Project readme
└── ...
```

---

## 2. Key Features
- Multilingual: French, English, Russian
- Responsive: Mobile-first, adapts to all devices
- Elegant, luxury-inspired UI
- Interactive brochure and pricing
- Image galleries and spa section highlights
- Contact and booking information

---

## 3. Technology Stack
- **React** (with JSX)
- **Vite** (build tool)
- **Tailwind CSS** (utility-first styling)
- **i18next** (internationalization)
- **Cloudinary** (image hosting)

---

## 4. Folder & File Overview
- `src/components/`: Navbar, Footer, Cards, Popups, etc.
- `src/pages/`: Main pages (e.g., `Home.jsx`, `Thalion.jsx`, `Spa.jsx`)
- `src/sections/`: Reusable page sections (Hero, Gallery, Pricing, etc.)
- `src/locales/`: Translation JSON files for each language
- `public/`: Static files, PDFs, and images

---

## 5. Internationalization (i18n)
- Uses `i18next` for translations
- Language files in `src/locales/fr/`, `en/`, `ru/`
- Language switcher in navbar
- All UI text is translatable

---

## 6. Responsive Design
- Tailwind CSS utility classes for breakpoints
- Mobile-first layouts
- Images and text scale for all devices
- Navigation and popups adapt to screen size

---

## 7. Custom Components
- `Header.jsx`: Responsive navbar with language flags
- `Footer.jsx`: Contact and social links
- `SoinsALaCarteNew.jsx`: Dynamic spa treatment cards
- `ThemeSection.jsx`: Thematic package carousel
- `LieuSoins.jsx`: Spa facilities, mobile-friendly
- `WelcomePopup.jsx`: Animated welcome overlay

---

## 8. How to Build & Run
1. Install dependencies:
   ```
   npm install
   ```
2. Start development server:
   ```
   npm run dev
   ```
3. Build for production:
   ```
   npm run build
   ```

---

## 9. Deployment
- Vercel or any static hosting (see `vercel.json`)
- Output is static files from `dist/`

---

## 10. Maintenance & Extensibility
- Add new languages by creating a new folder in `src/locales/`
- Add new pages in `src/pages/`
- Add new sections/components as needed
- All styles are in Tailwind CSS for easy updates

---


## Contact
For further information or technical support, contact:

**Yahia Hbazi**  
Email: yahia.hbazi@polytechnicien.tn

Or refer to the README.md for technical details.

---

*This documentation is designed for print and client handover. For technical details, see the in-code comments and README.md.*
