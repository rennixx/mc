import { useState, useEffect } from 'react';
import { Ban, Unlock, Clock, Users, Save, X } from 'lucide-react';
import { getDayConfig, setDayConfig, blockDate, unblockDate, setAvailableSlots, setCapacity, type DayConfig } from '../../services/calendarStorage';

interface DayConfigPanelProps {
  date: string;
  onClose: () => void;
}

export const DayConfigPanel = ({ date, onClose }: DayConfigPanelProps) => {
  const [config, setConfig] = useState<DayConfig | null>(null);
  const [blockReason, setBlockReason] = useState('');
  const [customSlots, setCustomSlots] = useState('');
  const [capacityLimit, setCapacityLimit] = useState<string>('');

  useEffect(() => {
    const dayConfig = getDayConfig(date);
    setConfig(dayConfig);
    setBlockReason(dayConfig?.blockReason || '');
    setCustomSlots(dayConfig?.availableSlots?.join(', ') || '');
    setCapacityLimit(dayConfig?.capacity?.toString() || '');
  }, [date]);

  if (!config) {
    // No config yet - date is fully available
    return (
      <div className="admin-glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-cream-100 font-sans">
            {date} - Fully Available
          </h3>
          <button
            onClick={onClose}
            className="text-cream-400 hover:text-cream-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-cream-400 text-sm mb-4">No restrictions set for this date.</p>

        <div className="flex gap-3">
          <button
            onClick={() => blockDate(date, 'Blocked by admin')}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg transition-colors"
          >
            <Ban className="w-4 h-4" />
            Block Date
          </button>

          <button
            onClick={() => {
              setAvailableSlots(date, ['10:00', '14:00', '16:00']);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30 rounded-lg transition-colors"
          >
            <Clock className="w-4 h-4" />
            Set Time Slots
          </button>

          <button
            onClick={() => {
              setCapacity(date, 5);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded-lg transition-colors"
          >
            <Users className="w-4 h-4" />
            Set Capacity
          </button>
        </div>
      </div>
    );
  }

  const handleUnblock = () => {
    unblockDate(date);
    onClose();
  };

  const handleBlock = () => {
    blockDate(date, blockReason || 'Blocked by admin');
    onClose();
  };

  const handleSaveSlots = () => {
    const slots = customSlots.split(',').map(s => s.trim()).filter(Boolean);
    const existing = getDayConfig(date);
    if (existing) {
      setDayConfig({
        ...existing,
        availableSlots: slots,
        blocked: false,
      });
    } else {
      setAvailableSlots(date, slots);
    }
    onClose();
  };

  const handleSaveCapacity = () => {
    const cap = parseInt(capacityLimit);
    if (!isNaN(cap) && cap > 0) {
      const existing = getDayConfig(date);
      if (existing) {
        setDayConfig({
          ...existing,
          capacity: cap,
          blocked: false,
        });
      } else {
        setCapacity(date, cap);
      }
      onClose();
    }
  };

  return (
    <div className="admin-glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cream-100 font-sans">
          {date} - {config.blocked ? 'Blocked' : 'Configured'}
        </h3>
        <button
          onClick={onClose}
          className="text-cream-400 hover:text-cream-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {config.blocked ? (
        <div>
          <p className="text-red-400 mb-2">
            <strong>Blocked:</strong> {config.blockReason || 'No reason provided'}
          </p>
          <button
            onClick={handleUnblock}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30 rounded-lg transition-colors"
          >
            <Unlock className="w-4 h-4" />
            Unblock Date
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Available Slots */}
          <div>
            <label className="flex items-center gap-2 text-cream-200 font-sans text-sm mb-2">
              <Clock className="w-4 h-4" />
              Available Time Slots
            </label>
            <input
              type="text"
              value={customSlots}
              onChange={(e) => setCustomSlots(e.target.value)}
              placeholder="e.g., 10:00, 14:00, 16:00"
              className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 rounded focus:outline-none focus:border-gold-400 text-sm"
            />
            <p className="text-xs text-cream-400 mt-1">
              Current: {config.availableSlots?.length ? config.availableSlots.join(', ') : 'All slots available'}
            </p>
            <button
              onClick={handleSaveSlots}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-gold-400/10 hover:bg-gold-400/20 text-gold-300 border border-gold-400/30 rounded-lg transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Slots
            </button>
          </div>

          {/* Capacity Limit */}
          <div>
            <label className="flex items-center gap-2 text-cream-200 font-sans text-sm mb-2">
              <Users className="w-4 h-4" />
              Daily Capacity
            </label>
            <input
              type="number"
              value={capacityLimit}
              onChange={(e) => setCapacityLimit(e.target.value)}
              placeholder="Max bookings per day"
              min="1"
              className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 rounded focus:outline-none focus:border-gold-400 text-sm"
            />
            <p className="text-xs text-cream-400 mt-1">
              Current: {config.capacity ? `${config.capacity} bookings max` : 'No limit'}
            </p>
            <button
              onClick={handleSaveCapacity}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-gold-400/10 hover:bg-gold-400/20 text-gold-300 border border-gold-400/30 rounded-lg transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Capacity
            </button>
          </div>

          {/* Block Button */}
          <div className="pt-4 border-t border-cream-400/10">
            <button
              onClick={handleBlock}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg transition-colors"
            >
              <Ban className="w-4 h-4" />
              Block This Date
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
