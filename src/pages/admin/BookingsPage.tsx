import { BookingList, BookingDetailModal } from '../../components/admin';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { type Booking } from '../../services';

export const BookingsPage = () => {
  const { t } = useTranslation('admin');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBooking(null);
  };

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

      <BookingList onView={handleViewBooking} />

      {/* Booking Detail Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
};

