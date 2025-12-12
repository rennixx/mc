import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import logo from '../../assets/icons/logo.png';

export const Header = () => {
  const { t, i18n } = useTranslation(['common', 'nav']);
  const isRTL = i18n.dir() === 'rtl';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = i18n.dir(lng);
  };

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <nav className="glass-nav shadow-luxury px-3 md:px-5 py-2 flex justify-between items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 group">
          <img 
            src={logo} 
            alt={t('brandName', { ns: 'common' })} 
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105 brightness-0 invert"
          />
        </Link>
        
        {/* Desktop Navigation - Hidden on Mobile */}
        <div className={`hidden md:flex gap-3 lg:gap-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link to="/academy" className="font-sans font-medium text-sm text-cream-100 hover:text-gold-400 transition-colors relative group">
            {t('academy', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/safari" className="font-sans font-medium text-sm text-cream-100 hover:text-gold-400 transition-colors relative group">
            {t('safari', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/contact" className="font-sans font-medium text-sm text-cream-100 hover:text-gold-400 transition-colors relative group">
            {t('contact', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/coffee" className="font-sans font-medium text-sm text-cream-100 hover:text-gold-400 transition-colors relative group">
            {t('coffee', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/gallery" className="font-sans font-medium text-sm text-cream-100 hover:text-gold-400 transition-colors relative group">
            {t('gallery', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Book Now Button */}
        <Link
          to="/booking"
          className="flex md:hidden items-center justify-center p-2 bg-gold-400 hover:bg-gold-500 text-forest-900 transition-colors"
          aria-label={t('bookNow', { ns: 'nav' })}
        >
          <Calendar className="w-4 h-4" />
        </Link>
        <Link
          to="/booking"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold text-sm transition-colors"
        >
          <Calendar className="w-4 h-4" />
          {t('bookNow', { ns: 'nav' })}
        </Link>

        {/* Language Switcher - PROMINENT */}
        <div className={`flex gap-1 glass p-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button 
            onClick={() => changeLanguage('en')} 
            className={`px-2 md:px-3 py-1 md:py-1.5 font-sans text-xs font-bold transition-all min-w-[40px] md:min-w-[45px] ${
              i18n.language === 'en' 
                ? 'bg-gold-500 text-forest-900 shadow-tactile scale-105' 
                : 'text-cream-100 hover:bg-white/10'
            }`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button 
            onClick={() => changeLanguage('ku')} 
              className={`px-2 md:px-3 py-1 md:py-1.5 font-arabic text-xs font-bold transition-all min-w-[40px] md:min-w-[45px] ${
                i18n.language === 'ku' 
                ? 'bg-gold-500 text-forest-900 shadow-tactile scale-105' 
                : 'text-cream-100 hover:bg-white/10'
            }`}
            aria-label="Switch to Kurdish"
          >
            کوردی
          </button>
          <button 
            onClick={() => changeLanguage('ar')} 
            className={`px-2 md:px-3 py-1 md:py-1.5 font-arabic text-xs font-bold transition-all min-w-[40px] md:min-w-[45px] ${
              i18n.language === 'ar' 
                ? 'bg-gold-500 text-forest-900 shadow-tactile scale-105' 
                : 'text-cream-100 hover:bg-white/10'
            }`}
            aria-label="Switch to Arabic"
          >
            عربي
          </button>
        </div>
      </nav>
    </header>
  );
};
