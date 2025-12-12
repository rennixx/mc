# 📚 Mam Center - Equestrian Club Website

A high-end Equestrian Club website built with React, TypeScript, and modern web technologies. Features multi-language support (English, Arabic, Kurdish) with RTL capability, optimized for heavy image/video content.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| **[QUICK_START.md](./QUICK_START.md)** | Getting started guide |
| **[FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)** | Visual folder tree |
| **[SETUP_SUMMARY.md](./SETUP_SUMMARY.md)** | What's included |
| **[PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md)** | Architecture details |
| **[TECH_STACK_RATIONALE.md](./TECH_STACK_RATIONALE.md)** | Technology decisions |

---

## 🛠️ Technology Stack

- ⚛️ **React 19** + **TypeScript** - Modern UI framework
- ⚡ **Vite** - Lightning-fast dev server
- 🎨 **Tailwind CSS** - Utility-first styling with dark mode + RTL
- 🌐 **i18next** - Multi-language (EN/AR/KU) with auto RTL
- 🧭 **React Router** - Client-side routing

---

## 📁 Project Structure

```
src/
├── components/         # Shared UI components
│   ├── common/         # Buttons, Inputs, Cards
│   └── layout/         # Header, Footer
├── features/           # Feature modules
│   ├── academy/        # Sport & Training
│   ├── safari/         # Safari experiences
│   ├── lifestyle/      # Coffee & Tourism
│   └── gallery/        # Media galleries
├── pages/              # Top-level pages
├── types/              # TypeScript interfaces
├── i18n/               # Translations (EN/AR/KU)
├── hooks/              # Custom React hooks
└── utils/              # Utility functions
```

**[See detailed structure →](./FOLDER_STRUCTURE.md)**

---

## 🌐 Multi-Language Support

- **English** (LTR)
- **Arabic** (RTL)
- **Kurdish** (RTL)

Automatic direction switching based on selected language.

---

## 🎯 Key Features

✅ Multi-language support with RTL  
✅ Dark mode toggle  
✅ Feature-based architecture  
✅ Type-safe TypeScript  
✅ Responsive design  
✅ Optimized for images/videos  

---

## 📋 Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code style
npm run type-check   # Verify TypeScript types
```

---

## 📞 Need Help?

Check the documentation files above or review sample code in `src/components/` and `src/features/`.

---

**Built for Mam Equestrian Club** 🏇
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
