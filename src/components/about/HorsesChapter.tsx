import { useRef, useEffect, useState } from 'react';

interface HorseCard {
  name: string;
  story: string;
  personality: string;
  funFact: string;
}

interface HorsesChapterProps {
  chapter: string;
  title: string;
  subtitle: string;
  horses: HorseCard[];
}

export const HorsesChapter = ({ chapter, title, subtitle, horses }: HorsesChapterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth * 0.8;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const cardWidth = containerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  return (
    <section id="chapter-2" className="relative py-24 md:py-32 bg-gradient-to-b from-saddle-900 via-saddle-800 to-forest-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-gold-400/20 text-gold-300 rounded-full text-sm font-sans font-semibold mb-4">
            {chapter}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cream-100 mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-cream-300 font-sans max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-gold-400/20 hover:bg-gold-400/40 text-gold-300 backdrop-blur-sm border border-gold-400/30 transition-all -ml-6"
            aria-label="Previous horse"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-gold-400/20 hover:bg-gold-400/40 text-gold-300 backdrop-blur-sm border border-gold-400/30 transition-all -mr-6"
            aria-label="Next horse"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-8 -mx-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {horses.map((horse, index) => (
              <div
                key={horse.name}
                className={`flex-shrink-0 w-[320px] md:w-[380px] transition-all duration-500 snap-center ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Horse Card */}
                <div className="relative h-[420px] md:h-[480px]">
                  {/* Front Side */}
                  <div className="absolute inset-0 glass-card rounded-3xl p-6 flex flex-col overflow-hidden">
                    {/* Horse Avatar */}
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-400/10 flex items-center justify-center border-2 border-gold-400/30 shadow-luxury flex-shrink-0">
                      <span className="text-4xl md:text-5xl">🐴</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-cream-100 text-center mb-2 truncate">
                      {horse.name}
                    </h3>

                    {/* Personality Badge */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-gold-400/20 text-gold-300 rounded-full text-xs md:text-sm font-sans font-semibold border border-gold-400/30 truncate max-w-full">
                        {horse.personality}
                      </span>
                    </div>

                    {/* Story */}
                    <p className="text-cream-200 font-sans text-sm md:text-base leading-relaxed flex-grow text-center overflow-hidden text-ellipsis line-clamp-4">
                      "{horse.story}"
                    </p>

                    {/* Tap Hint */}
                    <div className="mt-auto pt-3 border-t border-cream-100/10">
                      <p className="text-center text-cream-400/70 text-xs font-sans">
                        ↕ Scroll or swipe for more
                      </p>
                    </div>
                  </div>

                  {/* Fun Fact Badge - Floating */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 bg-gold-400 text-forest-900 rounded-full text-xs md:text-sm font-sans font-bold shadow-luxury whitespace-nowrap max-w-[85%] text-center truncate">
                    ✨ {horse.funFact}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {horses.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (containerRef.current) {
                    containerRef.current.scrollTo({
                      left: index * containerRef.current.offsetWidth,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'w-8 bg-gold-400'
                    : 'bg-cream-400/40 hover:bg-cream-400/60'
                }`}
                aria-label={`Go to ${horses[index].name}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Prompt - Mobile */}
        <div className="flex items-center justify-center gap-2 mt-8 md:hidden text-cream-400/70 text-sm">
          <span>Swipe to explore</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
};
