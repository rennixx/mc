import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Coffee, Camera } from 'lucide-react';

export const MobileBottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-cream-200/98 dark:bg-slate-800/98 backdrop-blur-sm border-t border-forest-600/20 dark:border-gold-500/20 z-50 safe-area-inset-bottom shadow-luxury">
      <div className="flex justify-around items-center h-16">
        {/* Sport */}
        <Link 
          to="/academy" 
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive('/academy') 
              ? 'text-forest-600 dark:text-gold-400' 
              : 'text-slate-600 dark:text-cream-400'
          }`}
        >
          <GraduationCap className="w-6 h-6 mb-1" />
          <span className="text-xs font-sans font-medium">Sport</span>
        </Link>

        {/* Life */}
        <Link 
          to="/safari" 
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive('/safari') || isActive('/lifestyle')
              ? 'text-forest-600 dark:text-gold-400' 
              : 'text-slate-600 dark:text-cream-400'
          }`}
        >
          <Coffee className="w-6 h-6 mb-1" />
          <span className="text-xs font-sans font-medium">Life</span>
        </Link>

        {/* Gallery */}
        <Link 
          to="/gallery" 
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive('/gallery') 
              ? 'text-forest-600 dark:text-gold-400' 
              : 'text-slate-600 dark:text-cream-400'
          }`}
        >
          <Camera className="w-6 h-6 mb-1" />
          <span className="text-xs font-sans font-medium">Gallery</span>
        </Link>

        {/* Menu */}
        <button 
          className="flex flex-col items-center justify-center flex-1 h-full text-slate-600 dark:text-cream-400"
          onClick={() => {
            // TODO: Toggle mobile menu modal
            alert('Menu modal - TBD');
          }}
        >
          <span className="text-2xl mb-1">☰</span>
          <span className="text-xs font-sans font-medium">Menu</span>
        </button>
      </div>
    </nav>
  );
};
