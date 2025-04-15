
import { AnalyticsEvent } from '@/types';
import { ANALYTICS_CONFIG } from '@/constants';

class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  track(event: Omit<AnalyticsEvent, 'timestamp'>) {
    this.events.push({
      ...event,
      timestamp: new Date()
    });

    if (this.events.length >= ANALYTICS_CONFIG.BATCH_SIZE) {
      this.flush();
    }
  }

  private flush() {
    // Implementation for sending events to backend
    const eventsToSend = [...this.events];
    this.events = [];
    console.log('Flushing events:', eventsToSend);
  }
}

export const analyticsService = new AnalyticsService();
