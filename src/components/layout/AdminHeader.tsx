import { Menu, Bell, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { clearAllBookings } from '../../services/bookingStorage';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const { t, i18n } = useTranslation('admin');
  const isRTL = i18n.dir() === 'rtl';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = i18n.dir(lng);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to delete ALL bookings? This cannot be undone.')) {
      clearAllBookings();
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-forest-900/80 backdrop-blur-xl border-b border-cream-400/10">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left side - Menu button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-cream-400 hover:text-cream-100 hover:bg-cream-400/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-lg font-serif font-semibold text-cream-100">
              {t('header.welcome', 'Welcome back')}
            </h2>
            <p className="text-sm text-cream-400 font-sans">
              {t('header.subtitle', 'Manage your bookings efficiently')}
            </p>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className={`hidden sm:flex gap-1 bg-cream-400/5 p-0.5 rounded-lg border border-cream-400/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2 py-1 font-sans text-xs font-bold transition-all min-w-[35px] ${
                i18n.language === 'en'
                  ? 'bg-gold-500 text-forest-900 shadow-tactile scale-105'
                  : 'text-cream-100 hover:bg-cream-400/10'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('ku')}
              className={`px-2 py-1 font-arabic text-xs font-bold transition-all min-w-[35px] ${
                i18n.language === 'ku'
                  ? 'bg-gold-500 text-forest-900 shadow-tactile scale-105'
                  : 'text-cream-100 hover:bg-cream-400/10'
              }`}
              aria-label="Switch to Kurdish"
            >
              کوردی
            </button>
            <button
              onClick={() => changeLanguage('ar')}
              className={`px-2 py-1 font-arabic text-xs font-bold transition-all min-w-[35px] ${
                i18n.language === 'ar'
                  ? 'bg-gold-500 text-forest-900 shadow-tactile scale-105'
                  : 'text-cream-100 hover:bg-cream-400/10'
              }`}
              aria-label="Switch to Arabic"
            >
              عربي
            </button>
          </div>

          {/* Clear Data Button */}
          <button
            onClick={handleClearData}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-colors text-xs font-semibold"
            title="Clear all bookings"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Data</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-cream-400 hover:text-cream-100 hover:bg-cream-400/10 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-gold-400 rounded-full"></span>
          </button>

          {/* User info */}
          <div className={`hidden sm:flex items-center gap-3 px-4 py-2 bg-cream-400/5 rounded-lg border border-cream-400/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-forest-900">A</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-sm font-medium text-cream-100 font-sans">
                {t('header.adminName', 'Admin User')}
              </p>
              <p className="text-xs text-cream-400 font-sans">
                {t('header.role', 'Administrator')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
