# Mam Center - Equestrian Club Website

A high-end Equestrian Club website built with React, TypeScript, and modern web technologies. Features multi-language support (English, Kurdish, Arabic) with RTL capability, optimized for heavy image/video content.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── index.ts
│   └── layout/           # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
│
├── features/             # Feature-specific modules
│   ├── academy/          # Sport/Academy section
│   │   ├── AcademyPage.tsx
│   │   ├── components/
│   │   └── hooks/
│   ├── safari/           # Safari experiences
│   ├── lifestyle/        # Coffee shop & tourism
│   └── gallery/          # Image/Video galleries
│
├── pages/                # Top-level page components
│   ├── HomePage.tsx
│   └── NotFoundPage.tsx
│
├── types/                # TypeScript type definitions
│   └── index.ts          # Interfaces for Horse, Instructor, etc.
│
├── i18n/                 # Internationalization
│   ├── config.ts         # i18next configuration
│   └── locales/
│       ├── en/           # English translations
│       │   ├── common.json
│       │   └── nav.json
│       ├── ar/           # Arabic translations (RTL)
│       └── ku/           # Kurdish translations (RTL)
│
├── hooks/                # Custom React hooks
│   ├── useTheme.ts
│   └── useMediaQuery.ts
│
├── utils/                # Utility functions
│   ├── formatters.ts
│   └── validators.ts
│
├── context/              # React Context providers
│   └── ThemeContext.tsx
│
├── assets/               # Static assets
│   ├── images/
│   └── videos/
│
├── App.tsx
├── main.tsx
└── index.css
```

## 📦 Technology Stack

### Core Framework
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server

### Routing
- **react-router-dom** - Lightweight, standard routing solution
  - Client-side routing for SPA experience
  - Simple API, perfect for small-to-medium projects
  - No server-side rendering complexity

### Internationalization (i18n)
- **i18next** + **react-i18next** - Industry-standard i18n framework
  - **i18next-browser-languagedetector** - Auto-detect user language
  - Built-in RTL direction support via `i18n.dir()`
  - JSON-based translation files (easy to manage)
  - Namespace support for organizing translations by feature
  - Automatic re-rendering on language change

### Styling
- **Tailwind CSS** - Utility-first CSS framework
  - **Dark Mode**: Built-in class-based dark mode (`dark:` prefix)
  - **RTL Support**: Custom utilities for direction handling
  - Responsive design utilities
  - Highly customizable via `tailwind.config.js`
  - Small bundle size (only used classes are included)
  - No runtime overhead compared to CSS-in-JS

### State Management
- **React Context** (built-in) - For theme and language state
  - Simple and sufficient for this scale
  - No need for Redux or MobX complexity
  - Easy to understand and maintain

## 🎯 Design Decisions

### Flat Structure
- Features are self-contained modules (e.g., `features/academy/`)
- Each feature can have its own components, hooks, and logic
- No micro-frontend complexity - keeps team cognitive load low

### Type Safety
- All domain entities (Horse, Instructor) defined in `types/`
- Shared across features for consistency
- TypeScript ensures data integrity

### i18n Strategy
- **3 namespaces per language**: `common`, `nav`, `feature-specific`
- RTL auto-applied when language changes to Arabic/Kurdish
- Translation keys organized by feature context

### Media Optimization (Recommended Next Steps)
- Use `<img loading="lazy">` for images below fold
- Consider **React Lazy Load Image Component** for galleries
- Use **cloudinary** or **imgix** for image CDN/optimization
- Video: lazy load with `<video preload="metadata">`

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 🌐 RTL Language Support

The app automatically detects and applies RTL for Arabic and Kurdish:

```typescript
// Automatic direction change
i18n.changeLanguage('ar'); // Sets document.dir to 'rtl'
i18n.changeLanguage('en'); // Sets document.dir to 'ltr'
```

Tailwind classes adjust automatically:
```tsx
<div className="ms-4"> {/* margin-start: works for both LTR/RTL */}
```

## 🎨 Dark Mode

Toggle dark mode using the `useTheme` hook:

```typescript
const { theme, toggleTheme } = useTheme();
```

Tailwind classes:
```tsx
<div className="bg-white dark:bg-gray-900">
```

## 📁 Where to Put Files

| Type | Location | Example |
|------|----------|---------|
| Global UI components | `components/common/` | Button, Input, Card |
| Layout components | `components/layout/` | Header, Footer, Sidebar |
| Feature pages | `features/{feature}/` | `features/academy/AcademyPage.tsx` |
| Shared types | `types/` | `Horse`, `Instructor` interfaces |
| Translations | `i18n/locales/{lang}/` | `en/common.json` |
| Custom hooks | `hooks/` | `useMediaQuery`, `useDebounce` |
| Utilities | `utils/` | `formatDate`, `validateEmail` |

## 🧩 Recommended Additions

### Performance
- **React Lazy + Suspense** - Code splitting for routes
- **React Query** - Server state management for API calls
- **Image optimization library** - `react-lazy-load-image-component`

### UI Enhancements
- **Framer Motion** - Animations (lightweight, 30KB)
- **Headless UI** - Accessible components (modals, dropdowns)

### Forms
- **React Hook Form** - Performant form handling
- **Zod** - Runtime validation matching TypeScript types

## 📝 License

Private project for Mam Equestrian Club.
