
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PerformanceData } from '@/hooks/useAnalytics';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface PerformanceMetricsProps {
  data: PerformanceData | null;
  isLoading: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="h-6 bg-gray-200 rounded w-3/4"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="h-2 bg-gray-100 rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No performance data available.</p>
        </CardContent>
      </Card>
    );
  }

  // Define performance thresholds
  const thresholds = {
    pageLoadTime: { good: 2, warning: 3 }, // seconds
    firstContentfulPaint: { good: 1, warning: 2 }, // seconds
    timeToInteractive: { good: 2.5, warning: 4 }, // seconds
    serverResponseTime: { good: 0.5, warning: 1 } // seconds
  };
  
  const getStatusForMetric = (metric: keyof typeof thresholds, value: number) => {
    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.warning) return 'warning';
    return 'poor';
  };
  
  const getProgressValue = (metric: keyof typeof thresholds, value: number) => {
    const maxValue = thresholds[metric].warning * 1.5;
    const invertedPercentage = 100 - ((value / maxValue) * 100);
    return Math.max(0, Math.min(100, invertedPercentage));
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'poor': return 'text-red-500';
      default: return '';
    }
  };
  
  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-amber-500';
      case 'poor': return 'bg-red-500';
      default: return '';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'poor': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const metrics = [
    { label: 'Page Load Time', value: data.pageLoadTime, unit: 's', metric: 'pageLoadTime' as const },
    { label: 'First Contentful Paint', value: data.firstContentfulPaint, unit: 's', metric: 'firstContentfulPaint' as const },
    { label: 'Time to Interactive', value: data.timeToInteractive, unit: 's', metric: 'timeToInteractive' as const },
    { label: 'Server Response Time', value: data.serverResponseTime, unit: 's', metric: 'serverResponseTime' as const },
    { label: 'Uptime', value: data.uptime, unit: '%' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((item, index) => {
          // Special case for Uptime which doesn't use the same logic
          if (item.label === 'Uptime') {
            const uptimeStatus = item.value >= 99.9 ? 'good' : (item.value >= 99 ? 'warning' : 'poor');
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(uptimeStatus)}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className={`${getStatusColor(uptimeStatus)} font-medium`}>
                    {item.value}{item.unit}
                  </span>
                </div>
                <Progress 
                  value={item.value} 
                  className="h-2" 
                  indicatorClassName={getProgressColor(uptimeStatus)}
                />
              </div>
            );
          }
          
          const status = getStatusForMetric(item.metric, item.value);
          const progressValue = getProgressValue(item.metric, item.value);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(status)}
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className={`${getStatusColor(status)} font-medium`}>
                  {item.value}{item.unit}
                </span>
              </div>
              <Progress 
                value={progressValue} 
                className="h-2" 
                indicatorClassName={getProgressColor(status)}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
