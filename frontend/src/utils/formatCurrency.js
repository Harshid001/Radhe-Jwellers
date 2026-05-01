/**
 * Format number as Indian Rupee (INR)
 * @param {number} amount 
 * @returns {string} formatted currency string
 */
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date string to local date
 * @param {string} dateString 
 * @returns {string} formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
