import { BookingList } from '../../components/admin';
import { useTranslation } from 'react-i18next';

export const BookingsPage = () => {
  const { t } = useTranslation('admin');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-cream-100 mb-2">
          {t('bookings.title', 'Bookings')}
        </h1>
        <p className="text-cream-400 font-sans">
          {t('bookings.subtitle', 'Manage all your customer bookings')}
        </p>
      </div>

      <BookingList />
    </div>
  );
};
