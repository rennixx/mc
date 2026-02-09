// Google Places API types
export interface GoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

export interface GooglePlaceDetails {
  rating: number;
  reviews: GoogleReview[];
  user_ratings_total: number;
  formatted_address?: string;
  name?: string;
}

export interface PlaceDetailsResponse {
  html_attributions: string[];
  result: GooglePlaceDetails;
  status: string;
  error_message?: string;
}

// Testimonial type for our component
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image?: string;
  rating: number;
  text: string;
  date: string;
  authorUrl?: string;
  profilePhotoUrl?: string;
}

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;

/**
 * Fetches reviews from Google Places API
 * @returns Array of testimonials or empty array if fetch fails
 */
export async function fetchGoogleReviews(): Promise<Testimonial[]> {
  // Check if API key and place ID are configured
  if (!API_KEY || !PLACE_ID) {
    console.warn('Google Places API key or Place ID not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`
    );

    const data: PlaceDetailsResponse = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.error_message || data.status);
      return [];
    }

    // Transform Google reviews to our testimonial format
    const testimonials: Testimonial[] = data.result.reviews.map((review, index) => ({
      id: index + 1,
      name: review.author_name,
      role: 'Google Reviewer',
      image: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
      date: formatTimestamp(review.time),
      authorUrl: review.author_url,
      profilePhotoUrl: review.profile_photo_url,
    }));

    return testimonials;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return [];
  }
}

/**
 * Converts Unix timestamp to readable date string
 */
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));

  if (diffInMonths < 1) {
    return 'This month';
  } else if (diffInMonths === 1) {
    return 'Last month';
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  } else {
    const diffInYears = Math.floor(diffInMonths / 12);
    if (diffInYears === 1) {
      return 'Last year';
    }
    return `${diffInYears} years ago`;
  }
}

/**
 * Gets the Google Maps URL for the place
 */
export function getGoogleMapsUrl(): string {
  return `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;
}

/**
 * Fallback testimonials in case API fails or returns no reviews
 */
export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    role: 'Academy Student',
    rating: 5,
    text: 'MAM Center transformed my daughter from nervous to confident! The instructors are patient, professional, and truly care about each student. Highly recommend for kids!',
    date: 'December 2025'
  },
  {
    id: 2,
    name: 'Omar Hassan',
    role: 'Safari Experience',
    rating: 5,
    text: 'The mountain safari was breathtaking! Our guide was knowledgeable, the horses were well-trained, and the scenery was unforgettable. Perfect for photographers!',
    date: 'November 2025'
  },
  {
    id: 3,
    name: 'Layla Kareem',
    role: 'Coffee Shop Regular',
    rating: 5,
    text: 'Baran Coffee is my go-to spot for work. Amazing views, great coffee, and peaceful atmosphere. The lavender latte is a must-try!',
    date: 'December 2025'
  },
  {
    id: 4,
    name: 'Kamal Ibrahim',
    role: 'Event Host',
    rating: 5,
    text: 'Hosted our corporate event here. The facilities are top-notch, staff is professional, and our guests loved the unique equestrian experience!',
    date: 'October 2025'
  },
  {
    id: 5,
    name: 'Nadia Youssef',
    role: 'Private Lessons',
    rating: 5,
    text: 'As an adult beginner, I was hesitant. But the private lessons gave me confidence. Now I ride weekly! The instructors make it fun and safe.',
    date: 'November 2025'
  },
  {
    id: 6,
    name: 'Ranya Mahmoud',
    role: 'Family Safari',
    rating: 5,
    text: 'Took my whole family on the safari. From age 8 to 65, everyone had a blast! Well-organized and accommodating for different skill levels.',
    date: 'September 2025'
  }
];
