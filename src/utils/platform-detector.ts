
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
  
  return {
    os: result.os?.name || 'Unknown',
    browser: result.browser?.name || 'Unknown',
    device: result.device?.type || 'desktop',
    isMobile: /mobile|tablet|phone/i.test(result.device?.type || '') || window.innerWidth < 768,
    isBot: /bot|crawler|spider|crawling/i.test(navigator?.userAgent || ''),
    isDesktop: !(/mobile|tablet|phone/i.test(result.device?.type || '') || window.innerWidth < 768)
  } satisfies PlatformInfo;
}

export function isSecureContext(): boolean {
  return window.isSecureContext;
}

export function hasValidTouchSupport(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
