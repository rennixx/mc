import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOMeta } from '../components/common/SEOMeta';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { StoryChapter } from '../components/about/StoryChapter';
import { HorseStoryCard } from '../components/about/HorseStoryCard';
import { ValuesGrid } from '../components/about/ValuesGrid';
import { FacilityGallery } from '../components/about/FacilityGallery';

export const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <>
      <SEOMeta
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
      />

      {/* Chapter 1: The Vision - Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-800 to-saddle-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/horses/show-jumping-1.jpg')] bg-cover bg-center" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 bg-gold-400/20 text-gold-300 rounded-full text-sm font-sans font-semibold mb-6">
            {t('vision.chapter')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            {t('vision.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 font-sans max-w-2xl mx-auto">
            {t('vision.subtitle')}
          </p>
          <p className="text-lg text-cream-200 mb-12 font-sans leading-relaxed max-w-3xl mx-auto">
            {t('vision.story')}
          </p>
          <div className="flex items-center justify-center gap-2 text-gold-400 animate-bounce">
            <span className="text-sm font-sans">{t('scrollPrompt', 'Scroll to continue')}</span>
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Chapter 2: Our Horses' Stories */}
      <StoryChapter
        chapter="02"
        title={t('horsesStories.title')}
        subtitle={t('horsesStories.subtitle')}
        bgGradient="from-saddle-900 via-saddle-800 to-forest-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <HorseStoryCard
            name="Spirit"
            story={t('horsesStories.spirit.story')}
            personality={t('horsesStories.spirit.personality')}
            funFact={t('horsesStories.spirit.funFact')}
          />
          <HorseStoryCard
            name="Thunder"
            story={t('horsesStories.thunder.story')}
            personality={t('horsesStories.thunder.personality')}
            funFact={t('horsesStories.thunder.funFact')}
          />
          <HorseStoryCard
            name="Lucky"
            story={t('horsesStories.lucky.story')}
            personality={t('horsesStories.lucky.personality')}
            funFact={t('horsesStories.lucky.funFact')}
          />
        </div>
      </StoryChapter>

      {/* Chapter 3: The Land */}
      <StoryChapter
        chapter="03"
        title={t('theLand.title')}
        subtitle={t('theLand.subtitle')}
        bgGradient="from-forest-900 via-blue-900/30 to-saddle-900"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-lg text-cream-200 mb-6 font-sans leading-relaxed">
              {t('theLand.description')}
            </p>
            <div className="space-y-4">
              <div className="glass-card p-4">
                <h4 className="text-gold-400 font-serif font-bold mb-2">
                  {t('theLand.seasons.summer.title')}
                </h4>
                <p className="text-cream-200 text-sm font-sans">
                  {t('theLand.seasons.summer.description')}
                </p>
              </div>
              <div className="glass-card p-4">
                <h4 className="text-gold-400 font-serif font-bold mb-2">
                  {t('theLand.seasons.winter.title')}
                </h4>
                <p className="text-cream-200 text-sm font-sans">
                  {t('theLand.seasons.winter.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="glass-card aspect-square rounded-2xl overflow-hidden flex items-center justify-center">
            <span className="text-8xl opacity-50">🏔️</span>
          </div>
        </div>
      </StoryChapter>

      {/* Chapter 4: Our Values */}
      <StoryChapter
        chapter="04"
        title={t('values.title')}
        subtitle={t('values.subtitle')}
        bgGradient="from-saddle-900 via-forest-900 to-saddle-900"
      >
        <ValuesGrid />
      </StoryChapter>

      {/* Chapter 5: The Facility */}
      <StoryChapter
        chapter="05"
        title={t('facility.title')}
        subtitle={t('facility.subtitle')}
        bgGradient="from-forest-900 via-saddle-800 to-forest-900"
      >
        <FacilityGallery />
      </StoryChapter>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-gold-400/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream-100 mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-cream-200 mb-8 font-sans max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <button className="px-8 py-4 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold transition-colors">
                {t('cta.primary')}
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 border-2 border-gold-400 text-gold-400 hover:bg-gold-400/10 font-sans font-bold transition-colors">
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
