import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
      <nav className="backdrop-blur-md bg-cream-200/95 dark:bg-slate-800/95 shadow-luxury border border-forest-600/10 dark:border-gold-500/20 px-4 md:px-6 py-2.5 md:py-3 flex justify-between items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 group">
          <img 
            src={logo} 
            alt={t('brandName', { ns: 'common' })} 
            className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105 brightness-0 invert"
          />
        </Link>
        
        {/* Desktop Navigation - Hidden on Mobile */}
        <div className={`hidden md:flex gap-4 lg:gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link to="/academy" className="font-sans font-medium text-sm text-slate-700 dark:text-cream-300 hover:text-forest-600 dark:hover:text-gold-400 transition-colors relative group">
            {t('academy', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forest-600 dark:bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/safari" className="font-sans font-medium text-sm text-slate-700 dark:text-cream-300 hover:text-forest-600 dark:hover:text-gold-400 transition-colors relative group">
            {t('safari', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forest-600 dark:bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/contact" className="font-sans font-medium text-sm text-slate-700 dark:text-cream-300 hover:text-forest-600 dark:hover:text-gold-400 transition-colors relative group">
            {t('contact', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forest-600 dark:bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/coffee" className="font-sans font-medium text-sm text-slate-700 dark:text-cream-300 hover:text-forest-600 dark:hover:text-gold-400 transition-colors relative group">
            {t('coffee', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forest-600 dark:bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/gallery" className="font-sans font-medium text-sm text-slate-700 dark:text-cream-300 hover:text-forest-600 dark:hover:text-gold-400 transition-colors relative group">
            {t('gallery', { ns: 'nav' })}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forest-600 dark:bg-gold-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Language Switcher - PROMINENT */}
        <div className={`flex gap-1 border-2 border-gold-500/30 p-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button 
            onClick={() => changeLanguage('en')} 
            className={`px-2.5 md:px-4 py-1.5 md:py-2 font-sans text-xs md:text-sm font-bold transition-all min-w-[45px] md:min-w-[50px] ${
              i18n.language === 'en' 
                ? 'bg-gold-500 text-slate-900 shadow-tactile scale-105' 
                : 'text-slate-600 dark:text-cream-400 hover:bg-gold-400/20'
            }`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button 
            onClick={() => changeLanguage('ku')} 
            className={`px-2.5 md:px-4 py-1.5 md:py-2 font-sans text-xs md:text-sm font-bold transition-all min-w-[45px] md:min-w-[50px] ${
              i18n.language === 'ku' 
                ? 'bg-gold-500 text-slate-900 shadow-tactile scale-105' 
                : 'text-slate-600 dark:text-cream-400 hover:bg-gold-400/20'
            }`}
            aria-label="Switch to Kurdish"
          >
            کوردی
          </button>
          <button 
            onClick={() => changeLanguage('ar')} 
            className={`px-2.5 md:px-4 py-1.5 md:py-2 font-sans text-xs md:text-sm font-bold transition-all min-w-[45px] md:min-w-[50px] ${
              i18n.language === 'ar' 
                ? 'bg-gold-500 text-slate-900 shadow-tactile scale-105' 
                : 'text-slate-600 dark:text-cream-400 hover:bg-gold-400/20'
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
