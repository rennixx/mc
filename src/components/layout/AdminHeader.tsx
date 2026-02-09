import { Menu, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const { t } = useTranslation('admin');

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
          {/* Notifications */}
          <button className="relative p-2 text-cream-400 hover:text-cream-100 hover:bg-cream-400/10 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-gold-400 rounded-full"></span>
          </button>

          {/* User info */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-cream-400/5 rounded-lg border border-cream-400/10">
            <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-forest-900">A</span>
            </div>
            <div className="text-left">
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
