import { Ban, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Horse, ExperienceLevel } from '../../services';

interface HorseCardProps {
  horse: Horse;
  selected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
  showWarningFor?: ExperienceLevel; // Show warning if horse not suitable for this level
}

export const HorseCard = ({ horse, selected = false, selectable = false, onClick, showWarningFor }: HorseCardProps) => {
  const { t } = useTranslation(['components', 'horses']);

  const isUnsuitable = showWarningFor && !horse.suitableFor.includes(showWarningFor);

  return (
    <button
      onClick={selectable ? onClick : undefined}
      disabled={selectable && !horse.available}
      className={`
        group relative w-full overflow-hidden transition-all duration-300
        ${selectable ? 'cursor-pointer' : 'cursor-default'}
        ${!selectable && !horse.available ? 'opacity-60' : ''}
        ${selected ? 'ring-2 ring-gold-400 scale-105' : 'hover:scale-105'}
        ${selectable && !horse.available ? 'cursor-not-allowed' : ''}
      `}
    >
      <div className="relative glass-card aspect-[3/4] flex flex-col">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-800/50 to-forest-900/80 z-0" />

        {/* Horse Image - Full portrait */}
        <div className="relative z-10 flex-1 flex items-center justify-center overflow-hidden">
          {horse.image ? (
            <img
              src={horse.image}
              alt={horse.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold-400/5 to-gold-400/10">
              <span className="text-6xl drop-shadow-2xl opacity-50">🐴</span>
            </div>
          )}
        </div>

        {/* Details Overlay - Shows on hover */}
        <div className="absolute inset-0 z-20 flex items-end justify-center px-4 py-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-forest-900/95 via-forest-900/70 to-transparent">
          <div className="w-full max-w-sm space-y-2 text-base text-center">
            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-cream-400/5 rounded-lg p-2 text-center">
                <span className="block text-cream-400 text-xs">{t('age', { ns: 'horses' })}</span>
                <span className="block text-cream-100 font-semibold">{horse.age}</span>
              </div>
              <div className="bg-cream-400/5 rounded-lg p-2 text-center">
                <span className="block text-cream-400 text-xs">{t('gender', { ns: 'horses' })}</span>
                <span className="block text-cream-100 font-semibold text-xs">{t(`genders.${horse.gender}`, { ns: 'horses' })}</span>
              </div>
            </div>

            {/* Color */}
            <div className="bg-cream-400/5 rounded-lg p-2 mb-2 text-center">
              <span className="text-cream-400 text-xs">{t('color', { ns: 'horses' })}: </span>
              <span className="text-cream-100 font-semibold">{horse.color}</span>
            </div>

            {/* Max Weight */}
            {horse.maxWeight && (
              <div className="bg-cream-400/5 rounded-lg p-2 mb-3 text-center">
                <span className="text-cream-400 text-xs">{t('maxWeight', { ns: 'horses' })}: </span>
                <span className="text-cream-100 font-semibold">{horse.maxWeight} kg</span>
              </div>
            )}

            {/* Suitable For Levels */}
            <div className="flex flex-wrap gap-1 justify-center">
              {horse.suitableFor.map((level) => (
                <span
                  key={level}
                  className="px-2 py-0.5 bg-gold-400/20 text-gold-300 text-xs font-sans rounded-full border border-gold-400/30"
                >
                  {t(`levels.${level}`, { ns: 'horses' })}
                </span>
              ))}
            </div>

            {/* Unsuitable Warning */}
            {isUnsuitable && (
              <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-400/30 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                  <p className="text-yellow-400 text-xs leading-snug">
                    {t('horses.unsuitableWarning', 'This horse may not be suitable for your experience level.')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Badges - Always visible */}
        {!horse.available && (
          <div className="absolute top-3 right-3 z-30">
            <div className="flex items-center gap-1 px-2 py-1 bg-red-500/90 text-white text-xs font-sans font-semibold rounded-full shadow-lg">
              <Ban className="w-3 h-3" />
              <span>{horse.unavailableReason || t('availability.unavailable', { ns: 'horses' })}</span>
            </div>
          </div>
        )}

        {selected && (
          <div className="absolute top-3 left-3 z-30">
            <div className="flex items-center gap-1 px-2 py-1 bg-gold-400 text-forest-900 text-xs font-sans font-bold rounded-full shadow-lg">
              <span className="text-green-600">✓</span>
              <span>{t('selected', { ns: 'components' })}</span>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};
