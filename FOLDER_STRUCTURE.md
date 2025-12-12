# Mam Center - Visual Folder Structure

```
mam-center/
│
├── public/                       # Static assets (favicon, etc.)
│
├── src/
│   │
│   ├── assets/                   # Media files
│   │   ├── images/
│   │   └── videos/
│   │
│   ├── components/               # ⭐ SHARED UI COMPONENTS
│   │   ├── common/               # Global reusable components
│   │   │   ├── Button.tsx        # Primary/Secondary/Outline variants
│   │   │   ├── Input.tsx         # Form inputs with validation
│   │   │   ├── Card.tsx          # Content cards
│   │   │   └── index.ts          # Export barrel
│   │   │
│   │   └── layout/               # Page structure
│   │       ├── Header.tsx        # Nav + Language switcher
│   │       ├── Footer.tsx        # Site footer
│   │       └── Sidebar.tsx       # Optional sidebar
│   │
│   ├── features/                 # ⭐ FEATURE MODULES (MAIN LOGIC)
│   │   │
│   │   ├── academy/              # Sport & Training
│   │   │   ├── AcademyPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── ProgramCard.tsx
│   │   │   │   ├── InstructorList.tsx
│   │   │   │   └── ScheduleTable.tsx
│   │   │   └── hooks/
│   │   │       └── usePrograms.ts
│   │   │
│   │   ├── safari/               # Safari Experiences
│   │   │   ├── SafariPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── PackageCard.tsx
│   │   │   │   └── BookingForm.tsx
│   │   │   └── hooks/
│   │   │       └── useBooking.ts
│   │   │
│   │   ├── lifestyle/            # Coffee & Tourism
│   │   │   ├── LifestylePage.tsx
│   │   │   └── components/
│   │   │       ├── MenuSection.tsx
│   │   │       └── TourismCard.tsx
│   │   │
│   │   └── gallery/              # Media Gallery
│   │       ├── GalleryPage.tsx
│   │       ├── components/
│   │       │   ├── ImageGrid.tsx
│   │       │   ├── VideoPlayer.tsx
│   │       │   └── CategoryFilter.tsx
│   │       └── hooks/
│   │           └── useGalleryItems.ts
│   │
│   ├── pages/                    # ⭐ TOP-LEVEL PAGES
│   │   ├── HomePage.tsx          # Landing page
│   │   ├── AboutPage.tsx         # About the club
│   │   ├── ContactPage.tsx       # Contact form
│   │   └── NotFoundPage.tsx      # 404 error
│   │
│   ├── types/                    # ⭐ TYPE DEFINITIONS
│   │   └── index.ts              # All interfaces
│   │       # - Horse
│   │       # - Instructor
│   │       # - AcademyProgram
│   │       # - SafariPackage
│   │       # - GalleryItem
│   │       # - Language ('en' | 'ar' | 'ku')
│   │       # - ThemeMode ('light' | 'dark')
│   │
│   ├── i18n/                     # ⭐ INTERNATIONALIZATION
│   │   ├── config.ts             # i18next setup + RTL logic
│   │   └── locales/
│   │       ├── en/               # English
│   │       │   ├── common.json   # Shared text (buttons, errors)
│   │       │   ├── nav.json      # Navigation labels
│   │       │   ├── academy.json  # Academy-specific
│   │       │   └── safari.json
│   │       │
│   │       ├── ar/               # Arabic (RTL)
│   │       │   ├── common.json
│   │       │   ├── nav.json
│   │       │   ├── academy.json
│   │       │   └── safari.json
│   │       │
│   │       └── ku/               # Kurdish (RTL)
│   │           ├── common.json
│   │           ├── nav.json
│   │           ├── academy.json
│   │           └── safari.json
│   │
│   ├── hooks/                    # ⭐ CUSTOM REACT HOOKS
│   │   ├── useTheme.ts           # Dark mode toggle + persistence
│   │   ├── useMediaQuery.ts      # Responsive breakpoint detection
│   │   └── useDebounce.ts        # Input debouncing
│   │
│   ├── utils/                    # ⭐ UTILITY FUNCTIONS
│   │   ├── formatters.ts         # formatDate, formatCurrency
│   │   ├── validators.ts         # Email/phone validation
│   │   └── constants.ts          # App-wide constants
│   │
│   ├── context/                  # React Context Providers
│   │   ├── ThemeContext.tsx      # Theme state (if not using hook only)
│   │   └── AuthContext.tsx       # User authentication (future)
│   │
│   ├── App.tsx                   # Main app component + routing
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Tailwind imports + global styles
│
├── .gitignore
├── eslint.config.js              # Linting rules
├── index.html                    # HTML entry point
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS + Tailwind
├── tailwind.config.js            # Tailwind customization
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite config
│
├── PROJECT_ARCHITECTURE.md       # 📖 Detailed architecture doc
└── SETUP_SUMMARY.md              # 📋 Quick reference guide
```

---

## 🎯 Key Decision Points

### **1. Where do I put a new component?**

| Component Type | Location | Reason |
|----------------|----------|--------|
| Reusable button/input | `components/common/` | Used across multiple features |
| Header/Footer | `components/layout/` | Page structure |
| Academy program card | `features/academy/components/` | Specific to academy feature |
| Gallery image grid | `features/gallery/components/` | Specific to gallery feature |

### **2. Where do I put types/interfaces?**

```typescript
// ✅ CORRECT - Central location
// src/types/index.ts
export interface Horse {
  id: string;
  name: string;
  breed: string;
}

// ❌ AVOID - Scattered types
// src/features/academy/types.ts (don't do this)
```

**Why?** Types are often shared across features (e.g., `Horse` used in academy AND safari).

### **3. Where do I put translations?**

```
i18n/locales/en/
├── common.json      ← Buttons, errors, shared text
├── nav.json         ← Navigation labels
├── academy.json     ← Academy-specific text
└── safari.json      ← Safari-specific text
```

**Load translations by namespace:**
```typescript
const { t } = useTranslation('academy'); // Loads academy.json
t('programs.title'); // → "Training Programs"
```

### **4. Flat vs Nested?**

**✅ WE CHOSE FLAT** - Each feature is independent:
```
features/academy/
features/safari/
features/lifestyle/
```

**❌ NOT NESTED** - Avoid deep hierarchies:
```
features/
  sport/
    academy/
      components/
        cards/
          ProgramCard.tsx  ← Too deep!
```

**Why?** Easier to navigate, move, and delete.

---

## 📊 File Count by Category

| Category | Files | Purpose |
|----------|-------|---------|
| **Components** | 10-15 | UI building blocks |
| **Features** | 4 modules | Main business logic |
| **Types** | 1 file | All domain types |
| **i18n** | 12 files | 3 langs × 4 namespaces |
| **Hooks** | 3-5 | Reusable logic |
| **Utils** | 2-3 | Pure functions |

**Total:** ~40-50 files (manageable for small team)

---

## 🔄 Workflow Examples

### **Adding a new Academy feature:**

1. Create component:
   ```
   src/features/academy/components/HorseSelector.tsx
   ```

2. Add types:
   ```typescript
   // src/types/index.ts
   export interface Horse { ... }
   ```

3. Add translations:
   ```json
   // src/i18n/locales/en/academy.json
   {
     "horses": {
       "select": "Choose your horse",
       "available": "Available horses"
     }
   }
   ```

4. Use in component:
   ```typescript
   import { useTranslation } from 'react-i18next';
   const { t } = useTranslation('academy');
   <h2>{t('horses.select')}</h2>
   ```

---

This structure scales well up to **~100 components** before needing reorganization.
