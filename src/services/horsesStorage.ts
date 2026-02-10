/**
 * Horses Management Service
 * Manages horse inventory, availability, and details
 */

const STORAGE_KEY = 'mam_horses';

export type Gender = 'male' | 'female' | 'stallion' | 'mare' | 'gelding';
export type ExperienceLevel = 'beginner' | 'novice' | 'intermediate' | 'advanced';

export interface Horse {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: Gender;
  color: string;
  description?: string;
  image?: string;
  available: boolean;
  unavailableReason?: string; // "sick", "injured", "resting", etc.
  suitableFor: ExperienceLevel[]; // Which experience levels this horse is suitable for
  maxWeight?: number; // Maximum rider weight in kg
}

/**
 * Generate a unique horse ID
 */
function generateId(): string {
  return `H-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Get all horses
 */
export function getAllHorses(): Horse[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const horses = JSON.parse(stored) as Horse[];
    // Sort by name
    return horses.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error reading horses from storage:', error);
    return [];
  }
}

/**
 * Get available horses only
 */
export function getAvailableHorses(): Horse[] {
  return getAllHorses().filter(h => h.available);
}

/**
 * Get a horse by ID
 */
export function getHorseById(id: string): Horse | null {
  const horses = getAllHorses();
  return horses.find(h => h.id === id) || null;
}

/**
 * Get horses suitable for a specific experience level
 */
export function getHorsesByExperienceLevel(level: ExperienceLevel): Horse[] {
  return getAvailableHorses().filter(h =>
    h.suitableFor.includes(level)
  );
}

/**
 * Add a new horse
 */
export function addHorse(horse: Omit<Horse, 'id'>): Horse {
  const newHorse: Horse = {
    ...horse,
    id: generateId(),
  };

  const horses = getAllHorses();
  horses.push(newHorse);
  saveHorses(horses);
  dispatchHorsesEvent();

  return newHorse;
}

/**
 * Update an existing horse
 */
export function updateHorse(id: string, updates: Partial<Horse>): Horse | null {
  const horses = getAllHorses();
  const index = horses.findIndex(h => h.id === id);

  if (index === -1) {
    return null;
  }

  horses[index] = { ...horses[index], ...updates };
  saveHorses(horses);
  dispatchHorsesEvent();

  return horses[index];
}

/**
 * Delete a horse
 */
export function deleteHorse(id: string): boolean {
  const horses = getAllHorses();
  const filtered = horses.filter(h => h.id !== id);

  if (filtered.length === horses.length) {
    return false; // Horse not found
  }

  saveHorses(filtered);
  dispatchHorsesEvent();
  return true;
}

/**
 * Toggle horse availability
 */
export function toggleHorseAvailability(id: string, unavailableReason?: string): Horse | null {
  const horses = getAllHorses();
  const horse = horses.find(h => h.id === id);

  if (!horse) {
    return null;
  }

  const newAvailable = !horse.available;
  return updateHorse(id, {
    available: newAvailable,
    unavailableReason: newAvailable ? undefined : (unavailableReason || 'Unavailable'),
  });
}

/**
 * Clear all horses
 */
export function clearAllHorses(): void {
  localStorage.removeItem(STORAGE_KEY);
  dispatchHorsesEvent();
}

/**
 * Save horses to localStorage
 */
function saveHorses(horses: Horse[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(horses));
  } catch (error) {
    console.error('Error saving horses to storage:', error);
  }
}

/**
 * Dispatch event for real-time updates
 */
function dispatchHorsesEvent(): void {
  window.dispatchEvent(new CustomEvent('horsesUpdated'));
}

/**
 * Initialize with sample horses
 */
export function initializeSampleHorses(): void {
  const existing = getAllHorses();
  if (existing.length > 0) return; // Don't overwrite existing data

  const sampleHorses: Omit<Horse, 'id'>[] = [
    {
      name: 'Spirit',
      breed: 'Arabian',
      age: 8,
      gender: 'stallion',
      color: 'White',
      available: true,
      suitableFor: ['beginner', 'novice', 'intermediate', 'advanced'],
      maxWeight: 90,
      image: '🐴',
    },
    {
      name: 'Thunder',
      breed: 'Andalusian',
      age: 12,
      gender: 'stallion',
      color: 'Gray',
      available: true,
      suitableFor: ['intermediate', 'advanced'],
      maxWeight: 100,
      image: '🐴',
    },
    {
      name: 'Shadow',
      breed: 'Friesian',
      age: 10,
      gender: 'stallion',
      color: 'Black',
      available: true,
      suitableFor: ['advanced'],
      maxWeight: 110,
      image: '🐴',
    },
    {
      name: 'Lucky',
      breed: 'Quarter Horse',
      age: 7,
      gender: 'mare',
      color: 'Palomino',
      available: true,
      suitableFor: ['beginner', 'novice', 'intermediate', 'advanced'],
      maxWeight: 95,
      image: '🐴',
    },
    {
      name: 'Dusty',
      breed: 'Paint Horse',
      age: 9,
      gender: 'gelding',
      color: 'Bay and White',
      available: true,
      suitableFor: ['beginner', 'novice'],
      maxWeight: 85,
      image: '🐴',
    },
  ];

  sampleHorses.forEach(horse => addHorse(horse));
}
