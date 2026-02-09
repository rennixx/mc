import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { getAllBookings, type Booking } from '../../services/bookingStorage';
import { StatusBadge } from '../../components/admin/StatusBadge';

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookings, setBookings] = useState(getAllBookings());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday

  // Auto-refresh when bookings change
  useEffect(() => {
    const handleUpdate = () => setBookings(getAllBookings());
    window.addEventListener('bookingsUpdated', handleUpdate);
    return () => window.removeEventListener('bookingsUpdated', handleUpdate);
  }, []);

  // Create a map of bookings by date
  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    bookings.forEach(booking => {
      const date = booking.date;
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date)!.push(booking);
    });
    return map;
  }, [bookings]);

  // Get days to display (including padding for start of month)
  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    // Add padding days for start of month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  }, [year, month, startDayOfWeek, daysInMonth]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return selectedDate === formatDateKey(date);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    const dateKey = formatDateKey(date);
    setSelectedDate(selectedDate === dateKey ? null : dateKey);
  };

  const selectedDateBookings = selectedDate
    ? bookingsByDate.get(selectedDate) || []
    : [];

  const getBookingCount = (date: Date) => {
    const dateKey = formatDateKey(date);
    return bookingsByDate.get(dateKey)?.length || 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-cream-100 mb-2">
            Booking Calendar
          </h1>
          <p className="text-cream-400 font-sans">
            View and manage bookings by date
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-4 py-2 admin-glass-card text-cream-100 font-sans text-sm hover:bg-white/10 transition-colors"
          >
            Today
          </button>
          <button
            onClick={goToPreviousMonth}
            className="p-2 admin-glass-card text-cream-100 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-4 py-2 admin-glass-card text-cream-100 font-serif font-semibold min-w-[150px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-2 admin-glass-card text-cream-100 hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="admin-glass-card p-6">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-cream-400 font-sans">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dateKey = formatDateKey(date);
                const bookingCount = getBookingCount(date);
                const hasBookings = bookingCount > 0;

                return (
                  <button
                    key={dateKey}
                    onClick={() => handleDateClick(date)}
                    className={`
                      aspect-square p-2 rounded-lg font-sans text-sm transition-all relative
                      ${isToday(date) ? 'ring-2 ring-gold-400' : ''}
                      ${isSelected(date) ? 'bg-gold-400 text-forest-900' : ''}
                      ${!isSelected(date) && hasBookings ? 'bg-cream-400/10 text-cream-100 hover:bg-cream-400/20' : ''}
                      ${!isSelected(date) && !hasBookings ? 'text-cream-400 hover:bg-cream-400/5' : ''}
                    `}
                  >
                    <span className="font-medium">{date.getDate()}</span>
                    {hasBookings && !isSelected(date) && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {Array.from({ length: Math.min(bookingCount, 3) }).map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected date details */}
        <div className="lg:col-span-1">
          <div className="admin-glass-card p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-cream-100 mb-4 font-sans">
              {selectedDate
                ? `Bookings for ${selectedDate}`
                : 'Select a date to view bookings'
              }
            </h3>

            {selectedDateBookings.length === 0 ? (
              <p className="text-cream-400 font-sans text-sm">
                {selectedDate ? 'No bookings for this date' : 'Click on a date to see details'}
              </p>
            ) : (
              <div className="space-y-3">
                {selectedDateBookings.map(booking => (
                  <div
                    key={booking.id}
                    className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-cream-100 font-sans">
                          {booking.time}
                        </p>
                        <p className="text-xs text-cream-400 font-sans">
                          {booking.name}
                        </p>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-cream-400 font-sans">
                      <Users className="w-3 h-3" />
                      {booking.groupSize} • {booking.service}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
