# ROYAL ELYSSA - ARCHITECTURE & HOSTING DETAILS

## 🏗 Technical Architecture Overview

### Frontend Stack
```
React 19.1.0 (Single Page Application)
├── Build Tool: Vite 7.0.4
├── CSS Framework: Tailwind CSS 4.1.11  
├── State Management: React Context + Hooks
├── Routing: React Router DOM 7.8.0
├── Animations: Framer Motion 12.23.12
├── Internationalization: React-i18next 15.6.1
├── Icons: Lucide React 0.533.0
└── Maps: React Leaflet 5.0.0
```

### Build & Deployment Pipeline
```
Code Changes (Git)
      ↓
GitHub Repository
      ↓
Vercel (Auto-deploy)
      ↓
Production Site
```

---

## 🌐 Hosting & Domain Configuration

### Primary Hosting: Vercel
- **Platform**: Vercel (Serverless hosting)
- **Auto-deployment**: Connected to Git repository
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Node.js Version**: 18.x (recommended)

### Vercel Configuration (`vercel.json`)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This enables SPA routing - all routes redirect to index.html.

### Alternative Hosting Options

#### 1. Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: dist
```

#### 2. Traditional Web Hosting (cPanel/Apache)
```bash
# Build locally then upload
npm run build
# Upload contents of 'dist/' folder to public_html/
```

#### 3. Amazon S3 + CloudFront
```bash
# Static hosting with CDN
aws s3 sync dist/ s3://your-bucket-name
```

---

## 📁 File Structure & Components

### Core Application Files
```
src/
├── main.jsx                    # App entry point
├── App.jsx                     # Main app component
├── i18n.js                     # Translation configuration
├── index.css                   # Global styles
└── App.css                     # Component styles
```

### Page Components
```
src/pages/
├── Home.jsx                    # Landing page with carousel
├── ContactPage.jsx             # Contact information & map
├── ErichZemmour/
│   └── ErichZemmour.jsx        # Hair salon page with pricing
├── Thalion/
│   └── Thalion.jsx            # Marine cosmetics page
├── Usine/
│   ├── Usine.jsx              # Sports club main page
│   └── UsinePages/
│       └── AccueilUsine.jsx   # Sports club carousel
├── Suite/
│   └── Suite.jsx              # VIP spa suites page
└── Spa/
    └── Spa.jsx                # Spa services page
```

### Reusable Components
```
src/components/
├── Header.jsx                  # Navigation with dropdown
├── OptimizedImage.jsx          # Image optimization
├── PreloadAssets.jsx           # Performance optimization
├── BoxDesign.jsx               # Layout component
├── CarteSection.jsx            # Service cards
├── SoinsALaCarte.jsx          # Services menu
├── WelcomePopup.jsx           # Welcome modal
└── Footer/
    ├── Footer.jsx             # Main footer
    ├── FooterBrands.jsx       # Brand links
    ├── FooterContact.jsx      # Contact info
    └── FooterSocial.jsx       # Social media links
```

---

## 🔧 Configuration Files

### Package Dependencies (`package.json`)
```json
{
  "name": "royalelyssav1",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build --mode production", 
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

### Vite Build Configuration (`vite.config.js`)
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Internationalization (`src/i18n.js`)
```javascript
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Configuration for French, English, Russian
```

---

## 🖼 Media & Asset Management

### Image Hosting Strategy

#### Cloudinary (Current)
- **CDN**: Global content delivery
- **Auto-optimization**: WebP conversion, compression
- **Responsive**: Multiple sizes generated automatically
- **Bandwidth**: Unlimited with plan
- **Base URL**: `https://res.cloudinary.com/dxoje33mm/`

**URL Structure**:
```
https://res.cloudinary.com/dxoje33mm/image/upload/
  ├── v[timestamp]/              # Version control
  ├── [transformations]/         # Optional: w_800,h_600,c_fill
  └── [filename].[extension]     # Image file
```

#### Local Assets (`src/assets/`)
- **Purpose**: Static images, logos, icons
- **Advantages**: Always available, no external dependencies
- **Disadvantages**: Increases bundle size
- **Best for**: Small files (<100KB)

### Font Loading
- **Google Fonts**: Loaded via CSS imports
- **Luxury Fonts**: Marcellus SC, Cormorant Upright
- **Performance**: Preloaded for faster rendering

---

## 🚀 Performance Optimizations

### Build Optimizations
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Unused code removal
- **Minification**: CSS and JS compressed
- **Asset Optimization**: Images optimized during build

### Runtime Optimizations
- **Lazy Loading**: Images loaded on demand
- **Image Preloading**: Critical images preloaded
- **Component Lazy Loading**: Route-based code splitting
- **Intersection Observer**: Animations triggered on scroll

### Caching Strategy
- **Static Assets**: Long-term browser caching
- **HTML**: Short-term caching for updates
- **CDN Caching**: Cloudinary handles image caching

---

## 🔄 Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

### Git Workflow
```bash
# Make changes
git add .
git commit -m "Description of changes"
git push origin main

# Automatic deployment to Vercel triggers
```

### Environment Variables
Create `.env.local` for sensitive data:
```env
# Example (if needed)
VITE_CLOUDINARY_CLOUD_NAME=dxoje33mm
VITE_API_BASE_URL=https://api.example.com
```

---

## 🔍 Monitoring & Analytics

### Vercel Dashboard
- **Deployments**: History and rollback capability
- **Performance**: Core Web Vitals monitoring  
- **Logs**: Server-side error tracking
- **Analytics**: Page views and user behavior

### Browser Tools
- **Lighthouse**: Performance audits
- **DevTools**: Network and performance monitoring
- **Console**: Client-side error tracking

---

## 📱 Responsive Design

### Breakpoints (Tailwind CSS)
```css
/* Mobile First Approach */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */  
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X Extra large devices */
```

### Mobile Optimizations
- **Touch-friendly**: Button sizes optimized for touch
- **Swipe Gestures**: Carousel navigation
- **Responsive Images**: Different sizes per breakpoint
- **Mobile Menu**: Collapsible navigation

---

## 🔐 Security & Best Practices

### Security Measures
- **HTTPS**: Enforced by Vercel
- **Content Security Policy**: Basic implementation
- **No Sensitive Data**: All content is public
- **Input Validation**: Contact forms (if implemented)

### SEO Optimizations
- **Meta Tags**: Dynamic title and description
- **Open Graph**: Social media previews
- **Structured Data**: Business information markup
- **Sitemap**: Auto-generated by build process

---

## 🆘 Troubleshooting Guide

### Common Build Issues
```bash
# Dependency conflicts
rm -rf node_modules package-lock.json
npm install

# Memory issues during build
export NODE_OPTIONS="--max_old_space_size=4096"
npm run build

# Vercel deployment fails
# Check Vercel dashboard logs
# Verify Node.js version compatibility
```

### Performance Issues
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for large dependencies  
npx webpack-bundle-analyzer dist
```

---

## 📚 Additional Resources

### Documentation Links
- **Vite**: https://vitejs.dev/guide/
- **React**: https://react.dev/learn
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Vercel**: https://vercel.com/docs

### Support Contacts
- **Vercel Support**: https://vercel.com/support
- **Cloudinary Support**: https://support.cloudinary.com/
- **Technical Issues**: [Developer contact]

---

**This document provides the complete technical foundation for understanding, maintaining, and scaling the Royal Elyssa website.**