import posthog from 'posthog-js';

import { PROJECT_ENV } from '@/shared/constants';

const posthogKey = PROJECT_ENV.postHogKey;

posthog.init(posthogKey, {
  api_host: '/ingest',
  ui_host: PROJECT_ENV.postHogHost,
  // Enables capturing unhandled exceptions via Error Tracking
  capture_exceptions: true,
  // Turn on debug in development mode
  debug: PROJECT_ENV.isDevelopment,
  autocapture: false,
});

// IMPORTANT: Never combine this approach with other client-side PostHog initialization approaches,
// especially components like a PostHogProvider. instrumentation-client.ts is the correct solution
// for initializing client-side PostHog in Next.js 15.3+ apps.
