import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface LandChapterProps {
  chapter: string;
  title: string;
  subtitle: string;
  description: string;
}

export const LandChapter = ({ chapter, title, subtitle, description }: LandChapterProps) => {
  const { t } = useTranslation('about');
  const [season, setSeason] = useState<'summer' | 'winter'>('summer');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="chapter-3"
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-gradient-to-br from-forest-900 via-blue-900/20 to-saddle-900 overflow-hidden"
    >
      {/* Diagonal Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Mountain Silhouettes */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${
          season === 'summer' ? 'opacity-30' : 'opacity-50'
        }`}>
          <svg className="w-full h-auto" viewBox="0 0 1920 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Back mountains */}
            <path
              d="M0 400L320 200L640 300L960 150L1280 250L1600 180L1920 280V400H0Z"
              fill="url(#mountainBack)"
              className="transition-all duration-1000"
              style={{
                transform: season === 'winter' ? 'translateY(-20px)' : 'translateY(0)',
              }}
            />
            {/* Front mountains */}
            <path
              d="M0 400L240 280L480 350L720 250L960 320L1200 220L1440 300L1680 240L1920 350V400H0Z"
              fill="url(#mountainFront)"
              className="transition-all duration-1000"
              style={{
                transform: season === 'winter' ? 'translateY(-10px)' : 'translateY(0)',
              }}
            />
            <defs>
              <linearGradient id="mountainBack" x1="960" y1="150" x2="960" y2="400">
                <stop offset="0" stopColor={season === 'summer' ? '#166534' : '#1e3a5f'} stopOpacity="0.6" />
                <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="mountainFront" x1="960" y1="220" x2="960" y2="400">
                <stop offset="0" stopColor={season === 'summer' ? '#15803d' : '#334155'} stopOpacity="0.8" />
                <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Snow overlay for winter */}
        {season === 'winter' && (
          <div className="absolute inset-0 opacity-20 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-transparent to-transparent" />
          </div>
        )}

        {/* Sun/Moon */}
        <div className={`absolute top-20 right-20 w-32 h-32 rounded-lg transition-all duration-1000 ${
          season === 'summer'
            ? 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-[0_0_80px_rgba(251,191,36,0.5)]'
            : 'bg-gradient-to-br from-slate-200 to-slate-300 shadow-[0_0_60px_rgba(226,232,240,0.4)]'
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto px-2">
          {/* Left Side - Text */}
          <div
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="inline-block px-3 py-1.5 bg-gold-400/20 text-gold-300 rounded-lg text-xs md:text-sm font-sans font-semibold mb-4 md:mb-6">
              {chapter}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-cream-100 mb-3 md:mb-4">
              {title}
            </h2>
            <p className="text-base md:text-lg text-cream-300 mb-4 md:mb-6 font-sans max-w-md">
              {subtitle}
            </p>

            <p className="text-sm md:text-base lg:text-lg text-cream-200 mb-6 md:mb-8 font-sans leading-relaxed">
              {description}
            </p>

            {/* Season Toggle */}
            <div className="flex items-center gap-2 md:gap-4 p-2 glass-card rounded-lg w-fit max-w-full">
              <button
                onClick={() => setSeason('summer')}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-sans font-semibold text-xs md:text-sm transition-all duration-300 ${
                  season === 'summer'
                    ? 'bg-gold-400 text-forest-900 shadow-luxury scale-105'
                    : 'text-cream-200 hover:text-gold-300'
                }`}
              >
                ☀️ {t('theLand.seasons.summer.title')}
              </button>
              <button
                onClick={() => setSeason('winter')}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-sans font-semibold text-xs md:text-sm transition-all duration-300 ${
                  season === 'winter'
                    ? 'bg-blue-400 text-forest-900 shadow-luxury scale-105'
                    : 'text-cream-200 hover:text-blue-300'
                }`}
              >
                ❄️ {t('theLand.seasons.winter.title')}
              </button>
            </div>

            {/* Season Description */}
            <div className="mt-6 md:mt-8 p-4 md:p-6 glass-card rounded-lg">
              <p className="text-sm md:text-base text-cream-200 font-sans leading-relaxed">
                {season === 'summer'
                  ? t('theLand.seasons.summer.description')
                  : t('theLand.seasons.winter.description')}
              </p>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Main Card */}
            <div className="relative aspect-square md:aspect-square max-h-[350px] md:max-h-[400px] rounded-lg overflow-hidden glass-card border-2 border-gold-400/20">
              {/* Seasonal Content */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                {season === 'summer' ? (
                  <div className="text-center">
                    <div className="text-6xl md:text-8xl mb-2 md:mb-4 animate-bounce">🏔️</div>
                    <p className="text-gold-400 font-serif font-bold text-lg md:text-2xl">
                      {t('theLand.seasons.summer.title')}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl md:text-8xl mb-2 md:mb-4 animate-pulse">🏔️</div>
                    <p className="text-blue-300 font-serif font-bold text-lg md:text-2xl">
                      {t('theLand.seasons.winter.title')}
                    </p>
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className={`absolute top-4 right-4 px-2 md:px-3 py-1 rounded-lg text-xs font-sans font-bold transition-all duration-500 ${
                season === 'summer'
                  ? 'bg-orange-400/20 text-orange-300'
                  : 'bg-blue-400/20 text-blue-300'
              }`}>
                {season === 'summer' ? '28°C' : '-2°C'}
              </div>

              {/* Floating Particles */}
              {season === 'winter' && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-sm animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Decorative Circle */}
            <div className={`absolute -z-10 -bottom-4 md:-bottom-8 -right-4 md:-right-8 w-32 h-32 md:w-48 md:h-48 rounded-lg transition-all duration-1000 ${
              season === 'summer'
                ? 'bg-gold-400/20'
                : 'bg-blue-400/20'
            }`} />
          </div>
        </div>
      </div>
    </section>
  );
};
