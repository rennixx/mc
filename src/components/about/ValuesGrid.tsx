import { useTranslation } from 'react-i18next';
import { Heart, Shield, Users, Leaf } from 'lucide-react';

export const ValuesGrid = () => {
  const { t } = useTranslation('about');

  const values = [
    {
      icon: Heart,
      key: 'horseWelfare',
      color: 'text-red-400',
    },
    {
      icon: Shield,
      key: 'confidence',
      color: 'text-blue-400',
    },
    {
      icon: Users,
      key: 'community',
      color: 'text-gold-400',
    },
    {
      icon: Leaf,
      key: 'nature',
      color: 'text-green-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {values.map((value) => {
        const Icon = value.icon;
        return (
          <div key={value.key} className="glass-card p-8 text-center hover:shadow-luxury transition-all duration-300 hover:-translate-y-1">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center ${value.color}`}>
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-cream-100 mb-3">
              {t(`values.items.${value.key}.title`)}
            </h3>
            <p className="text-cream-200 font-sans">
              {t(`values.items.${value.key}.description`)}
            </p>
          </div>
        );
      })}
    </div>
  );
};
