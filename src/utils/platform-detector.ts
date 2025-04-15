
import UAParser from 'ua-parser-js';

export interface PlatformInfo {
  os: string;
  browser: string;
  device: string;
  isMobile: boolean;
  isBot: boolean;
}

export function detectPlatform(): PlatformInfo {
  const parser = new UAParser();
  const result = parser.getResult();
  
  return {
    os: result.os?.name || 'Unknown',
    browser: result.browser?.name || 'Unknown',
    device: result.device?.type || 'desktop',
    isMobile: /mobile|tablet|phone/i.test(result.device?.type || '') || window.innerWidth < 768,
    isBot: /bot|crawler|spider|crawling/i.test(navigator?.userAgent || ''),
    isDesktop: !(/mobile|tablet|phone/i.test(result.device?.type || '') || window.innerWidth < 768)
  } as const;
}

export function isSecureContext(): boolean {
  return window.isSecureContext;
}

export function hasValidTouchSupport(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
