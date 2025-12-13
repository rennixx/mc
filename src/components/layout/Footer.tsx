import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const { t, i18n } = useTranslation('common');
  const { t: tNav } = useTranslation('nav');
  const currentYear = new Date().getFullYear();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <footer className="bg-forest-800 dark:bg-slate-950 text-cream-200 py-12">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl text-left font-serif font-bold text-gold-400 mb-4">
              {t('brandName')}
            </h3>
            <p className="text-cream-300 font-sans text-sm leading-relaxed text-left">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg text-left font-sans font-semibold text-gold-400 mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 font-sans text-sm text-left">
              <li>
              <Link to="/academy" className="text-cream-300 hover:text-gold-400 transition-colors">
                {tNav('academy')}
              </Link>
              </li>
              <li>
              <Link to="/safari" className="text-cream-300 hover:text-gold-400 transition-colors">
                {tNav('safari')}
              </Link>
              </li>
              <li>
              <Link to="/lifestyle" className="text-cream-300 hover:text-gold-400 transition-colors">
                {tNav('lifestyle')}
              </Link>
              </li>
              <li>
              <Link to="/gallery" className="text-cream-300 hover:text-gold-400 transition-colors">
                {tNav('gallery')}
              </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg text-left font-sans font-semibold text-gold-400 mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 font-sans text-sm text-cream-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+9647501234567" className="hover:text-gold-400 transition-colors" dir="ltr">
                  +964 750 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@mamcenter.com" className="hover:text-gold-400 transition-colors" dir="ltr">
                  info@mamcenter.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{t('footer.location')}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg text-left font-sans font-semibold text-gold-400 mb-4">{t('footer.hours')}</h4>
            <ul className="space-y-2 font-sans text-sm text-cream-300 text-left">
              <li>
              <span className="font-semibold">{t('footer.academy')}</span> {t('footer.academyHours')}
              </li>
              <li>
              <span className="font-semibold">{t('footer.safari')}</span> {t('footer.safariHours')}
              </li>
              <li>
              <span className="font-semibold">{t('footer.cafe')}</span> {t('footer.cafeHours')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream-400/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream-400 font-sans text-sm">
            © {currentYear} {t('brandName')}. {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cream-300 hover:text-gold-400 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="https://instagram.com/mamcenter2011" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cream-300 hover:text-gold-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://wa.me/9647501234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cream-300 hover:text-gold-400 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
