import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useAppStore } from '../store';

// English translations
import enCommon from './locales/en/common.json';
import enNav from './locales/en/nav.json';
import enHome from './locales/en/home.json';
import enSafari from './locales/en/safari.json';
import enLifestyle from './locales/en/lifestyle.json';
import enAcademy from './locales/en/academy.json';
import enGallery from './locales/en/gallery.json';
import enCoffee from './locales/en/coffee.json';
import enContact from './locales/en/contact.json';
import enComponents from './locales/en/components.json';
import enBooking from './locales/en/booking.json';

// Arabic translations
import arCommon from './locales/ar/common.json';
import arNav from './locales/ar/nav.json';
import arHome from './locales/ar/home.json';
import arSafari from './locales/ar/safari.json';
import arLifestyle from './locales/ar/lifestyle.json';
import arAcademy from './locales/ar/academy.json';
import arGallery from './locales/ar/gallery.json';
import arCoffee from './locales/ar/coffee.json';
import arContact from './locales/ar/contact.json';
import arComponents from './locales/ar/components.json';
import arBooking from './locales/ar/booking.json';

// Kurdish translations
import kuCommon from './locales/ku/common.json';
import kuNav from './locales/ku/nav.json';
import kuHome from './locales/ku/home.json';
import kuSafari from './locales/ku/safari.json';
import kuLifestyle from './locales/ku/lifestyle.json';
import kuAcademy from './locales/ku/academy.json';
import kuGallery from './locales/ku/gallery.json';
import kuCoffee from './locales/ku/coffee.json';
import kuContact from './locales/ku/contact.json';
import kuComponents from './locales/ku/components.json';
import kuBooking from './locales/ku/booking.json';

const resources = {
  en: {
    common: enCommon,
    nav: enNav,
    home: enHome,
    safari: enSafari,
    lifestyle: enLifestyle,
    academy: enAcademy,
    gallery: enGallery,
    coffee: enCoffee,
    contact: enContact,
    components: enComponents,
    booking: enBooking,
  },
  ar: {
    common: arCommon,
    nav: arNav,
    home: arHome,
    safari: arSafari,
    lifestyle: arLifestyle,
    academy: arAcademy,
    gallery: arGallery,
    coffee: arCoffee,
    contact: arContact,
    components: arComponents,
    booking: arBooking,
  },
  ku: {
    common: kuCommon,
    nav: kuNav,
    home: kuHome,
    safari: kuSafari,
    lifestyle: kuLifestyle,
    academy: kuAcademy,
    gallery: kuGallery,
    coffee: kuCoffee,
    contact: kuContact,
    components: kuComponents,
    booking: kuBooking,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ku',
    lng: 'ku', // Set Kurdish as default language
    defaultNS: 'common',
    ns: ['common', 'nav'],
    debug: true, // Enable debug mode to see what's happening
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false, // Disable suspense to avoid initialization issues
    },
  });

// Configure RTL languages explicitly (Kurdish and Arabic are both RTL)
const rtlLanguages = ['ar', 'ku'];

// Override i18next's dir() method to recognize Kurdish as RTL
i18n.dir = (lng?: string) => {
  const language = lng || i18n.language;
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};

// Set initial direction based on language
i18n.on('languageChanged', (lng: string) => {
  const dir = rtlLanguages.includes(lng) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

// Set initial direction on load
const initialLang = i18n.language || 'ku';
const initialDir = rtlLanguages.includes(initialLang) ? 'rtl' : 'ltr';
document.documentElement.dir = initialDir;
document.documentElement.lang = initialLang;

/**
 * Integrate Zustand store with i18next
 * This ensures the global store and i18next are always in sync
 * Only runs in browser environment
 */
if (typeof window !== 'undefined') {
  // Initialize i18next with the language from Zustand store (if exists)
  const storedLanguage = useAppStore.getState().language;
  if (storedLanguage && storedLanguage !== i18n.language) {
    i18n.changeLanguage(storedLanguage);
  }

  // Subscribe to Zustand store changes and sync with i18next
  useAppStore.subscribe((state) => {
    const language = state.language;
    // Only update if language is different
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  });
}

export default i18n;
