/**
 * Calendar Availability Management Service
 * Allows admin to control which dates are available for booking
 */

const STORAGE_KEY = 'mam_calendar';

export interface DayConfig {
  date: string; // YYYY-MM-DD
  blocked: boolean;
  blockReason?: string;
  availableSlots?: string[]; // e.g., ["10:00", "14:00", "16:00"]
  capacity?: number; // max bookings per day
}

/**
 * Get all calendar configurations
 */
export function getAllCalendarConfig(): Record<string, DayConfig> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {};
    }
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

/**
 * Get configuration for a specific date
 */
export function getDayConfig(date: string): DayConfig | null {
  const configs = getAllCalendarConfig();
  return configs[date] || null;
}

/**
 * Check if a date is available for booking
 */
export function isDateAvailable(date: string): boolean {
  const config = getDayConfig(date);
  if (!config) return true; // No config = available
  return !config.blocked;
}

/**
 * Check if a time slot is available on a specific date
 */
export function isTimeSlotAvailable(date: string, time: string): boolean {
  const config = getDayConfig(date);
  if (!config) return true;
  if (config.blocked) return false;
  if (config.availableSlots && config.availableSlots.length > 0) {
    return config.availableSlots.includes(time);
  }
  return true;
}

/**
 * Get available time slots for a date
 */
export function getAvailableSlots(date: string): string[] {
  const config = getDayConfig(date);
  if (!config) return []; // No config = all slots available
  if (config.blocked) return [];
  return config.availableSlots || [];
}

/**
 * Get remaining capacity for a date
 */
export function getRemainingCapacity(date: string): number | null {
  const config = getDayConfig(date);
  if (!config) return null; // No limit
  if (config.blocked) return 0;
  return config.capacity || null;
}

/**
 * Block a date
 */
export function blockDate(date: string, reason?: string): void {
  const configs = getAllCalendarConfig();
  configs[date] = {
    date,
    blocked: true,
    blockReason: reason,
  };
  saveCalendarConfigs(configs);
  dispatchCalendarEvent();
}

/**
 * Unblock a date
 */
export function unblockDate(date: string): void {
  const configs = getAllCalendarConfig();
  delete configs[date];
  saveCalendarConfigs(configs);
  dispatchCalendarEvent();
}

/**
 * Set available time slots for a date
 */
export function setAvailableSlots(date: string, slots: string[]): void {
  const configs = getAllCalendarConfig();
  const existing = configs[date] || { date, blocked: false };
  configs[date] = {
    ...existing,
    date,
    blocked: false,
    availableSlots: slots,
  };
  saveCalendarConfigs(configs);
  dispatchCalendarEvent();
}

/**
 * Set capacity limit for a date
 */
export function setCapacity(date: string, capacity: number): void {
  const configs = getAllCalendarConfig();
  const existing = configs[date] || { date, blocked: false };
  configs[date] = {
    ...existing,
    date,
    blocked: false,
    capacity,
  };
  saveCalendarConfigs(configs);
  dispatchCalendarEvent();
}

/**
 * Set full day configuration
 */
export function setDayConfig(config: DayConfig): void {
  const configs = getAllCalendarConfig();
  configs[config.date] = config;
  saveCalendarConfigs(configs);
  dispatchCalendarEvent();
}

/**
 * Block a date range
 */
export function blockDateRange(startDate: string, endDate: string, reason?: string): void {
  const configs = getAllCalendarConfig();
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    configs[dateStr] = {
      date: dateStr,
      blocked: true,
      blockReason: reason,
    };
  }
  saveCalendarConfigs(configs);
  dispatchCalendarEvent();
}

/**
 * Get all blocked dates in a range
 */
export function getBlockedDatesInRange(startDate: string, endDate: string): DayConfig[] {
  const configs = getAllCalendarConfig();
  const blocked: DayConfig[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (configs[dateStr]?.blocked) {
      blocked.push(configs[dateStr]);
    }
  }
  return blocked;
}

/**
 * Clear all calendar configurations
 */
export function clearAllCalendarConfigs(): void {
  localStorage.removeItem(STORAGE_KEY);
  dispatchCalendarEvent();
}

/**
 * Save calendar configurations to localStorage
 */
function saveCalendarConfigs(configs: Record<string, DayConfig>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
  } catch (error) {
    console.error('Error saving calendar configs:', error);
  }
}

/**
 * Dispatch event for real-time updates
 */
function dispatchCalendarEvent(): void {
  window.dispatchEvent(new CustomEvent('calendarUpdated'));
}
