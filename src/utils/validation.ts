/**
 * Validation utilities for subscription form
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate amount field
 * @param amount - The amount string to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export const validateAmount = (amount: string): ValidationResult => {
  if (!amount || amount.trim() === '' || amount === '0') {
    return { isValid: false, error: 'Amount is required' };
  }

  const numAmount = parseFloat(amount);

  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Amount must be a valid number' };
  }

  if (numAmount <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }

  if (numAmount > 999999.99) {
    return { isValid: false, error: 'Amount is too large' };
  }

  return { isValid: true };
};

/**
 * Validate app selection
 * @param selectedApp - The selected app object
 * @returns ValidationResult with isValid flag and optional error message
 */
export const validateApp = (selectedApp: any): ValidationResult => {
  if (!selectedApp) {
    return { isValid: false, error: 'Please select an app' };
  }
  return { isValid: true };
};

/**
 * Validate category selection
 * @param selectedCategory - The selected category object
 * @returns ValidationResult with isValid flag and optional error message
 */
export const validateCategory = (selectedCategory: any): ValidationResult => {
  if (!selectedCategory) {
    return { isValid: false, error: 'Please select a category' };
  }
  return { isValid: true };
};

/**
 * Validate frequency selection
 * @param selectedFrequency - The selected frequency object
 * @returns ValidationResult with isValid flag and optional error message
 */
export const validateFrequency = (selectedFrequency: any): ValidationResult => {
  if (!selectedFrequency) {
    return { isValid: false, error: 'Please select a frequency' };
  }
  return { isValid: true };
};

/**
 * Validate the entire subscription form
 * @param formData - Object containing all form fields
 * @returns ValidationResult with isValid flag and optional error message
 */
export const validateSubscriptionForm = (formData: {
  selectedApp: any;
  amount: string;
  selectedCategory: any;
  selectedFrequency: any;
}): ValidationResult => {
  const appValidation = validateApp(formData.selectedApp);
  if (!appValidation.isValid) return appValidation;

  const amountValidation = validateAmount(formData.amount);
  if (!amountValidation.isValid) return amountValidation;

  const categoryValidation = validateCategory(formData.selectedCategory);
  if (!categoryValidation.isValid) return categoryValidation;

  const frequencyValidation = validateFrequency(formData.selectedFrequency);
  if (!frequencyValidation.isValid) return frequencyValidation;

  return { isValid: true };
};
