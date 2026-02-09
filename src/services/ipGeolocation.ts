/**
 * IP-based Geolocation Service
 * Uses free IP geolocation API to get user location without requiring permission
 * No API key needed - uses ipapi.co free tier (1000 requests/day)
 */

export interface LocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  org?: string;
}

/**
 * Get user location based on IP address
 * Works silently without user permission
 */
export async function getUserLocation(): Promise<LocationData | null> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout handling
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      console.warn('IP geolocation API returned non-OK status:', response.status);
      return null;
    }

    const data = await response.json();

    // Check if we got error response (e.g., rate limit)
    if (data.error) {
      console.warn('IP geolocation error:', data.reason);
      return null;
    }

    // Validate we have the required fields
    if (!data.lat || !data.lon || !data.city || !data.country_name) {
      console.warn('IP geolocation returned incomplete data');
      return null;
    }

    return {
      ip: data.ip || '',
      city: data.city || '',
      region: data.region || '',
      country: data.country_name || '',
      countryCode: data.country_code || '',
      latitude: parseFloat(data.lat),
      longitude: parseFloat(data.lon),
      org: data.org || data.asn || undefined,
    };
  } catch (error) {
    // Fail silently - booking should still work even if location fetch fails
    if ((error as Error).name === 'AbortError') {
      console.warn('IP geolocation request timed out');
    } else {
      console.warn('Failed to fetch IP geolocation:', error);
    }
    return null;
  }
}

/**
 * Get fallback location info from browser (timezone/locale)
 * This is much less accurate but doesn't require any API calls
 */
export function getBrowserLocationInfo() {
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: navigator.language,
    timeOffset: new Date().getTimezoneOffset(),
  };
}
