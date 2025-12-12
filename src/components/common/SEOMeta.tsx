import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LocalizedString {
  en: string;
  ku: string;
  ar: string;
}

interface SEOMetaProps {
  title?: string | LocalizedString;
  description?: string | LocalizedString;
  keywords?: string | LocalizedString;
  ogImage?: string;
  canonical?: string;
}

const defaultMeta = {
  en: {
    title: 'Mam Center | Horse Riding & Coffee in Erbil, Kurdistan',
    description: 'Premier equestrian club in Erbil offering horse riding lessons, safari tours, and mountain cafe with stunning views. Family-friendly outdoor activities in Kurdistan.',
    keywords: 'horse riding erbil, equestrian club kurdistan, family activities erbil, outdoor cafe, safari tours',
  },
  ku: {
    title: 'سەنتەری مام | ئەسپ سواری و قاوەخانە لە هەولێر، کوردستان',
    description: 'باشترین یانەی ئەسپ سواری لە هەولێر کە وانەی ئەسپ سواری، گەشتی سەفاری و قاوەخانەی چیا پێشکەش دەکات.',
    keywords: 'ئەسپ سواری هەولێر, یانەی ئەسپ سواری کوردستان, چالاکی خێزانی هەولێر',
  },
  ar: {
    title: 'مركز مام | ركوب الخيل والمقهى في أربيل، كردستان',
    description: 'نادي الفروسية الرائد في أربيل يقدم دروس ركوب الخيل، جولات السفاري، ومقهى جبلي بإطلالات خلابة.',
    keywords: 'ركوب الخيل أربيل, نادي الفروسية كردستان, أنشطة عائلية أربيل',
  },
};

export const SEOMeta = ({ title, description, keywords, ogImage, canonical }: SEOMetaProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ku' | 'ar';

  // Helper function to extract localized string
  const getLocalizedValue = (value: string | LocalizedString | undefined, fallback: string): string => {
    if (!value) return fallback;
    if (typeof value === 'string') return value;
    return value[lang] || value.en;
  };

  const meta = {
    title: getLocalizedValue(title, defaultMeta[lang]?.title || defaultMeta.en.title),
    description: getLocalizedValue(description, defaultMeta[lang]?.description || defaultMeta.en.description),
    keywords: getLocalizedValue(keywords, defaultMeta[lang]?.keywords || defaultMeta.en.keywords),
  };

  useEffect(() => {
    // Update document title
    document.title = meta.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateOGTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', meta.description);
    updateMetaTag('keywords', meta.keywords);
    updateOGTag('og:title', meta.title);
    updateOGTag('og:description', meta.description);
    
    if (ogImage) {
      updateOGTag('og:image', ogImage);
    }

    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', canonical);
    }

    // Update html lang attribute
    document.documentElement.lang = lang;
  }, [meta.title, meta.description, meta.keywords, ogImage, canonical, lang]);

  return null; // This component doesn't render anything
};
