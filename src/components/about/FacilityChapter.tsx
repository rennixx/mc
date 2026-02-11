import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Maximize2, MapPin, Home, Mountain, Coffee } from 'lucide-react';

interface FacilityChapterProps {
  chapter: string;
  title: string;
  subtitle: string;
}

interface Facility {
  key: string;
  icon: typeof MapPin;
  size: 'large' | 'medium' | 'small';
  rowSpan?: number;
  colSpan?: number;
}

export const FacilityChapter = ({ chapter, title, subtitle }: FacilityChapterProps) => {
  const { t } = useTranslation('about');
  const [hoveredFacility, setHoveredFacility] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const facilities: Facility[] = [
    { key: 'indoorArena', icon: MapPin, size: 'large', rowSpan: 2, colSpan: 2 },
    { key: 'outdoorTrails', icon: Mountain, size: 'medium', colSpan: 1 },
    { key: 'lounge', icon: Coffee, size: 'medium', colSpan: 1 },
    { key: 'stables', icon: Home, size: 'medium', colSpan: 2 },
  ];

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="chapter-5"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-forest-900 via-saddle-800 to-forest-900 overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-8 md:mb-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-gold-400/20 text-gold-300 rounded-lg text-sm font-sans font-semibold mb-4">
            {chapter}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-cream-100 mb-4">
            {title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-cream-300 font-sans max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[150px]">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              const isLarge = facility.size === 'large';

              return (
                <div
                  key={facility.key}
                  className={`
                    glass-card rounded-lg overflow-hidden cursor-pointer group transition-all duration-500
                    ${isLarge ? 'md:row-span-2 md:col-span-2' : facility.colSpan === 2 ? 'md:col-span-2' : ''}
                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    zIndex: hoveredFacility === facility.key ? 20 : 10,
                  }}
                  onMouseEnter={() => setHoveredFacility(facility.key)}
                  onMouseLeave={() => setHoveredFacility(null)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-4 md:p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2 md:mb-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-400/5 flex items-center justify-center border border-gold-400/20 flex-shrink-0 ${
                        isLarge ? 'w-14 h-14 md:w-16 md:h-16' : ''
                      }`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-gold-400" />
                      </div>
                      <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-cream-400/50 group-hover:text-gold-400 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-serif font-bold text-cream-100 mb-1 md:mb-2 group-hover:text-gold-400 transition-colors truncate ${
                        isLarge ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
                      }`}
                    >
                      {t(`facility.items.${facility.key}.title`)}
                    </h3>

                    {/* Description - expands on hover */}
                    <p
                      className={`text-xs md:text-sm lg:text-base text-cream-200 font-sans transition-all duration-300 overflow-hidden ${
                        hoveredFacility === facility.key
                          ? 'max-h-20 opacity-100 line-clamp-3'
                          : 'max-h-0 opacity-0 md:max-h-8 md:opacity-70 line-clamp-1'
                      }`}
                    >
                      {t(`facility.items.${facility.key}.description`)}
                    </p>

                    {/* Expand Button */}
                    <div className="mt-auto pt-4">
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-sans font-semibold transition-all duration-300 ${
                          hoveredFacility === facility.key
                            ? 'text-gold-400 gap-3'
                            : 'text-cream-400/70'
                        }`}
                      >
                        <span>{isLarge ? 'Explore' : 'View'}</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent transition-opacity duration-300 ${
                      hoveredFacility === facility.key ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Animated Border on Hover */}
                  <div
                    className={`absolute inset-0 rounded-lg border-2 border-gold-400/0 group-hover:border-gold-400/30 transition-all duration-300 ${
                      hoveredFacility === facility.key ? 'border-gold-400/50 shadow-[0_0_30px_rgba(250,204,21,0.2)]' : ''
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gold-400/5 rounded-lg blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-forest-600/10 rounded-lg blur-3xl pointer-events-none" />
    </section>
  );
};
