# 🚀 Mam Center - Quick Start Guide

## Project Initialized ✅

**Location:** `C:\Projects\mc\mam-center`

---

## 📦 What's Included

### **Core Tech Stack**
- ⚛️ **React 19** + **TypeScript** - Modern UI framework
- ⚡ **Vite** - Lightning-fast dev server
- 🎨 **Tailwind CSS** - Utility-first styling with dark mode + RTL
- 🌐 **i18next** - Multi-language (EN/AR/KU) with auto RTL
- 🧭 **React Router** - Client-side routing

### **Key Features**
- ✅ 3 languages with RTL support (English, Arabic, Kurdish)
- ✅ Dark mode toggle
- ✅ Feature-based architecture (academy, safari, lifestyle, gallery)
- ✅ Type-safe TypeScript setup
- ✅ Sample components and pages

---

## 🏃 Getting Started

### **1. Install Dependencies** (if not already done)
```bash
cd C:\Projects\mc\mam-center
npm install
```

### **2. Start Development Server**
```bash
npm run dev
```

**Open:** http://localhost:5173

### **3. Test Language Switching**
Click the language buttons (EN/AR/KU) in the header to see:
- Text changes
- Automatic RTL/LTR direction switch

### **4. Test Dark Mode**
Use the `useTheme` hook (already set up in `src/hooks/useTheme.ts`)

---

## 📁 Where Things Are

### **Adding New Pages:**
```bash
src/pages/ContactPage.tsx       # Create here
src/App.tsx                     # Add route here
```

### **Adding Shared Components:**
```bash
src/components/common/Card.tsx        # New component
src/components/common/index.ts        # Export it
```

### **Adding Feature Components:**
```bash
src/features/academy/components/ProgramCard.tsx
```

### **Adding Translations:**
```bash
src/i18n/locales/en/academy.json      # English
src/i18n/locales/ar/academy.json      # Arabic
src/i18n/locales/ku/academy.json      # Kurdish
```

### **Adding Types:**
```bash
src/types/index.ts              # All domain types here
```

---

## 🔧 Common Tasks

### **Change Primary Color**
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#your-color',  // Main brand color
      }
    }
  }
}
```

### **Add a New Route**
```typescript
// src/App.tsx
<Route path="/contact" element={<ContactPage />} />
```

### **Add a Translation**
```json
// src/i18n/locales/en/common.json
{
  "contact": "Contact Us"
}
```

```typescript
// In your component
const { t } = useTranslation();
<h1>{t('common.contact')}</h1>
```

### **Create a New Feature**
```bash
src/features/events/              # New feature folder
├── EventsPage.tsx
├── components/
│   └── EventCard.tsx
└── hooks/
    └── useEvents.ts
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `FOLDER_STRUCTURE.md` | Visual tree of all folders |
| `PROJECT_ARCHITECTURE.md` | Detailed tech decisions |
| `SETUP_SUMMARY.md` | This quick reference |

---

## 🎯 Next Steps (Recommended Priority)

### **Phase 1: Core Content**
1. Replace dummy content in `HomePage.tsx`
2. Add real images to `src/assets/images/`
3. Update translations in `i18n/locales/`

### **Phase 2: Feature Development**
4. Build out Academy page:
   - Programs list
   - Instructor profiles
   - Schedule table
5. Build Safari page:
   - Package cards
   - Booking form
6. Build Gallery:
   - Image grid with lightbox
   - Category filters

### **Phase 3: Enhancements**
7. Add animations (Framer Motion)
8. Add image optimization
9. Add contact form (React Hook Form)
10. Connect to backend API (React Query)

---

## 🛠️ Available Scripts

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code style
npm run type-check   # Verify TypeScript types
```

---

## 💡 Pro Tips

### **RTL/LTR Styling**
Use Tailwind's logical properties:
```tsx
<div className="ms-4">      {/* margin-start (auto-adjusts) */}
<div className="me-4">      {/* margin-end */}
<div className="ps-4">      {/* padding-start */}
```

### **Dark Mode Classes**
```tsx
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-900 dark:text-gray-100">
```

### **Translation Namespaces**
```typescript
const { t } = useTranslation('academy');  // Load academy.json
t('programs.title');
```

### **Type Safety**
Always import types:
```typescript
import { Horse, Instructor } from '../types';
```

---

## 🆘 Troubleshooting

### **Issue: Dev server won't start**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Issue: Tailwind classes not working**
- Check `index.css` has `@tailwind` directives
- Verify `tailwind.config.js` content paths
- Restart dev server

### **Issue: Translations not showing**
- Check language code matches folder name (`en`, `ar`, `ku`)
- Verify JSON syntax in translation files
- Check namespace in `useTranslation('namespace')`

### **Issue: TypeScript errors**
```bash
npm run type-check   # See all type errors
```

---

## 🎨 Design System (Suggested)

### **Colors**
- **Primary:** Amber/Gold (equestrian luxury)
- **Accent:** Dark brown (earth tones)
- **Neutral:** Gray scale

### **Typography**
- **Headings:** Bold, large (equestrian elegance)
- **Body:** Readable, clean

### **Components to Build**
1. `HeroSection` - Homepage hero with background image
2. `ProgramCard` - Academy programs
3. `HorseCard` - Individual horse profiles
4. `InstructorProfile` - Instructor bios
5. `GalleryGrid` - Masonry layout for images
6. `VideoPlayer` - Embedded video player
7. `BookingForm` - Safari/lesson booking

---

## 📞 Need Help?

1. Check `PROJECT_ARCHITECTURE.md` for detailed explanations
2. Check `FOLDER_STRUCTURE.md` for visual tree
3. Review sample components in `src/components/` and `src/features/`

---

**You're all set! Start by running `npm run dev` and customize from there.** 🏇
