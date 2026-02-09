import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Ban } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isDateAvailable, getAvailableSlots, getDayConfig } from '../../services/calendarStorage';

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

export const BookingCalendar = ({ onDateSelect, onTimeSelect, selectedDate, selectedTime }: BookingCalendarProps) => {
  const { t, i18n } = useTranslation('components');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateConfigs, setDateConfigs] = useState<Record<string, any>>({});

  // Load calendar configs for current month
  useEffect(() => {
    const configs: Record<string, any> = {};
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const config = getDayConfig(dateStr);
      if (config) {
        configs[dateStr] = config;
      }
    }
    setDateConfigs(configs);
  }, [currentMonth]);

  // Listen for calendar updates
  useEffect(() => {
    const handleUpdate = () => {
      const configs: Record<string, any> = {};
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const config = getDayConfig(dateStr);
        if (config) {
          configs[dateStr] = config;
        }
      }
      setDateConfigs(configs);
    };
    window.addEventListener('calendarUpdated', handleUpdate);
    return () => window.removeEventListener('calendarUpdated', handleUpdate);
  }, [currentMonth]);

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];

    const dateStr = selectedDate.toISOString().split('T')[0];
    const availableSlots = getAvailableSlots(dateStr);

    if (availableSlots.length > 0) {
      // Only show configured slots
      const slotLabels: Record<string, string> = {
        '08:00': t('calendar.times.8am'),
        '10:00': t('calendar.times.10am'),
        '12:00': t('calendar.times.12pm'),
        '14:00': t('calendar.times.2pm'),
        '16:00': t('calendar.times.4pm'),
        '18:00': t('calendar.times.6pm'),
      };

      return availableSlots.map(time => ({
        time,
        label: slotLabels[time] || time,
        available: true,
      }));
    }

    // Default slots
    return [
      { time: '08:00', label: t('calendar.times.8am'), available: true },
      { time: '10:00', label: t('calendar.times.10am'), available: true },
      { time: '12:00', label: t('calendar.times.12pm'), available: false },
      { time: '14:00', label: t('calendar.times.2pm'), available: true },
      { time: '16:00', label: t('calendar.times.4pm'), available: true },
      { time: '18:00', label: t('calendar.times.6pm'), available: false },
    ];
  };

  const timeSlots = getAvailableTimeSlots();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const monthNames = [
    t('calendar.months.january'),
    t('calendar.months.february'),
    t('calendar.months.march'),
    t('calendar.months.april'),
    t('calendar.months.may'),
    t('calendar.months.june'),
    t('calendar.months.july'),
    t('calendar.months.august'),
    t('calendar.months.september'),
    t('calendar.months.october'),
    t('calendar.months.november'),
    t('calendar.months.december')
  ];
  const dayNames = [
    t('calendar.days.sun'),
    t('calendar.days.mon'),
    t('calendar.days.tue'),
    t('calendar.days.wed'),
    t('calendar.days.thu'),
    t('calendar.days.fri'),
    t('calendar.days.sat')
  ];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <CalendarIcon className="w-6 h-6 text-gold-400" />
        <h3 className="text-2xl font-serif font-bold text-cream-100">
          {t('calendar.title')}
        </h3>
      </div>

      {/* Calendar */}
      <div className="mb-8">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="glass p-2 hover:bg-white/10 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-cream-100" />
          </button>

          <h4 className="text-xl font-sans font-bold text-cream-100">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>

          <button
            onClick={nextMonth}
            className="glass p-2 hover:bg-white/10 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-cream-100" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-cream-300 font-sans text-sm font-semibold py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            if (!date) return <div key={index} className="aspect-square" />;

            const dateStr = date.toISOString().split('T')[0];
            const config = dateConfigs[dateStr];
            const blocked = config?.blocked || !isDateAvailable(dateStr);
            const hasLimitedSlots = config?.availableSlots?.length > 0;

            const disabled = isPast(date) || blocked;
            const selected = isSelected(date);
            const today = isToday(date);

            return (
              <button
                key={index}
                onClick={() => !disabled && onDateSelect(date)}
                disabled={disabled}
                className={`
                  aspect-square flex items-center justify-center font-sans text-sm transition-all relative
                  ${disabled ? 'text-cream-400/30 cursor-not-allowed' : 'text-cream-100 hover:bg-white/10 cursor-pointer'}
                  ${selected ? 'bg-gold-500 text-forest-900 font-bold' : ''}
                  ${today && !selected ? 'border border-gold-400' : ''}
                  ${!disabled && hasLimitedSlots ? 'bg-yellow-500/10 border border-yellow-400/30' : ''}
                `}
                title={blocked ? (config?.blockReason || 'Not available') : undefined}
              >
                {date.getDate()}
                {blocked && <Ban className="absolute top-1 right-1 w-3 h-3 text-red-400" />}
                {hasLimitedSlots && !blocked && <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h4 className="text-lg font-sans font-bold text-cream-100 mb-4">
            {t('calendar.availableTimes')}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && onTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`
                  px-4 py-3 font-sans font-semibold transition-all
                  ${!slot.available ? 'bg-cream-400/10 text-cream-400/50 cursor-not-allowed' : ''}
                  ${slot.available && selectedTime !== slot.time ? 'glass hover:bg-white/10 text-cream-100' : ''}
                  ${selectedTime === slot.time ? 'bg-gold-500 text-forest-900' : ''}
                `}
              >
                {slot.label}
                {!slot.available && (
                  <span className="block text-xs mt-1">{t('calendar.full')}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-green-500/20 border border-green-400/50">
          <div className="flex items-center gap-2 text-green-400 font-sans font-semibold mb-2">
            <CalendarIcon className="w-5 h-5" />
            <span>{t('calendar.bookingSummary')}</span>
          </div>
          <p className="text-cream-100 font-sans">
            <span className="font-bold">{selectedDate.toLocaleDateString(i18n.language === 'en' ? 'en-US' : i18n.language === 'ku' ? 'ku-IQ' : 'ar-IQ', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <br />
            {t('calendar.at')} <span className="font-bold">{timeSlots.find(s => s.time === selectedTime)?.label}</span>
          </p>
        </div>
      )}
    </div>
  );
};
