import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOMeta } from '../components/common/SEOMeta';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import {
  ScrollProgress,
  HeroChapter,
  HorsesChapter,
  LandChapter,
  ValuesChapter,
  FacilityChapter,
} from '../components/about';

export const AboutPage = () => {
  const { t } = useTranslation('about');

  const horses = [
    {
      name: 'Spirit',
      story: t('horsesStories.spirit.story'),
      personality: t('horsesStories.spirit.personality'),
      funFact: t('horsesStories.spirit.funFact'),
    },
    {
      name: 'Thunder',
      story: t('horsesStories.thunder.story'),
      personality: t('horsesStories.thunder.personality'),
      funFact: t('horsesStories.thunder.funFact'),
    },
    {
      name: 'Lucky',
      story: t('horsesStories.lucky.story'),
      personality: t('horsesStories.lucky.personality'),
      funFact: t('horsesStories.lucky.funFact'),
    },
  ];

  return (
    <>
      <SEOMeta
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress totalChapters={5} />

      {/* Chapter 1: Hero */}
      <HeroChapter
        chapter={t('vision.chapter')}
        title={t('vision.title')}
        subtitle={t('vision.subtitle')}
        story={t('vision.story')}
        scrollPrompt={t('scrollPrompt', 'Scroll to continue')}
      />

      {/* Chapter 2: Horses */}
      <HorsesChapter
        chapter="02"
        title={t('horsesStories.title')}
        subtitle={t('horsesStories.subtitle')}
        horses={horses}
      />

      {/* Chapter 3: The Land */}
      <LandChapter
        chapter="03"
        title={t('theLand.title')}
        subtitle={t('theLand.subtitle')}
        description={t('theLand.description')}
      />

      {/* Chapter 4: Values */}
      <ValuesChapter
        chapter="04"
        title={t('values.title')}
        subtitle={t('values.subtitle')}
      />

      {/* Chapter 5: Facility */}
      <FacilityChapter
        chapter="05"
        title={t('facility.title')}
        subtitle={t('facility.subtitle')}
      />

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-transparent to-gold-400/10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cream-100 mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-cream-200 mb-8 font-sans max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <button className="group px-8 py-4 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold transition-all duration-300 rounded-lg shadow-luxury hover:shadow-luxury-lg">
                {t('cta.primary')}
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 border-2 border-gold-400 text-gold-400 hover:bg-gold-400/10 font-sans font-bold transition-all duration-300 rounded-lg">
                {t('cta.secondary')}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppButton message="Hi! I'd love to learn more about MAM Center's story." />
    </>
  );
};
