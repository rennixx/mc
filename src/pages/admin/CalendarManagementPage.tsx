import { useState } from 'react';
import { Calendar as CalendarIcon, Settings } from 'lucide-react';
import { AvailabilityCalendar, DayConfigPanel } from '../../components/admin';
import { getAllCalendarConfig } from '../../services/calendarStorage';

export const CalendarManagementPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, blocked: 0, configured: 0 });

  // Update stats when calendar changes
  const updateStats = () => {
    const configs = getAllCalendarConfig();
    const total = Object.keys(configs).length;
    const blocked = Object.values(configs).filter(c => c.blocked).length;
    const configured = Object.values(configs).filter(c => !c.blocked && (c.availableSlots?.length || c.capacity)).length;
    setStats({ total, blocked, configured });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleClosePanel = () => {
    setSelectedDate(null);
    updateStats();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="admin-glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon className="w-8 h-8 text-gold-400" />
          <div>
            <h1 className="text-2xl font-serif font-bold text-cream-100">
              Availability Calendar
            </h1>
            <p className="text-sm text-cream-400">
              Manage booking availability, block dates, and set capacity limits
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="admin-glass-card p-4 text-center">
          <p className="text-2xl font-bold text-cream-100">{stats.total}</p>
          <p className="text-sm text-cream-400">Configured Days</p>
        </div>
        <div className="admin-glass-card p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{stats.blocked}</p>
          <p className="text-sm text-cream-400">Blocked Days</p>
        </div>
        <div className="admin-glass-card p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{stats.configured}</p>
          <p className="text-sm text-cream-400">Limited Availability</p>
        </div>
      </div>

      {/* Calendar and Panel */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <AvailabilityCalendar
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate || undefined}
          />
        </div>

        {/* Day Config Panel */}
        <div className="lg:col-span-1">
          {selectedDate ? (
            <DayConfigPanel
              date={selectedDate}
              onClose={handleClosePanel}
            />
          ) : (
            <div className="admin-glass-card p-6">
              <div className="text-center py-12">
                <Settings className="w-12 h-12 text-cream-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-cream-100 mb-2">
                  Select a Date
                </h3>
                <p className="text-sm text-cream-400">
                  Click on any date in the calendar to configure its availability
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-glass-card p-6">
        <h3 className="text-lg font-semibold text-cream-100 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              if (confirm('Clear all calendar configurations?')) {
                // Import and call clearAllCalendarConfigs
                import('../../services/calendarStorage').then(m => {
                  m.clearAllCalendarConfigs();
                  setSelectedDate(null);
                  updateStats();
                });
              }
            }}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg transition-colors text-sm"
          >
            Clear All Configurations
          </button>
        </div>
      </div>
    </div>
  );
};
