// Equestrian Domain Types

export interface Horse {
  id: string;
  name: string;
  breed: string;
  age: number;
  imageUrl: string;
  description: string;
  available: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  specialization: string[];
  experience: number;
  imageUrl: string;
  bio: string;
}

export interface AcademyProgram {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
  description: string;
}

export interface SafariPackage {
  id: string;
  title: string;
  duration: string;
  groupSize: number;
  price: number;
  highlights: string[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  category: 'academy' | 'safari' | 'lifestyle' | 'events';
  title: string;
  date: string;
}

// UI Types
export type Language = 'en' | 'ar' | 'ku';
export type ThemeMode = 'light' | 'dark';
