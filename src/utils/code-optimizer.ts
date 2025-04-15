
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
    const recentMetrics = this.metrics.slice(-7);
    const errorChecks = 10;

    // Run multiple error checks
    for (let i = 0; i < errorChecks; i++) {
      // Check load time trends
      const loadTimes = recentMetrics.filter(m => m.metric === 'loadTime');
      if (loadTimes.length >= 2) {
        const latest = loadTimes[loadTimes.length - 1].value;
        const average = loadTimes.reduce((acc, curr) => acc + curr.value, 0) / loadTimes.length;
        
        if (latest > average * 1.2) {
          suggestions.push(`Check ${i + 1}: Performance degradation detected (${Math.round(latest)}ms vs ${Math.round(average)}ms avg)`);
        }
      }

      // Check memory usage
      const memoryData = recentMetrics.filter(m => m.metric === 'memoryUsage');
      if (memoryData.length > 0) {
        const latestMemory = memoryData[memoryData.length - 1].value;
        if (latestMemory > 50 * 1024 * 1024) { // 50MB threshold
          suggestions.push(`Check ${i + 1}: High memory usage detected (${Math.round(latestMemory / 1024 / 1024)}MB)`);
        }
      }

      // Check resource count
      const resourceData = recentMetrics.filter(m => m.metric === 'resourceCount');
      if (resourceData.length > 0) {
        const latestCount = resourceData[resourceData.length - 1].value;
        if (latestCount > 50) {
          suggestions.push(`Check ${i + 1}: High resource count (${latestCount} resources)`);
        }
      }
    }

    return suggestions;
  }
}
