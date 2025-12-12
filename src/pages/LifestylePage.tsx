import { CafeMenu } from '../components/lifestyle/CafeMenu';
import { ViewGallery } from '../components/lifestyle/ViewGallery';
import { AtmosphereIndicators } from '../components/lifestyle/AtmosphereIndicators';
import { LocationContact } from '../components/lifestyle/LocationContact';
import { SEOMeta } from '../components/common/SEOMeta';
import { useTranslation } from 'react-i18next';

export const LifestylePage = () => {
  const { t } = useTranslation('lifestyle');
  
  return (
    <div className="min-h-screen bg-cream-200 dark:bg-slate-900 pb-24 md:pb-8">
      <SEOMeta
        title={{
          en: 'Baran Coffee | Mountain Cafe at Mam Center Erbil',
          ku: 'قاوەخانەی باران | قاوەخانەی چیا لە سەنتەری مام',
          ar: 'مقهى باران | مقهى جبلي في مركز مام أربيل',
        }}
        description={{
          en: 'Outdoor mountain cafe with stunning valley views. Fresh coffee, local snacks, and peaceful atmosphere. Perfect spot for families and nature lovers in Erbil.',
          ku: 'قاوەخانەی چیا لە هەوای کراوە لەگەڵ دیمەنی شاخ و دۆڵ. قاوەی تازە، خواردنی ناوخۆیی، و کەشێکی ئارام.',
          ar: 'مقهى جبلي خارجي مع إطلالات خلابة على الوادي. قهوة طازجة، وجبات خفيفة محلية، وأجواء هادئة.',
        }}
        keywords={{
          en: 'mountain cafe erbil, outdoor coffee kurdistan, scenic views cafe, baran coffee, family cafe erbil',
          ku: 'قاوەخانەی چیا هەولێر, قاوەی هەوای کراوە کوردستان, دیمەنی سروشتی',
          ar: 'مقهى جبلي أربيل, قهوة خارجية كردستان, مقهى إطلالة بانورامية',
        }}
      />
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-slate-700 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559305616-3e2b3733d4b1?q=80&w=2787)',
            filter: 'brightness(0.8) saturate(1.2)',
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream-200 mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-cream-300 font-sans max-w-2xl">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content - Two Column Layout on Desktop */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* The View Gallery */}
            <section>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest-700 dark:text-cream-200 mb-4">
                  {t('sections.view.title')}
                </h2>
                <p className="text-lg text-slate-600 dark:text-cream-400 font-sans">
                  {t('sections.view.subtitle')}
                </p>
              </div>
              <ViewGallery />
            </section>

            {/* Atmosphere Indicators */}
            <section>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest-700 dark:text-cream-200 mb-4">
                  {t('sections.atmosphere.title')}
                </h2>
                <p className="text-lg text-slate-600 dark:text-cream-400 font-sans">
                  {t('sections.atmosphere.subtitle')}
                </p>
              </div>
              <AtmosphereIndicators />
            </section>

            {/* Menu */}
            <section>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest-700 dark:text-cream-200 mb-4">
                  {t('sections.menu.title')}
                </h2>
                <p className="text-lg text-slate-600 dark:text-cream-400 font-sans">
                  {t('sections.menu.subtitle')}
                </p>
              </div>
              <CafeMenu />
            </section>
          </div>

          {/* Sidebar Column - Desktop Only */}
          <div className="hidden lg:block">
            <LocationContact />
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-saddle-500 text-cream-200 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {t('about.title')}
          </h2>
          <p className="text-lg font-sans leading-relaxed text-cream-100">
            {t('about.description')}
          </p>
        </div>
      </section>

      {/* Mobile: Fixed Bottom Contact Bar */}
      <LocationContact />
    </div>
  );
};
