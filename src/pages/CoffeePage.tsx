import { useTranslation } from 'react-i18next';
import { SEOMeta } from '../components/common/SEOMeta';
import { Coffee, Wifi, Eye, Award } from 'lucide-react';
import clubhouse from '../assets/images/facility/clubhouse.png';

export const CoffeePage = () => {
  const { t } = useTranslation('coffee');

  const features = [
    {
      icon: Eye,
      title: t('features.items.view.title'),
      description: t('features.items.view.description')
    },
    {
      icon: Award,
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description')
    },
    {
      icon: Coffee,
      title: t('features.items.atmosphere.title'),
      description: t('features.items.atmosphere.description')
    },
    {
      icon: Wifi,
      title: t('features.items.wifi.title'),
      description: t('features.items.wifi.description')
    }
  ];

  return (
    <>
      <SEOMeta
        title={t('hero.title')}
        description={t('hero.subtitle')}
        keywords="Baran Coffee, cafe, coffee shop, Kurdistan, Erbil, equestrian cafe"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${clubhouse})`,
            filter: 'brightness(0.6)'
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Coffee className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 text-gold-400" />
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream-200 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-cream-300 font-sans">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-cream-200 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-forest-700 dark:text-gold-400">
              {t('about.title')}
            </h2>
            <p className="text-lg md:text-xl text-slate-700 dark:text-cream-300 mb-6 font-sans leading-relaxed">
              {t('about.description')}
            </p>
            <div className="inline-block px-6 py-3 bg-gold-400 text-forest-900 font-sans font-semibold text-lg shadow-luxury">
              {t('about.highlight')}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-forest-700 dark:text-gold-400">
            {t('menu.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Coffee & Beverages */}
            <div className="bg-cream-100 dark:bg-slate-700 p-8 shadow-luxury">
              <h3 className="text-2xl font-serif font-bold mb-6 text-forest-700 dark:text-gold-400 border-b-2 border-gold-500 pb-3">
                {t('menu.coffee.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.coffee.items.espresso')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.coffee.items.americano')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.coffee.items.cappuccino')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.coffee.items.latte')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.coffee.items.mocha')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.coffee.items.turkish')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.coffee.items.tea')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.coffee.items.juice')}
                </li>
              </ul>
            </div>

            {/* Food & Pastries */}
            <div className="bg-cream-100 dark:bg-slate-700 p-8 shadow-luxury">
              <h3 className="text-2xl font-serif font-bold mb-6 text-forest-700 dark:text-gold-400 border-b-2 border-gold-500 pb-3">
                {t('menu.food.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.food.items.croissant')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.food.items.sandwich')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.food.items.salad')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.food.items.cake')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.food.items.cookies')}
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-cream-300 font-sans">
                  <Coffee className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t('menu.food.items.breakfast')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream-200 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-forest-700 dark:text-gold-400">
            {t('features.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-slate-800 shadow-luxury hover:shadow-xl transition-shadow">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-gold-500" />
                <h3 className="text-xl font-serif font-bold mb-3 text-forest-700 dark:text-gold-400">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-cream-300 font-sans">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-forest-800 to-forest-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream-200 mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-cream-300 mb-8 font-sans">
            {t('cta.description')}
          </p>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gold-400 text-forest-900 font-sans font-bold text-lg hover:bg-gold-300 transition-colors shadow-luxury"
          >
            {t('cta.button')}
          </a>
        </div>
      </section>
    </>
  );
};
