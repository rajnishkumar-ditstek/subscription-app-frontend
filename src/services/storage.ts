import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SUBSCRIPTION: '@subscription_data',
} as const;

export interface SubscriptionData {
  isActive: boolean;
  selectedApp: {
    id: string;
    name: string;
    icon: number;
  } | null;
  amount: string;
  selectedCategory: {
    id: string;
    name: string;
    icon: number;
  } | null;
  startDate: string; // ISO string
  selectedFrequency: {
    id: string;
    name: string;
  } | null;
  selectedReminder: {
    id: string;
    name: string;
  } | null;
}

/**
 * Service for managing subscription data persistence using AsyncStorage
 */
class StorageService {
  /**
   * Save subscription data to AsyncStorage
   * @param data - The subscription data to save
   * @returns Promise<void>
   */
  async saveSubscription(data: SubscriptionData): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, jsonValue);
    } catch (error) {
      console.error('Error saving subscription:', error);
      throw new Error('Failed to save subscription data');
    }
  }

  /**
   * Load subscription data from AsyncStorage
   * @returns Promise<SubscriptionData | null>
   */
  async loadSubscription(): Promise<SubscriptionData | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.SUBSCRIPTION);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error loading subscription:', error);
      return null;
    }
  }

  /**
   * Delete subscription data from AsyncStorage
   * @returns Promise<void>
   */
  async deleteSubscription(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SUBSCRIPTION);
    } catch (error) {
      console.error('Error deleting subscription:', error);
      throw new Error('Failed to delete subscription data');
    }
  }

  /**
   * Clear all data from AsyncStorage (use with caution)
   * @returns Promise<void>
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  }
}

export const storageService = new StorageService();
