
// Track user click
export const trackClick = (x: number, y: number, element: string) => {
  console.log(`Click tracked at (${x}, ${y}) on ${element}`);
  // In a real implementation, this would send data to your analytics backend
};

// Track page view
export const trackPageView = (page: string) => {
  console.log(`Page view tracked: ${page}`);
  // In a real implementation, this would send data to your analytics backend
};

// Track user session time
export const startSessionTimer = (): (() => number) => {
  const startTime = new Date().getTime();
  
  return () => {
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000; // in seconds
    console.log(`Session duration: ${duration}s`);
    // In a real implementation, this would send data to your analytics backend
    return duration;
  };
};

// Track scroll depth
export const initScrollTracking = () => {
  let maxScroll = 0;
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);
    
    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;
      console.log(`Max scroll depth: ${maxScroll}%`);
      // In a real implementation, this would send data to your analytics backend
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
    return maxScroll;
  };
};

// Track feature usage
export const trackFeatureUsage = (feature: string, action: string, metadata?: Record<string, any>) => {
  console.log(`Feature usage: ${feature} - ${action}`, metadata || {});
  // In a real implementation, this would send data to your analytics backend
};

// Check if user has granted consent for analytics
export const hasAnalyticsConsent = (): boolean => {
  return localStorage.getItem('analyticsConsent') === 'true';
};

// Save user consent choice
export const saveAnalyticsConsent = (hasConsent: boolean): void => {
  localStorage.setItem('analyticsConsent', hasConsent ? 'true' : 'false');
};

// Initialize analytics tracking for a page
export const initPageAnalytics = (pageName: string): (() => void) => {
  // Track the page view
  trackPageView(pageName);
  
  // Start session timer
  const endSession = startSessionTimer();
  
  // Start scroll tracking
  const getScrollDepth = initScrollTracking();
  
  // Return cleanup function
  return () => {
    const sessionDuration = endSession();
    const maxScrollDepth = getScrollDepth();
    
    console.log(`Analytics summary for ${pageName}:`, {
      sessionDuration,
      maxScrollDepth
    });
    // In a real implementation, this would send final data to your analytics backend
  };
};
