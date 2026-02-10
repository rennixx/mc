import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Ban } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isDateAvailable, getDayConfig, getBookedSlotsForDate } from '../../services/calendarStorage';

interface BookingCalendarProps {
  onDateSelect?: (date: Date) => void;
  onTimeSelect?: (time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
  readonly?: boolean; // If true, completely read-only (no selections, no time slots)
  allowTimeSelection?: boolean; // If true, allow time slot selection (default: !readonly)
  showSummary?: boolean; // If false, hide booking summary
}

export const BookingCalendar = ({
  onDateSelect,
  onTimeSelect,
  selectedDate,
  selectedTime,
  readonly = false,
  allowTimeSelection,
  showSummary = true
}: BookingCalendarProps) => {
  // Default allowTimeSelection to true when not readonly (for backwards compatibility)
  const canSelectTime = allowTimeSelection ?? !readonly;
  const { t, i18n } = useTranslation('components');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateConfigs, setDateConfigs] = useState<Record<string, any>>({});

  // Format date based on language
  const formatDate = (date: Date, lang: string): string => {
    const day = date.getDate();
    const year = date.getFullYear();
    const months: Record<string, string[]> = {
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      ku: ['کانوونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەمموز', 'ئاب', 'ئەیلول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم']
    };
    const weekDays: Record<string, string[]> = {
      en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      ku: ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'ھەینی', 'شەممە']
    };

    const monthIndex = date.getMonth();
    const dayIndex = date.getDay();
    const month = months[lang]?.[monthIndex] || months.en[monthIndex];
    const weekDay = weekDays[lang]?.[dayIndex] || weekDays.en[dayIndex];

    if (lang === 'ar') {
      return `${weekDay}، ${day} ${month} ${year}`;
    } else if (lang === 'ku') {
      return `${weekDay}، ${day}ی ${month}ی ${year}`;
    } else {
      return `${weekDay}, ${month} ${day}, ${year}`;
    }
  };

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

  // Get all time slots for selected date (including booked ones)
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];

    const dateStr = selectedDate.toISOString().split('T')[0];
    const config = getDayConfig(dateStr);

    // Get all configured slots for this date
    const configuredSlots = config?.availableSlots || [];

    // If no slots configured, return empty
    if (configuredSlots.length === 0) return [];

    // Get booked slots for this date
    const bookedTimes = getBookedSlotsForDate(dateStr);

    // Slot labels for translation - support various time formats
    const slotLabels: Record<string, string> = {
      '08:00': t('calendar.times.8am'),
      '09:00': t('calendar.times.9am', '9:00 AM'),
      '10:00': t('calendar.times.10am'),
      '11:00': t('calendar.times.11am', '11:00 AM'),
      '12:00': t('calendar.times.12pm'),
      '13:00': t('calendar.times.1pm', '1:00 PM'),
      '14:00': t('calendar.times.2pm'),
      '15:00': t('calendar.times.3pm', '3:00 PM'),
      '16:00': t('calendar.times.4pm'),
      '17:00': t('calendar.times.5pm', '5:00 PM'),
      '18:00': t('calendar.times.6pm'),
      '19:00': t('calendar.times.7pm', '7:00 PM'),
      '20:00': t('calendar.times.8pm', '8:00 PM'),
    };

    // Show all configured slots, but mark booked ones as unavailable
    return configuredSlots.map(time => ({
      time,
      label: slotLabels[time] || time,
      available: !bookedTimes.includes(time),
      booked: bookedTimes.includes(time),
    }));
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

            const disabled = readonly || isPast(date) || blocked;
            const selected = isSelected(date);
            const today = isToday(date);

            return (
              <button
                key={index}
                onClick={() => !disabled && onDateSelect?.(date)}
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
      {selectedDate && !readonly && (
        <div>
          <h4 className="text-lg font-sans font-bold text-cream-100 mb-4">
            {t('calendar.availableTimes')}
          </h4>
          {timeSlots.length === 0 ? (
            <div className="p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
              <p className="text-yellow-400 text-sm font-sans">
                {t('calendar.noSlotsAvailable', 'No time slots available for this date. Please select a different date.')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => canSelectTime && slot.available && onTimeSelect?.(slot.time)}
                  disabled={!slot.available || !canSelectTime}
                  className={`
                    px-4 py-3 font-sans font-semibold transition-all
                    ${slot.booked ? 'bg-red-500/10 text-red-400/70 cursor-not-allowed border border-red-400/30' : ''}
                    ${!slot.available && !slot.booked ? 'bg-cream-400/10 text-cream-400/50 cursor-not-allowed' : ''}
                    ${selectedTime === slot.time ? 'bg-gold-500 text-forest-900 cursor-default' : ''}
                    ${slot.available && selectedTime !== slot.time && !canSelectTime ? 'glass cursor-not-allowed text-cream-100' : ''}
                    ${slot.available && selectedTime !== slot.time && canSelectTime ? 'glass hover:bg-white/10 text-cream-100 cursor-pointer' : ''}
                  `}
                >
                  {slot.label}
                  {slot.booked && (
                    <span className="block text-xs mt-1">{t('calendar.booked', 'Booked')}</span>
                  )}
                  {!slot.available && !slot.booked && (
                    <span className="block text-xs mt-1">{t('calendar.full')}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected Summary */}
      {showSummary && canSelectTime && !readonly && selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-green-500/20 border border-green-400/50">
          <div className="flex items-center gap-2 text-green-400 font-sans font-semibold mb-2">
            <CalendarIcon className="w-5 h-5" />
            <span>{t('calendar.bookingSummary')}</span>
          </div>
          <p className="text-cream-100 font-sans">
            <span className="font-bold" dir={i18n.language === 'ar' || i18n.language === 'ku' ? 'rtl' : 'ltr'}>
              {formatDate(selectedDate, i18n.language)}
            </span>
            <br />
            {t('calendar.at')} <span className="font-bold">{timeSlots.find(s => s.time === selectedTime)?.label}</span>
          </p>
        </div>
      )}
    </div>
  );
};
