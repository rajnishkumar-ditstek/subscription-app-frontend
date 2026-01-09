/**
 * Analytics Service
 *
 * Placeholder for analytics tracking functionality.
 * Implement with your preferred analytics provider (Firebase, Amplitude, etc.)
 */

import { config } from '../config';

/**
 * Event names for tracking
 */
export const AnalyticsEvents = {
  // Screen views
  SCREEN_VIEW: 'screen_view',

  // Subscription actions
  SUBSCRIPTION_CREATED: 'subscription_created',
  SUBSCRIPTION_UPDATED: 'subscription_updated',
  SUBSCRIPTION_DELETED: 'subscription_deleted',

  // Modal interactions
  MODAL_OPENED: 'modal_opened',
  MODAL_CLOSED: 'modal_closed',

  // Form interactions
  AMOUNT_CHANGED: 'amount_changed',
  CATEGORY_SELECTED: 'category_selected',
  FREQUENCY_SELECTED: 'frequency_selected',
} as const;

/**
 * Event properties type
 */
type EventProperties = Record<string, string | number | boolean | null>;

/**
 * Analytics service class
 */
class AnalyticsService {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = config.analytics.enabled;
  }

  /**
   * Track a custom event
   *
   * @example
   * ```ts
   * analytics.trackEvent(AnalyticsEvents.SUBSCRIPTION_CREATED, {
   *   app: 'Netflix',
   *   amount: 15.99,
   *   frequency: 'Monthly'
   * });
   * ```
   */
  trackEvent(eventName: string, properties?: EventProperties): void {
    if (!this.isEnabled) {
      if (config.debug.enabled) {
        console.log('[Analytics] Event:', eventName, properties);
      }
      return;
    }

    // TODO: Implement your analytics provider here
    // Example implementations:

    // Firebase Analytics:
    // await analytics().logEvent(eventName, properties);

    // Amplitude:
    // Amplitude.getInstance().logEvent(eventName, properties);

    // Segment:
    // analytics.track(eventName, properties);
  }

  /**
   * Track a screen view
   *
   * @example
   * ```ts
   * analytics.trackScreen('EditSubscription');
   * ```
   */
  trackScreen(screenName: string, properties?: EventProperties): void {
    this.trackEvent(AnalyticsEvents.SCREEN_VIEW, {
      screen_name: screenName,
      ...properties,
    });
  }

  /**
   * Set user properties
   * Useful for tracking user segments
   */
  setUserProperties(properties: EventProperties): void {
    if (!this.isEnabled) {
      if (config.debug.enabled) {
        console.log('[Analytics] User Properties:', properties);
      }
      return;
    }

    // TODO: Implement user properties tracking
    // Example:
    // Amplitude.getInstance().setUserProperties(properties);
  }

  /**
   * Identify a user
   * Call this when user logs in or signs up
   */
  identifyUser(userId: string, traits?: EventProperties): void {
    if (!this.isEnabled) {
      if (config.debug.enabled) {
        console.log('[Analytics] Identify User:', userId, traits);
      }
      return;
    }

    // TODO: Implement user identification
    // Example:
    // analytics.identify(userId, traits);
  }

  /**
   * Reset analytics
   * Call this when user logs out
   */
  reset(): void {
    if (!this.isEnabled) {
      if (config.debug.enabled) {
        console.log('[Analytics] Reset');
      }
      return;
    }

    // TODO: Implement analytics reset
    // Example:
    // analytics.reset();
  }
}

/**
 * Singleton instance
 */
export const analytics = new AnalyticsService();

/**
 * Hook for using analytics in React components
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   useAnalyticsScreen('MyComponent');
 *
 *   const handlePress = () => {
 *     analytics.trackEvent(AnalyticsEvents.BUTTON_CLICKED, {
 *       button: 'save'
 *     });
 *   };
 *
 *   return <Button onPress={handlePress} />;
 * };
 * ```
 */
export const useAnalyticsScreen = (screenName: string) => {
  // Track screen view on component mount
  React.useEffect(() => {
    analytics.trackScreen(screenName);
  }, [screenName]);
};

// Note: Import React for the hook
import React from 'react';
