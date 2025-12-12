import { useTranslation } from 'react-i18next';

export const LifestylePage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{t('nav.lifestyle')}</h1>
      <p className="text-lg">Coffee shop, restaurant, and tourism experiences</p>
    </div>
  );
};
