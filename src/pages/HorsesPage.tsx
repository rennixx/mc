import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllHorses, initializeSampleHorses } from '../services';
import { HorseCard } from '../components/common/HorseCard';
import { SEOMeta } from '../components/common/SEOMeta';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

export const HorsesPage = () => {
  const { t } = useTranslation('horses');
  const [horses, setHorses] = useState(getAllHorses());

  useEffect(() => {
    // Initialize sample horses if empty
    initializeSampleHorses();

    const handleUpdate = () => {
      setHorses(getAllHorses());
    };
    window.addEventListener('horsesUpdated', handleUpdate);
    return () => window.removeEventListener('horsesUpdated', handleUpdate);
  }, []);

  return (
    <>
      <SEOMeta
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
      />

      <div className="min-h-screen pt-36 md:pt-44 pb-12 md:pb-16">
        <div className="container mx-auto px-3 md:px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-cream-100 mb-3 md:mb-4">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-cream-300 font-sans">
              {t('subtitle')}
            </p>
          </div>

          {/* Horses Grid */}
          {horses.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <p className="text-cream-300 font-sans text-sm md:text-base lg:text-lg">
                {t('noHorses')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
              {horses.map((horse) => (
                <HorseCard key={horse.id} horse={horse} />
              ))}
            </div>
          )}
        </div>
      </div>

      <WhatsAppButton />
    </>
  );
};
