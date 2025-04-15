
import UAParser from 'ua-parser-js';

export interface PlatformInfo {
  os: string;
  browser: string;
  device: string;
  isMobile: boolean;
  isBot: boolean;
  isDesktop: boolean;
}

export function detectPlatform(): PlatformInfo {
  try {
    const parser = new UAParser();
    const result = parser.getResult();
    
    if (!result) {
      throw new Error('Failed to parse user agent');
    }

    const isMobileDevice = /mobile|tablet|phone/i.test(result.device?.type || '') || 
      (typeof window !== 'undefined' && window.innerWidth < 768);
    
    return {
      os: result.os?.name || 'Unknown',
      browser: result.browser?.name || 'Unknown',
      device: result.device?.type || 'desktop',
      isMobile: isMobileDevice,
      isBot: /bot|crawler|spider|crawling/i.test(navigator?.userAgent || ''),
      isDesktop: !isMobileDevice
    };
  } catch (error) {
    console.error('Platform detection error:', error);
    return {
      os: 'Unknown',
      browser: 'Unknown',
      device: 'desktop',
      isMobile: false,
      isBot: false,
      isDesktop: true
    };
  }
}

export function isSecureContext(): boolean {
  try {
    return window.isSecureContext;
  } catch {
    return false;
  }
}

export function hasValidTouchSupport(): boolean {
  try {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  } catch {
    return false;
  }
}
