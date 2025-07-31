/**
 * Utility functions for user activity tracking
 */

// Import UAParser directly to avoid dynamic import issues
import UAParser from 'ua-parser-js';

/**
 * Gets device information using UAParser
 */
export async function getDeviceInfo() {
  try {
    const parser = new UAParser();
    const result = parser.getResult();
    
    // Determine device type
    let deviceType = 'desktop';
    const device = result.device.type || '';
    
    if (device === 'mobile' || device === 'tablet') {
      deviceType = device;
    } else if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      deviceType = /iPad/i.test(navigator.userAgent) ? 'tablet' : 'mobile';
    }
    
    return {
      deviceType,
      deviceModel: result.device.model || result.device.vendor || 'unknown',
      os: `${result.os.name || 'unknown'} ${result.os.version || ''}`.trim(),
      browser: `${result.browser.name || 'unknown'} ${result.browser.version || ''}`.trim(),
    };
  } catch (error) {
    console.error('Error parsing user agent:', error);
    return {
      deviceType: 'unknown',
      deviceModel: 'unknown',
      os: 'unknown',
      browser: 'unknown'
    };
  }
}

/**
 * Gets the user's location information based on IP address
 * Uses the free ipapi.co service
 */
export async function getLocationData() {
  try {
    // Use ipapi.co for IP geolocation (free tier allows 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/');
    
    if (!response.ok) {
      throw new Error(`Error fetching location data: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      ip: data.ip,
      country: data.country_name,
      region: data.region,
      city: data.city,
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    
    // Fallback to a second service if the first fails
    try {
      const fallbackResponse = await fetch('https://ipinfo.io/json');
      
      if (!fallbackResponse.ok) {
        throw new Error(`Error fetching fallback location data: ${fallbackResponse.status}`);
      }
      
      const fallbackData = await fallbackResponse.json();
      
      // Format is slightly different for this API
      return {
        ip: fallbackData.ip,
        country: fallbackData.country,
        region: fallbackData.region,
        city: fallbackData.city,
      };
    } catch (fallbackError) {
      console.error('Error fetching fallback location data:', fallbackError);
      
      // Return empty data if both services fail
      return {
        ip: '',
        country: '',
        region: '',
        city: '',
      };
    }
  }
}

/**
 * Calculates time spent on page
 * @param startTime Page load timestamp
 * @returns Time in seconds
 */
export function getTimeSpent(startTime: number): number {
  return Math.round((Date.now() - startTime) / 1000);
}

/**
 * Extracts a clean page name from URL path
 * @param path Current URL path
 * @returns Clean page name
 */
export function getPageName(path: string): string {
  // Remove leading slash and query parameters
  let cleanPath = path.replace(/^\//, '').split('?')[0];
  
  // Use 'home' for root path
  if (cleanPath === '') {
    return 'home';
  }
  
  return cleanPath;
} 