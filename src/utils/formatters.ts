// Utility function to format dates based on locale
export const formatDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Format currency (useful for pricing)
export const formatCurrency = (amount: number, currency = 'IQD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Check if language is RTL
export const isRTLLanguage = (lang: string): boolean => {
  return ['ar', 'ku', 'fa', 'he'].includes(lang);
};
