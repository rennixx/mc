import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/icons/logo.png';

export const Header = () => {
  const { t, i18n } = useTranslation(['common', 'nav']);
  const isRTL = i18n.dir() === 'rtl';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = i18n.dir(lng);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-2 md:top-3 left-2 right-2 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 md:w-[95%] md:max-w-7xl">
        <nav className="px-3 md:px-5 py-3 md:py-2 flex justify-between items-center gap-3 bg-transparent md:bg-[rgba(35,65,95,0.7)] md:backdrop-blur-[20px] md:border md:border-white/10 md:shadow-luxury md:rounded-sm">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group" onClick={closeMobileMenu}>
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-cream-100 hover:text-gold-400 transition-colors relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>

          {/* Book Now Button */}
          <Link
            to="/booking"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold text-sm transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {t('bookNow', { ns: 'nav' })}
          </Link>

          {/* Language Switcher - Desktop */}
          <div className={`hidden md:flex gap-1 glass p-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={closeMobileMenu}
        >
          <div className="h-full flex flex-col justify-center items-center px-6 pt-20 pb-8">
            {/* Mobile Navigation Links */}
            <nav className={`flex flex-col gap-6 mb-12 w-full max-w-sm ${isRTL ? 'text-right' : 'text-left'}`}>
              <Link 
                to="/academy" 
                className="font-sans font-bold text-2xl text-cream-100 hover:text-gold-400 transition-colors py-3 border-b border-cream-100/10"
                onClick={closeMobileMenu}
              >
                {t('academy', { ns: 'nav' })}
              </Link>
              <Link 
                to="/safari" 
                className="font-sans font-bold text-2xl text-cream-100 hover:text-gold-400 transition-colors py-3 border-b border-cream-100/10"
                onClick={closeMobileMenu}
              >
                {t('safari', { ns: 'nav' })}
              </Link>
              <Link 
                to="/contact" 
                className="font-sans font-bold text-2xl text-cream-100 hover:text-gold-400 transition-colors py-3 border-b border-cream-100/10"
                onClick={closeMobileMenu}
              >
                {t('contact', { ns: 'nav' })}
              </Link>
              <Link 
                to="/coffee" 
                className="font-sans font-bold text-2xl text-cream-100 hover:text-gold-400 transition-colors py-3 border-b border-cream-100/10"
                onClick={closeMobileMenu}
              >
                {t('coffee', { ns: 'nav' })}
              </Link>
              <Link 
                to="/gallery" 
                className="font-sans font-bold text-2xl text-cream-100 hover:text-gold-400 transition-colors py-3 border-b border-cream-100/10"
                onClick={closeMobileMenu}
              >
                {t('gallery', { ns: 'nav' })}
              </Link>
            </nav>

            {/* Mobile Book Now Button */}
            <Link
              to="/booking"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold text-lg transition-colors w-full max-w-sm mb-8"
              onClick={closeMobileMenu}
            >
              <Calendar className="w-5 h-5" />
              {t('bookNow', { ns: 'nav' })}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="flex gap-2 glass p-1 w-full max-w-sm">
              <button 
                onClick={() => { changeLanguage('en'); closeMobileMenu(); }} 
                className={`flex-1 px-4 py-3 font-sans text-sm font-bold transition-all ${
                  i18n.language === 'en' 
                    ? 'bg-gold-500 text-forest-900 shadow-tactile' 
                    : 'text-cream-100 hover:bg-white/10'
                }`}
                aria-label="Switch to English"
              >
                English
              </button>
              <button 
                onClick={() => { changeLanguage('ku'); closeMobileMenu(); }} 
                className={`flex-1 px-4 py-3 font-arabic text-sm font-bold transition-all ${
                  i18n.language === 'ku' 
                    ? 'bg-gold-500 text-forest-900 shadow-tactile' 
                    : 'text-cream-100 hover:bg-white/10'
                }`}
                aria-label="Switch to Kurdish"
              >
                کوردی
              </button>
              <button 
                onClick={() => { changeLanguage('ar'); closeMobileMenu(); }} 
                className={`flex-1 px-4 py-3 font-arabic text-sm font-bold transition-all ${
                  i18n.language === 'ar' 
                    ? 'bg-gold-500 text-forest-900 shadow-tactile' 
                    : 'text-cream-100 hover:bg-white/10'
                }`}
                aria-label="Switch to Arabic"
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
