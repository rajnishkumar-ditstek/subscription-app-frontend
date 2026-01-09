/**
 * Application Configuration
 *
 * Centralized configuration for environment variables and app settings.
 * Use .env file for sensitive values in production.
 */

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // In Expo, environment variables are accessed via process.env
  // For Expo managed workflow, you'll need expo-constants for runtime config
  return process.env[key] || defaultValue;
};

/**
 * Application environment configuration
 */
export const config = {
  /**
   * API Configuration
   */
  api: {
    url: getEnvVar('API_URL', 'https://api.example.com'),
    timeout: parseInt(getEnvVar('API_TIMEOUT', '30000'), 10),
  },

  /**
   * Analytics Configuration
   */
  analytics: {
    enabled: getEnvVar('ANALYTICS_ENABLED', 'false') === 'true',
    key: getEnvVar('ANALYTICS_KEY', ''),
  },

  /**
   * Feature Flags
   */
  features: {
    premiumFeatures: getEnvVar('ENABLE_PREMIUM_FEATURES', 'false') === 'true',
    socialSharing: getEnvVar('ENABLE_SOCIAL_SHARING', 'false') === 'true',
  },

  /**
   * App Configuration
   */
  app: {
    env: getEnvVar('APP_ENV', 'development'),
    version: getEnvVar('APP_VERSION', '1.0.0'),
  },

  /**
   * Debug Settings
   */
  debug: {
    enabled: getEnvVar('DEBUG_MODE', 'true') === 'true',
    showDevMenu: getEnvVar('SHOW_DEV_MENU', 'true') === 'true',
  },
} as const;

/**
 * Check if app is in development mode
 */
export const isDevelopment = () => config.app.env === 'development';

/**
 * Check if app is in production mode
 */
export const isProduction = () => config.app.env === 'production';

/**
 * Validate required environment variables
 * Call this at app startup to ensure critical config is present
 */
export const validateConfig = () => {
  const errors: string[] = [];

  // Add validation for required env vars here
  // Example:
  // if (!config.api.url) {
  //   errors.push('API_URL is required');
  // }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }

  return true;
};
