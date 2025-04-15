import { useState, useEffect } from 'react';

// Types for our analytics data
export interface UserBehaviorData {
  pageViews: number;
  uniqueVisitors: number;
  averageSessionTime: number;
  bounceRate: number;
  conversionRate: number;
  clickHeatmap: Array<[number, number, number]>; // x, y, intensity
  topPages: Array<{page: string, visits: number}>;
  userJourney: Array<{from: string, to: string, count: number}>;
}

export interface PerformanceData {
  pageLoadTime: number;
  firstContentfulPaint: number;
  timeToInteractive: number;
  uptime: number;
  serverResponseTime: number;
}

// Mock data provider - in a real app, this would connect to your backend
const fetchAnalyticsData = (): Promise<UserBehaviorData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pageViews: 12458,
        uniqueVisitors: 4275,
        averageSessionTime: 124, // seconds
        bounceRate: 42.5, // percentage
        conversionRate: 3.8, // percentage
        clickHeatmap: [
          [100, 150, 80],
          [350, 120, 65],
          [220, 280, 95],
          [480, 220, 75],
          [150, 350, 85]
        ],
        topPages: [
          { page: '/products', visits: 3450 },
          { page: '/pricing', visits: 2800 },
          { page: '/blog', visits: 1950 },
          { page: '/contact', visits: 1240 },
          { page: '/about', visits: 1020 }
        ],
        userJourney: [
          { from: 'Home', to: 'Products', count: 1450 },
          { from: 'Products', to: 'Pricing', count: 980 },
          { from: 'Pricing', to: 'Checkout', count: 540 },
          { from: 'Home', to: 'Blog', count: 860 },
          { from: 'Blog', to: 'Products', count: 320 }
        ]
      });
    }, 800);
  });
};

const fetchPerformanceData = (): Promise<PerformanceData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pageLoadTime: 1.8, // seconds
        firstContentfulPaint: 0.9, // seconds
        timeToInteractive: 2.1, // seconds
        uptime: 99.95, // percentage
        serverResponseTime: 0.34 // seconds
      });
    }, 600);
  });
};

export const useAnalytics = () => {
  const [userBehaviorData, setUserBehaviorData] = useState<UserBehaviorData | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const behaviorData = await fetchAnalyticsData();
        const perfData = await fetchPerformanceData();
        if (mounted) {
          setUserBehaviorData(behaviorData);
          setPerformanceData(perfData);
        }
        setError(null);
      } catch (err) {
        if (mounted) {
          console.error('Error fetching analytics data:', err);
          setError('Failed to load analytics data');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    userBehaviorData,
    performanceData,
    isLoading,
    error
  };
};