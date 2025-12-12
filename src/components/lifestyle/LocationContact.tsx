import { Users, MapPin, Phone, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LocationContact = () => {
  const { t } = useTranslation('lifestyle');
  const phoneNumber = '+9647501234567';
  const instagramHandle = '@barancoffee_mam';
  const mapsUrl = 'https://maps.google.com/?q=Mam+Center+Baran+Coffee';

  return (
    <>
      {/* Mobile: Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-forest-700 text-cream-200 p-4 shadow-luxury-lg z-40 border-t-2 border-gold-500">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-sans">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-cream-200 text-forest-700 px-4 py-2 font-semibold hover:bg-gold-400 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>{t('contact.directions')}</span>
          </a>
          
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-2 text-cream-200 hover:text-gold-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>{t('contact.call')}</span>
          </a>
          
          <a
            href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cream-200 hover:text-gold-400 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>{instagramHandle}</span>
          </a>
        </div>
        
        <div className="mt-3 text-center text-xs text-cream-300">
          {t('contact.hoursValue')} • {t('contact.walkInsValue')}
        </div>
      </div>

      {/* Desktop: Sidebar Card */}
      <div className="hidden md:block bg-forest-700 text-cream-200 p-8 shadow-luxury sticky top-24">
        <h3 className="font-serif font-bold text-2xl mb-6 text-gold-400 border-b-2 border-gold-500/30 pb-3">
          {t('contact.title')}
        </h3>
        
        <div className="space-y-6">
          {/* Hours */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-6 h-6 text-gold-500" />
              <span className="font-sans font-semibold text-gold-400">{t('contact.hours')}</span>
            </div>
            <p className="text-cream-300 font-sans text-sm ms-11">
              {t('contact.hoursValue')}
            </p>
          </div>

          {/* Walk-ins */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-gold-500" />
              <span className="font-sans font-semibold text-gold-400">{t('contact.walkIns')}</span>
            </div>
            <p className="text-cream-300 font-sans text-sm ms-11">
              {t('contact.walkInsValue')}
            </p>
          </div>

          {/* Directions */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-cream-200 text-forest-700 px-6 py-3 font-sans font-semibold hover:bg-gold-400 transition-colors shadow-tactile hover:shadow-tactile-hover"
          >
            <MapPin className="w-4 h-4" />
            {t('contact.directions')}
          </a>

          {/* Phone */}
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center justify-center gap-2 text-cream-200 hover:text-gold-400 font-sans transition-colors"
          >
            <Phone className="w-4 h-4" />
            {phoneNumber}
          </a>

          {/* Instagram */}
          <a
            href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-cream-200 hover:text-gold-400 font-sans transition-colors"
          >
            <Instagram className="w-4 h-4" />
            {instagramHandle}
          </a>
        </div>
      </div>
    </>
  );
};
