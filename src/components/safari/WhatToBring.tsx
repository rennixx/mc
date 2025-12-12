import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Backpack } from 'lucide-react';

interface ChecklistItem {
  key: string;
  category: 'essential' | 'optional';
}

const items: ChecklistItem[] = [
  { key: 'closedShoes', category: 'essential' },
  { key: 'sunscreenHat', category: 'essential' },
  { key: 'waterBottle', category: 'essential' },
  { key: 'longPants', category: 'essential' },
  { key: 'camera', category: 'optional' },
  { key: 'jacket', category: 'optional' },
  { key: 'sunglasses', category: 'optional' },
  { key: 'repellent', category: 'optional' },
];

export const WhatToBring = () => {
  const { t } = useTranslation('safari');
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    // Stop pulse animation after 3 seconds
    const timer = setTimeout(() => setShowPulse(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const essentialItems = items.filter(item => item.category === 'essential');
  const optionalItems = items.filter(item => item.category === 'optional');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-cream-200 dark:bg-slate-800 border-2 ${
          showPulse ? 'border-gold-500 animate-pulse' : 'border-forest-600 dark:border-forest-500'
        } p-6 flex items-center justify-between shadow-tactile hover:shadow-tactile-hover transition-all duration-300`}
      >
        <div className="flex items-center gap-4">
          <Backpack className="w-8 h-8 text-gold-500" />
          <span className="text-xl font-serif font-bold text-forest-700 dark:text-cream-200">
            {t('bring.title')}
          </span>
        </div>
        <svg
          className={`w-6 h-6 text-forest-600 dark:text-gold-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-cream-100 dark:bg-slate-700 p-8 shadow-tactile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Essential Items */}
            <div>
              <h3 className="text-lg font-serif font-bold text-forest-700 dark:text-cream-200 mb-4 flex items-center gap-2">
                <span className="text-action-500">★</span> {t('bring.essential')}
              </h3>
              <ul className="space-y-3">
                {essentialItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-forest-600 dark:text-gold-500 text-xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-slate-700 dark:text-cream-300 font-sans">
                      {t(`bring.items.${item.key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional Items */}
            <div>
              <h3 className="text-lg font-serif font-bold text-forest-700 dark:text-cream-200 mb-4 flex items-center gap-2">
                <span className="text-gold-500">◆</span> {t('bring.optional')}
              </h3>
              <ul className="space-y-3">
                {optionalItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-forest-600 dark:text-gold-500 text-xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-slate-700 dark:text-cream-300 font-sans">
                      {t(`bring.items.${item.key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Print/Copy Hint */}
          <div className="mt-6 pt-6 border-t border-slate-300 dark:border-slate-600 text-center">
            <p className="text-sm text-slate-600 dark:text-cream-400 font-sans">
              {t('bring.tip')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
