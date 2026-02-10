// Booking data structure for admin dashboard
export type ServiceType = 'safari' | 'academy' | 'private' | 'event';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type BookingLocation = {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  org?: string;
}

export type Booking = {
  id: string;
  service: ServiceType;
  name: string;
  email: string;
  phone: string;
  experienceLevel: string;
  groupSize: number;
  specialRequests: string;
  date: string; // ISO date string YYYY-MM-DD
  time: string; // HH:MM format
  status: BookingStatus;
  createdAt: string; // ISO timestamp
  notes?: string; // Admin notes
  location?: BookingLocation; // IP-based location data
  horseIds?: string[]; // Selected horse IDs for this booking
}

const STORAGE_KEY = 'mam_bookings';

// Import calendar functions for slot management
import { bookTimeSlot, releaseBookedSlot, releaseBookedSlotsForBooking } from './calendarStorage';

/**
 * Generate a unique booking ID
 */
function generateId(): string {
  return `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Get all bookings from localStorage
 */
export function getAllBookings(): Booking[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const bookings = JSON.parse(stored) as Booking[];
    // Sort by date (newest first) and then by time
    return bookings.sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return b.time.localeCompare(a.time);
    });
  } catch (error) {
    console.error('Error reading bookings from storage:', error);
    return [];
  }
}

/**
 * Get bookings by status
 */
export function getBookingsByStatus(status: BookingStatus): Booking[] {
  return getAllBookings().filter(b => b.status === status);
}

/**
 * Get bookings for a specific date
 */
export function getBookingsByDate(date: string): Booking[] {
  return getAllBookings().filter(b => b.date === date);
}

/**
 * Get bookings for a date range
 */
export function getBookingsByDateRange(startDate: string, endDate: string): Booking[] {
  return getAllBookings().filter(b => b.date >= startDate && b.date <= endDate);
}

/**
 * Get a single booking by ID
 */
export function getBookingById(id: string): Booking | null {
  const bookings = getAllBookings();
  return bookings.find(b => b.id === id) || null;
}

/**
 * Add a new booking
 */
export function addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
  const newBooking: Booking = {
    ...booking,
    id: generateId(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const bookings = getAllBookings();
  bookings.push(newBooking);
  saveBookings(bookings);

  // Mark the time slot as booked
  bookTimeSlot(newBooking.date, newBooking.time, newBooking.id);

  return newBooking;
}

/**
 * Update an existing booking
 */
export function updateBooking(id: string, updates: Partial<Booking>): Booking | null {
  const bookings = getAllBookings();
  const index = bookings.findIndex(b => b.id === id);

  if (index === -1) {
    return null;
  }

  const oldBooking = bookings[index];
  const newBooking = { ...oldBooking, ...updates };

  // If date or time changed, release old slot and book new one
  if (updates.date || updates.time) {
    const oldDate = updates.date ? oldBooking.date : null;
    const oldTime = updates.time ? oldBooking.time : null;

    // Release the old slot if it changed
    if (oldDate || oldTime) {
      releaseBookedSlot(oldBooking.date, oldBooking.time);
    }

    // Book the new slot (use new values if provided, otherwise use old values)
    bookTimeSlot(newBooking.date, newBooking.time, newBooking.id);
  }

  bookings[index] = newBooking;
  saveBookings(bookings);

  return bookings[index];
}

/**
 * Update booking status
 * When cancelling, release the booked slot
 * When reactivating a cancelled booking, re-book the slot
 */
export function updateBookingStatus(id: string, status: BookingStatus): Booking | null {
  const bookings = getAllBookings();
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return null;
  }

  // If cancelling, release the slot
  if (status === 'cancelled' && booking.status !== 'cancelled') {
    releaseBookedSlot(booking.date, booking.time);
  }

  // If reactivating from cancelled, re-book the slot
  if (status !== 'cancelled' && booking.status === 'cancelled') {
    bookTimeSlot(booking.date, booking.time, booking.id);
  }

  return updateBooking(id, { status });
}

/**
 * Delete a booking
 */
export function deleteBooking(id: string): boolean {
  const bookings = getAllBookings();
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return false; // Booking not found
  }

  const filtered = bookings.filter(b => b.id !== id);
  saveBookings(filtered);

  // Release the booked slot
  releaseBookedSlotsForBooking(id);

  return true;
}

/**
 * Clear all bookings (useful for removing sample data)
 */
export function clearAllBookings(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Save bookings to localStorage
 */
function saveBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('bookingsUpdated', { detail: bookings }));
  } catch (error) {
    console.error('Error saving bookings to storage:', error);
  }
}

/**
 * Get booking statistics
 */
export function getBookingStats() {
  const bookings = getAllBookings();
  const today = new Date().toISOString().split('T')[0];
  const thisMonth = today.substring(0, 7); // YYYY-MM

  return {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    today: bookings.filter(b => b.date === today).length,
    thisMonth: bookings.filter(b => b.date.startsWith(thisMonth)).length,
  };
}

/**
 * Search bookings by name, email, or phone
 */
export function searchBookings(query: string): Booking[] {
  const lowerQuery = query.toLowerCase();
  return getAllBookings().filter(b =>
    b.name.toLowerCase().includes(lowerQuery) ||
    b.email.toLowerCase().includes(lowerQuery) ||
    b.phone.includes(lowerQuery) ||
    b.id.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Initialize with sample data if empty (for demo purposes)
 * Sample data removed - starts empty
 */
export function initializeSampleData(): void {
  // No sample data - starts with empty booking list
}
