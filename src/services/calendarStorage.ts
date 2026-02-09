/**
 * Calendar Availability Management Service
 * Allows admin to control which dates are available for booking
 */

const STORAGE_KEY = 'mam_calendar';
const BOOKED_SLOTS_KEY = 'mam_booked_slots';

export interface DayConfig {
  date: string; // YYYY-MM-DD
  blocked: boolean;
  blockReason?: string;
  availableSlots?: string[]; // e.g., ["10:00", "14:00", "16:00"]
  capacity?: number; // max bookings per day
}

export interface BookedSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  bookingId: string;
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
 * Get available time slots for a date (excluding booked ones)
 */
export function getAvailableSlots(date: string): string[] {
  const config = getDayConfig(date);
  if (!config) return []; // No config = all slots available
  if (config.blocked) return [];

  const configuredSlots = config.availableSlots || [];
  if (configuredSlots.length === 0) return [];

  // Filter out already booked slots
  const bookedTimes = getBookedSlotsForDate(date);
  return configuredSlots.filter(slot => !bookedTimes.includes(slot));
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

// ==================== Booked Slots Management ====================

/**
 * Get all booked slots
 */
export function getAllBookedSlots(): BookedSlot[] {
  try {
    const stored = localStorage.getItem(BOOKED_SLOTS_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

/**
 * Get booked slots for a specific date
 */
export function getBookedSlotsForDate(date: string): string[] {
  const allBooked = getAllBookedSlots();
  return allBooked
    .filter(slot => slot.date === date)
    .map(slot => slot.time);
}

/**
 * Check if a specific time slot is already booked
 */
export function isSlotBooked(date: string, time: string): boolean {
  const bookedTimes = getBookedSlotsForDate(date);
  return bookedTimes.includes(time);
}

/**
 * Mark a time slot as booked
 */
export function bookTimeSlot(date: string, time: string, bookingId: string): void {
  const allBooked = getAllBookedSlots();

  // Check if already booked
  const alreadyBooked = allBooked.some(
    slot => slot.date === date && slot.time === time
  );

  if (alreadyBooked) {
    console.warn(`Slot ${date} at ${time} is already booked`);
    return;
  }

  allBooked.push({ date, time, bookingId });
  saveBookedSlots(allBooked);
  dispatchCalendarEvent();
}

/**
 * Release a booked slot (when booking is cancelled/deleted)
 */
export function releaseBookedSlot(date: string, time: string): void {
  const allBooked = getAllBookedSlots();
  const filtered = allBooked.filter(
    slot => !(slot.date === date && slot.time === time)
  );
  saveBookedSlots(filtered);
  dispatchCalendarEvent();
}

/**
 * Release all booked slots for a specific booking
 */
export function releaseBookedSlotsForBooking(bookingId: string): void {
  const allBooked = getAllBookedSlots();
  const filtered = allBooked.filter(slot => slot.bookingId !== bookingId);
  saveBookedSlots(filtered);
  dispatchCalendarEvent();
}

/**
 * Clear all booked slots
 */
export function clearAllBookedSlots(): void {
  localStorage.removeItem(BOOKED_SLOTS_KEY);
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
 * Save booked slots to localStorage
 */
function saveBookedSlots(slots: BookedSlot[]): void {
  try {
    localStorage.setItem(BOOKED_SLOTS_KEY, JSON.stringify(slots));
  } catch (error) {
    console.error('Error saving booked slots:', error);
  }
}

/**
 * Dispatch event for real-time updates
 */
function dispatchCalendarEvent(): void {
  window.dispatchEvent(new CustomEvent('calendarUpdated'));
}
