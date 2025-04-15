
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

// Check if user has granted consent for analytics
export const hasAnalyticsConsent = (): boolean => {
  return localStorage.getItem('analyticsConsent') === 'true';
};

// Save user consent choice
export const saveAnalyticsConsent = (hasConsent: boolean): void => {
  localStorage.setItem('analyticsConsent', hasConsent ? 'true' : 'false');
};
