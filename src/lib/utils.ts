import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getReferrerInfo = () => {
  if (typeof window === 'undefined') return null;

  // Check URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  
  if (utmSource) {
    return utmSource;
  }

  // If no UTM source, check document.referrer
  if (document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      return referrerUrl.hostname;
    } catch (e) {
      console.error('Error parsing referrer URL:', e);
    }
  }

  return null;
};
