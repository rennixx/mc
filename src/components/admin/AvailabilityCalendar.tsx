import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Ban, Clock } from 'lucide-react';
import { getDayConfig, type DayConfig } from '../../services/calendarStorage';

interface AvailabilityCalendarProps {
  onDateSelect?: (date: string) => void;
  selectedDate?: string;
}

export const AvailabilityCalendar = ({ onDateSelect, selectedDate }: AvailabilityCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [configs, setConfigs] = useState<Record<string, DayConfig>>({});

  // Load configs
  const refreshConfigs = () => {
    const allConfigs: Record<string, DayConfig> = {};
    // Load configs for current month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const config = getDayConfig(dateStr);
      if (config) {
        allConfigs[dateStr] = config;
      }
    }
    setConfigs(allConfigs);
  };

  useEffect(() => {
    refreshConfigs();

    const handleUpdate = () => refreshConfigs();
    window.addEventListener('calendarUpdated', handleUpdate);
    return () => window.removeEventListener('calendarUpdated', handleUpdate);
  }, [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  }, [year, month, startDayOfWeek, daysInMonth]);

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

  const getDayStatus = (date: Date) => {
    const dateStr = formatDateKey(date);
    const config = configs[dateStr];
    if (config?.blocked) return 'blocked';
    if (config?.availableSlots?.length) return 'limited';
    return 'available';
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
    onDateSelect?.(dateKey);
  };

  return (
    <div className="admin-glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 bg-cream-400/5 hover:bg-white/10 text-cream-100 text-sm rounded-lg transition-colors"
          >
            Today
          </button>
          <button
            onClick={goToPreviousMonth}
            className="p-2 bg-cream-400/5 hover:bg-white/10 text-cream-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-4 py-1.5 bg-cream-400/5 text-cream-100 font-serif font-semibold min-w-[150px] text-center rounded-lg">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-2 bg-cream-400/5 hover:bg-white/10 text-cream-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-cream-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <span className="text-cream-300">Limited Slots</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <span className="text-cream-300">Blocked</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-cream-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const dateKey = formatDateKey(date);
          const status = getDayStatus(date);
          const statusClasses = {
            blocked: 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
            limited: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
            available: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
          };

          return (
            <button
              key={dateKey}
              onClick={() => handleDateClick(date)}
              className={`
                aspect-square p-1 rounded-lg font-sans text-sm transition-all relative
                ${isToday(date) ? 'ring-2 ring-gold-400' : ''}
                ${isSelected(date) ? 'bg-gold-400 text-forest-900' : ''}
                ${!isSelected(date) ? statusClasses[status] : 'text-cream-100'}
              `}
              title={dateKey}
            >
              <span className="font-medium">{date.getDate()}</span>
              {status === 'blocked' && (
                <Ban className="absolute top-0.5 right-0.5 w-3 h-3" />
              )}
              {status === 'limited' && (
                <Clock className="absolute top-0.5 right-0.5 w-3 h-3" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
