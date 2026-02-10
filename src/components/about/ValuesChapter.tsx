import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Shield, Users, Leaf } from 'lucide-react';

interface ValuesChapterProps {
  chapter: string;
  title: string;
  subtitle: string;
}

interface Value {
  key: string;
  icon: typeof Heart;
  color: string;
  orbitAngle: number;
}

export const ValuesChapter = ({ chapter, title, subtitle }: ValuesChapterProps) => {
  const { t } = useTranslation('about');
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const values: Value[] = [
    { key: 'horseWelfare', icon: Heart, color: 'text-red-400', orbitAngle: 0 },
    { key: 'confidence', icon: Shield, color: 'text-blue-400', orbitAngle: 90 },
    { key: 'community', icon: Users, color: 'text-gold-400', orbitAngle: 180 },
    { key: 'nature', icon: Leaf, color: 'text-green-400', orbitAngle: 270 },
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="chapter-4"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-saddle-900 via-forest-900 to-saddle-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gold-400/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-400/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold-400/5" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
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

        {/* Radial Layout */}
        <div className="relative max-w-5xl mx-auto px-4">
          {/* Orbit Container */}
          <div className="relative aspect-square md:aspect-[16/9] max-h-[500px] md:max-h-[550px]">
            {/* Central Hub - MAM Emblem */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div
                className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-400/10 backdrop-blur-sm border-4 border-gold-400/40 shadow-luxury flex items-center justify-center transition-all duration-500 ${
                  hoveredValue ? 'scale-90 opacity-50' : 'scale-100 opacity-100'
                }`}
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-gold-400 whitespace-nowrap">
                  {t('values.brandName')}
                </div>

                {/* Rotating ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold-400/30 animate-spin" style={{ animationDuration: '20s' }} />
              </div>
            </div>

            {/* Orbiting Values */}
            <div className="absolute inset-4 md:inset-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                const angle = (value.orbitAngle * Math.PI) / 180;
                const radius = 35; // percentage from center - reduced for mobile

                // Calculate position based on angle
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <div
                    key={value.key}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                      isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transitionDelay: `${index * 150}ms`,
                      zIndex: hoveredValue === value.key ? 30 : 10,
                    }}
                    onMouseEnter={() => setHoveredValue(value.key)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    {/* Value Card */}
                    <div
                      className={`relative group cursor-pointer transition-all duration-500 ${
                        hoveredValue === value.key
                          ? 'scale-110'
                          : hoveredValue
                          ? 'scale-90 opacity-50'
                          : 'scale-100 opacity-100 hover:scale-105'
                      }`}
                    >
                      {/* Icon Circle */}
                      <div
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-forest-900 to-saddle-900 flex items-center justify-center border-2 ${
                          hoveredValue === value.key
                            ? 'border-gold-400 shadow-[0_0_30px_rgba(250,204,21,0.4)]'
                            : 'border-cream-400/20 group-hover:border-gold-400/50'
                        } transition-all duration-300`}
                      >
                        <Icon className={`w-7 h-7 md:w-9 md:h-9 ${value.color}`} />
                      </div>

                      {/* Connection Line to Center */}
                      <div
                        className={`absolute top-1/2 left-1/2 h-px origin-left transition-all duration-500 ${
                          hoveredValue === value.key ? 'w-16 md:w-20 bg-gold-400/60' : 'w-8 md:w-10 bg-cream-400/20'
                        }`}
                        style={{ transform: `rotate(${value.orbitAngle - 180}deg)` }}
                      />

                      {/* Expanded Card on Hover - centered to avoid overflow */}
                      {hoveredValue === value.key && (
                        <div
                          className="absolute z-40 w-48 md:w-56 p-3 md:p-4 glass-card rounded-xl animate-in fade-in zoom-in-95 duration-300 top-full left-1/2 -translate-x-1/2 mt-2 md:mt-3 pointer-events-none"
                        >
                          <h3 className={`text-sm md:text-base font-serif font-bold ${value.color} mb-1 text-center`}>
                            {t(`values.items.${value.key}.title`)}
                          </h3>
                          <p className="text-cream-200 font-sans text-xs leading-relaxed line-clamp-2 text-center">
                            {t(`values.items.${value.key}.description`)}
                          </p>
                        </div>
                      )}

                      {/* Label (always visible on mobile, on hover desktop) */}
                      <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis">
                        <span className={`text-xs font-sans font-semibold ${value.color}`}>
                          {t(`values.items.${value.key}.title`)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting Lines Between Values */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#facc15" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Lines connecting adjacent values */}
              {values.map((value, index) => {
                const nextValue = values[(index + 1) % values.length];
                const angle1 = (value.orbitAngle * Math.PI) / 180;
                const angle2 = (nextValue.orbitAngle * Math.PI) / 180;
                const radius = 35;

                const x1 = 50 + radius * Math.cos(angle1);
                const y1 = 50 + radius * Math.sin(angle1);
                const x2 = 50 + radius * Math.cos(angle2);
                const y2 = 50 + radius * Math.sin(angle2);

                return (
                  <line
                    key={`${value.key}-${nextValue.key}`}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Mobile Fallback - Grid */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-12 px-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.key}
                className="glass-card p-3 text-center overflow-hidden"
              >
                <div className={`w-10 h-10 mx-auto mb-2 rounded-full bg-white/5 flex items-center justify-center ${value.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-serif font-bold text-cream-100 mb-1 truncate px-1">
                  {t(`values.items.${value.key}.title`)}
                </h3>
                <p className="text-cream-200 font-sans text-xs leading-relaxed line-clamp-2 overflow-hidden px-1">
                  {t(`values.items.${value.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
