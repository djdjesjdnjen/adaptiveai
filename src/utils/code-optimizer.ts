
import { calculateABTestSignificance } from './ml-utils';

interface CodeMetric {
  metric: string;
  value: number;
  timestamp: Date;
}

interface ErrorCheck {
  type: string;
  threshold: number;
  check: (value: number) => boolean;
  message: (value: number, threshold: number) => string;
}

export class CodeOptimizer {
  private static metrics: CodeMetric[] = [];
  private static readonly MAX_CHECKS = 100;
  
  private static errorChecks: ErrorCheck[] = [
    {
      type: 'loadTime',
      threshold: 3000,
      check: (value) => value > 3000,
      message: (value, threshold) => `High load time detected (${Math.round(value)}ms vs ${threshold}ms threshold)`
    },
    {
      type: 'memoryUsage',
      threshold: 50 * 1024 * 1024,
      check: (value) => value > 50 * 1024 * 1024,
      message: (value, threshold) => `High memory usage (${Math.round(value / 1024 / 1024)}MB vs ${Math.round(threshold / 1024 / 1024)}MB threshold)`
    },
    {
      type: 'resourceCount',
      threshold: 50,
      check: (value) => value > 50,
      message: (value, threshold) => `Excessive resources (${value} vs ${threshold} threshold)`
    },
    {
      type: 'cpuUsage',
      threshold: 80,
      check: (value) => value > 80,
      message: (value, threshold) => `High CPU usage (${Math.round(value)}% vs ${threshold}% threshold)`
    },
    {
      type: 'errorRate',
      threshold: 1,
      check: (value) => value > 1,
      message: (value, threshold) => `High error rate (${value.toFixed(2)}% vs ${threshold}% threshold)`
    }
  ];

  static collectMetrics() {
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000); // Keep only last 1000 metrics
    }
    const loadTime = window.performance?.now?.() || 0;
    const resourceCount = performance.getEntriesByType('resource').length;
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;
    const cpuUsage = (performance as any).cpu?.usage || 0;
    const errorRate = (window as any).errorCount || 0;

    this.metrics.push(
      { metric: 'loadTime', value: loadTime, timestamp: new Date() },
      { metric: 'resourceCount', value: resourceCount, timestamp: new Date() },
      { metric: 'memoryUsage', value: memoryUsage, timestamp: new Date() },
      { metric: 'cpuUsage', value: cpuUsage, timestamp: new Date() },
      { metric: 'errorRate', value: errorRate, timestamp: new Date() }
    );

    return this.analyzeMetrics();
  }

  static analyzeMetrics() {
    const suggestions: string[] = [];
    const recentMetrics = this.metrics.slice(-7);

    for (let i = 0; i < this.MAX_CHECKS; i++) {
      this.errorChecks.forEach(check => {
        const metrics = recentMetrics.filter(m => m.metric === check.type);
        if (metrics.length > 0) {
          const latest = metrics[metrics.length - 1].value;
          if (check.check(latest)) {
            suggestions.push(`Check ${i + 1}: ${check.message(latest, check.threshold)}`);
          }
        }
      });

      // Trend analysis
      const loadTimes = recentMetrics.filter(m => m.metric === 'loadTime');
      if (loadTimes.length >= 2) {
        const latest = loadTimes[loadTimes.length - 1].value;
        const average = loadTimes.reduce((acc, curr) => acc + curr.value, 0) / loadTimes.length;
        
        if (latest > average * 1.2) {
          suggestions.push(`Check ${i + 1}: Performance degrading (${Math.round(latest)}ms vs ${Math.round(average)}ms avg)`);
        }
      }
    }

    return suggestions;
  }

  static getMetricStatus(metric: string): 'good' | 'warning' | 'critical' {
    const recentMetrics = this.metrics.filter(m => m.metric === metric);
    if (recentMetrics.length === 0) return 'good';
    
    const latest = recentMetrics[recentMetrics.length - 1].value;
    const check = this.errorChecks.find(c => c.type === metric);
    
    if (!check) return 'good';
    return check.check(latest) ? 'critical' : 'good';
  }
}
