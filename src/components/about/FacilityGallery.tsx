import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Maximize2 } from 'lucide-react';

export const FacilityGallery = () => {
  const { t } = useTranslation('about');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const facilities = [
    { key: 'indoorArena', icon: '🏟️' },
    { key: 'outdoorTrails', icon: '🌄' },
    { key: 'lounge', icon: '☕' },
    { key: 'stables', icon: '🐴' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {facilities.map((facility, index) => (
        <div
          key={facility.key}
          className="group relative glass-card overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Background with icon */}
          <div className="aspect-video bg-gradient-to-br from-forest-900/50 to-saddle-900/50 flex items-center justify-center">
            <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
              {facility.icon}
            </span>
          </div>

          {/* Content Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/80 to-transparent transition-all duration-300 ${
            hoveredIndex === index ? 'opacity-100' : 'opacity-90'
          }`}>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-serif font-bold text-cream-100">
                  {t(`facility.items.${facility.key}.title`)}
                </h3>
                <Maximize2 className="w-5 h-5 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className={`text-cream-200 font-sans text-sm transition-all duration-300 ${
                hoveredIndex === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {t(`facility.items.${facility.key}.description`)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
