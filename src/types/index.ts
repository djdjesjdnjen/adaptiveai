
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface AnalyticsEvent {
  type: string;
  timestamp: Date;
  userId?: string;
  data: Record<string, any>;
}

export interface OptimizationMetric {
  name: string;
  value: number;
  timestamp: Date;
  context?: Record<string, any>;
}
