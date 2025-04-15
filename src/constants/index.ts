
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  ANALYTICS: '/api/analytics',
  OPTIMIZATION: '/api/optimization'
} as const;

export const OPTIMIZATION_THRESHOLDS = {
  LOAD_TIME_MS: 3000,
  MEMORY_USAGE_MB: 50,
  MAX_RESOURCES: 50
} as const;

export const ANALYTICS_CONFIG = {
  SAMPLE_RATE: 0.1,
  BATCH_SIZE: 10,
  FLUSH_INTERVAL_MS: 5000
} as const;
