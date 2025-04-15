
import { calculateABTestSignificance } from './ml-utils';

interface CodeMetric {
  metric: string;
  value: number;
  timestamp: Date;
}

export class CodeOptimizer {
  private static metrics: CodeMetric[] = [];

  static collectMetrics() {
    // Collect performance metrics
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    const resourceCount = performance.getEntriesByType('resource').length;
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;

    this.metrics.push(
      { metric: 'loadTime', value: loadTime, timestamp: new Date() },
      { metric: 'resourceCount', value: resourceCount, timestamp: new Date() },
      { metric: 'memoryUsage', value: memoryUsage, timestamp: new Date() }
    );

    return this.analyzeMetrics();
  }

  static analyzeMetrics() {
    const suggestions = [];
    const recentMetrics = this.metrics.slice(-7); // Last week's metrics

    // Analyze load time trends
    const loadTimes = recentMetrics.filter(m => m.metric === 'loadTime');
    if (loadTimes.length >= 2) {
      const latest = loadTimes[loadTimes.length - 1].value;
      const average = loadTimes.reduce((acc, curr) => acc + curr.value, 0) / loadTimes.length;
      
      if (latest > average * 1.2) {
        suggestions.push('Performance degradation detected. Consider code splitting or lazy loading.');
      }
    }

    return suggestions;
  }
}
