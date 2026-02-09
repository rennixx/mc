// Booking data structure for admin dashboard
export type ServiceType = 'safari' | 'academy' | 'private' | 'event';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
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
}

const STORAGE_KEY = 'mam_bookings';

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

  bookings[index] = { ...bookings[index], ...updates };
  saveBookings(bookings);

  return bookings[index];
}

/**
 * Update booking status
 */
export function updateBookingStatus(id: string, status: BookingStatus): Booking | null {
  return updateBooking(id, { status });
}

/**
 * Delete a booking
 */
export function deleteBooking(id: string): boolean {
  const bookings = getAllBookings();
  const filtered = bookings.filter(b => b.id !== id);

  if (filtered.length === bookings.length) {
    return false; // Booking not found
  }

  saveBookings(filtered);
  return true;
}

/**
 * Save bookings to localStorage
 */
function saveBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
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
 */
export function initializeSampleData(): void {
  const existing = getAllBookings();
  if (existing.length > 0) {
    return; // Already has data
  }

  const today = new Date();
  const sampleBookings: Omit<Booking, 'id' | 'createdAt' | 'status'>[] = [
    {
      service: 'safari',
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+964 750 123 4567',
      experienceLevel: 'beginner',
      groupSize: 2,
      specialRequests: 'Would like to take photos during the ride',
      date: formatDate(today),
      time: '10:00',
    },
    {
      service: 'academy',
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
      phone: '+964 750 987 6543',
      experienceLevel: 'novice',
      groupSize: 1,
      specialRequests: 'Private lesson preferred',
      date: formatDate(today),
      time: '14:00',
    },
    {
      service: 'private',
      name: 'Omar Ibrahim',
      email: 'omar@example.com',
      phone: '+964 770 555 1234',
      experienceLevel: 'intermediate',
      groupSize: 4,
      specialRequests: 'Family group, including children',
      date: formatDate(addDays(today, 1)),
      time: '08:00',
    },
    {
      service: 'safari',
      name: 'Layla Kareem',
      email: 'layla@example.com',
      phone: '+964 751 111 2233',
      experienceLevel: 'beginner',
      groupSize: 3,
      specialRequests: '',
      date: formatDate(addDays(today, 2)),
      time: '16:00',
    },
    {
      service: 'event',
      name: 'Ranya Mahmoud',
      email: 'ranya@example.com',
      phone: '+964 751 444 5566',
      experienceLevel: 'advanced',
      groupSize: 15,
      specialRequests: 'Corporate event, need catering options',
      date: formatDate(addDays(today, 3)),
      time: '10:00',
    },
  ];

  const bookings: Booking[] = sampleBookings.map((booking, index) => ({
    ...booking,
    id: `BK-${Date.now()}-${index}`,
    status: ['pending', 'confirmed', 'confirmed', 'pending', 'pending'][index] as BookingStatus,
    createdAt: new Date(Date.now() - index * 3600000).toISOString(),
  }));

  saveBookings(bookings);
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
