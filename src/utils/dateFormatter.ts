/**
 * Format a date to abbreviated month, day, and year format
 * @param date - The date to format
 * @returns Formatted string (e.g., "Jan 15, 2026")
 */
export const formatDate = (date: Date): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

/**
 * Format amount with currency symbol
 * @param amount - The amount as a string or number
 * @param currency - The currency symbol (default: '$')
 * @returns Formatted string (e.g., "$50.00")
 */
export const formatCurrency = (amount: string | number, currency: string = '$'): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${currency}${numAmount.toFixed(2)}`;
};
