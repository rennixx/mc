import { useState } from 'react';
import { Clock, Footprints, Target, Mountain, User, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type DifficultyLevel = 'beginner' | 'advanced';

interface DifficultyInfo {
  duration: string;
  pace: string;
  skill: string;
  highlight: string;
}

interface InfoCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

const InfoCard = ({ icon: Icon, label, value }: InfoCardProps) => (
  <div className="bg-cream-100 dark:bg-slate-700 p-6 shadow-tactile">
    <div className="flex items-start gap-4">
      <Icon className="w-8 h-8 text-gold-500 flex-shrink-0" />
      <div>
        <div className="text-sm font-sans font-medium text-slate-500 dark:text-cream-400 mb-1">
          {label}
        </div>
        <div className="text-base font-sans text-forest-700 dark:text-cream-200">
          {value}
        </div>
      </div>
    </div>
  </div>
);

export const DifficultyToggle = () => {
  const { t } = useTranslation('safari');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('beginner');
  
  const difficultyData: Record<DifficultyLevel, DifficultyInfo> = {
    beginner: {
      duration: t('difficulty.beginner.duration'),
      pace: t('difficulty.beginner.pace'),
      skill: t('difficulty.beginner.skill'),
      highlight: t('difficulty.beginner.highlight'),
    },
    advanced: {
      duration: t('difficulty.advanced.duration'),
      pace: t('difficulty.advanced.pace'),
      skill: t('difficulty.advanced.skill'),
      highlight: t('difficulty.advanced.highlight'),
    },
  };
  
  const info = difficultyData[difficulty];

  return (
    <div className="space-y-8">
      {/* Toggle Buttons */}
      <div className="flex justify-center">
        <div className="inline-flex bg-cream-200 dark:bg-slate-800 p-1 shadow-tactile">
          <button
            onClick={() => setDifficulty('beginner')}
            className={`px-8 py-3 font-sans font-semibold transition-all duration-300 flex items-center gap-2 ${
              difficulty === 'beginner'
                ? 'bg-forest-600 text-cream-200 shadow-tactile'
                : 'bg-transparent text-slate-600 dark:text-cream-400 hover:text-forest-600'
            }`}
          >
            <User className="w-5 h-5" />
            {t('route.difficulty.beginner')}
          </button>
          <button
            onClick={() => setDifficulty('advanced')}
            className={`px-8 py-3 font-sans font-semibold transition-all duration-300 flex items-center gap-2 ${
              difficulty === 'advanced'
                ? 'bg-forest-600 text-cream-200 shadow-tactile'
                : 'bg-transparent text-slate-600 dark:text-cream-400 hover:text-forest-600'
            }`}
          >
            <Zap className="w-5 h-5" />
            {t('route.difficulty.advanced')}
          </button>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <InfoCard icon={Clock} label={t('difficulty.labels.duration')} value={info.duration} />
        <InfoCard icon={Footprints} label={t('difficulty.labels.pace')} value={info.pace} />
        <InfoCard icon={Target} label={t('difficulty.labels.skill')} value={info.skill} />
        <InfoCard icon={Mountain} label={t('difficulty.labels.highlight')} value={info.highlight} />
      </div>
    </div>
  );
};
