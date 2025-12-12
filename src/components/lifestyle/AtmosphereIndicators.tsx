import { Coffee, Moon, CloudSun, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'saddle' | 'forest' | 'gold';
}

const colorClasses = {
  saddle: 'border-saddle-500 text-saddle-600 dark:text-saddle-400',
  forest: 'border-forest-600 text-forest-700 dark:text-forest-400',
  gold: 'border-gold-500 text-gold-600 dark:text-gold-400',
};

const InfoCard = ({ icon: Icon, title, description, color }: InfoCardProps) => (
  <div className={`bg-cream-100 dark:bg-slate-700 border-l-4 ${colorClasses[color]} p-6 shadow-tactile`}>
    <div className="flex items-start gap-4">
      <Icon className="w-10 h-10 flex-shrink-0 text-gold-500" />
      <div>
        <h3 className={`font-serif font-bold text-lg mb-2 ${colorClasses[color]}`}>
          {title}
        </h3>
        <p className="text-slate-700 dark:text-cream-300 font-sans text-sm">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export const AtmosphereIndicators = () => {
  const { t } = useTranslation('lifestyle');
  
  return (
    <div className="space-y-4">
      <InfoCard
        icon={Coffee}
        title={t('atmosphere.indicators.coffeeLovers.label')}
        description={t('atmosphere.indicators.coffeeLovers.value')}
        color="saddle"
      />
      <InfoCard
        icon={Moon}
        title={t('atmosphere.indicators.nightOwls.label')}
        description={t('atmosphere.indicators.nightOwls.value')}
        color="forest"
      />
      <InfoCard
        icon={CloudSun}
        title={t('atmosphere.indicators.dayVisitors.label')}
        description={t('atmosphere.indicators.dayVisitors.value')}
        color="gold"
      />
    </div>
  );
};
