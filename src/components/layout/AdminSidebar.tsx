import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, ListPlus, FileText, LogOut, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const { t } = useTranslation('admin');
  const location = useLocation();

  const navigation = [
    { name: 'sidebar.dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'sidebar.bookings', href: '/admin/bookings', icon: FileText },
    { name: 'sidebar.calendar', href: '/admin/calendar', icon: Calendar },
    { name: 'sidebar.newBooking', href: '/admin/new', icon: ListPlus },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-forest-900/95 backdrop-blur-xl border-r border-cream-400/10
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cream-400/10">
            <div>
              <h1 className="text-xl font-serif font-bold text-cream-100">
                {t('sidebar.title', 'MAM Center')}
              </h1>
              <p className="text-sm text-cream-400 font-sans">
                {t('sidebar.adminPanel', 'Admin Panel')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-cream-400 hover:text-cream-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/admin'}
                  onClick={() => {
                    // Close mobile menu after navigation
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg font-sans transition-all
                    ${isActive(item.href)
                      ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30'
                      : 'text-cream-300 hover:bg-cream-400/5 hover:text-cream-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{t(item.name)}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-cream-400/10">
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-cream-300 hover:bg-cream-400/5 hover:text-cream-100 transition-all"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{t('sidebar.backToSite', 'Back to Website')}</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
