import { useTranslation } from 'react-i18next';

export const SafariPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{t('nav.safari')}</h1>
      <p className="text-lg">Safari packages and booking information</p>
    </div>
  );
};
