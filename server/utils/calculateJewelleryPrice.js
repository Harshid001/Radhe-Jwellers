/**
 * Calculate metal value based on weight, rate, and purity
 * @param {number} weight - Weight in grams
 * @param {number} rate - Rate per gram
 * @param {number} purityPercentage - Purity percentage (e.g., 91.67 for 22K)
 * @returns {number} Metal value
 */
const calculateMetalValue = (weight, rate, purityPercentage) => {
  return weight * rate * (purityPercentage / 100);
};

/**
 * Calculate final bill amount
 * @param {number} metalValue - Base metal value
 * @param {number} makingCharges - Making charges
 * @param {number} wastageCharges - Wastage charges
 * @param {number} gstPercentage - GST percentage
 * @returns {object} { subtotal, gstAmount, finalAmount }
 */
const calculateFinalBillAmount = (metalValue, makingCharges, wastageCharges, gstPercentage) => {
  const subtotal = metalValue + makingCharges + wastageCharges;
  const gstAmount = subtotal * (gstPercentage / 100);
  const finalAmount = subtotal + gstAmount;
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    gstAmount: Math.round(gstAmount * 100) / 100,
    finalAmount: Math.round(finalAmount * 100) / 100
  };
};

/**
 * Calculate loan amount based on ornament value and loan percentage
 * @param {number} ornamentValue - Estimated ornament value
 * @param {number} loanPercentage - Loan percentage (e.g., 75)
 * @returns {number} Loan amount
 */
const calculateLoanAmount = (ornamentValue, loanPercentage) => {
  return Math.round((ornamentValue * (loanPercentage / 100)) * 100) / 100;
};

/**
 * Calculate interest on loan
 * @param {number} loanAmount - Principal loan amount
 * @param {number} monthlyInterestRate - Monthly interest rate percentage
 * @param {number} durationMonths - Loan duration in months
 * @returns {number} Total interest
 */
const calculateInterest = (loanAmount, monthlyInterestRate, durationMonths) => {
  return Math.round((loanAmount * (monthlyInterestRate / 100) * durationMonths) * 100) / 100;
};

/**
 * Calculate final payable amount for loan
 * @param {number} loanAmount - Principal loan amount
 * @param {number} interest - Total interest
 * @param {number} penalty - Penalty amount
 * @returns {number} Final payable amount
 */
const calculateFinalPayable = (loanAmount, interest, penalty = 0) => {
  return Math.round((loanAmount + interest + penalty) * 100) / 100;
};

/**
 * Get purity percentage from purity string
 * @param {string} purity - Purity string (e.g., '24K', '22K', '999 Silver')
 * @returns {number} Purity percentage
 */
const getPurityPercentage = (purity) => {
  const purityMap = {
    '24K': 99.9,
    '22K': 91.67,
    '18K': 75.0,
    '14K': 58.33,
    '999 Silver': 99.9,
    '925 Silver': 92.5,
    '900 Silver': 90.0
  };
  return purityMap[purity] || 100;
};

module.exports = {
  calculateMetalValue,
  calculateFinalBillAmount,
  calculateLoanAmount,
  calculateInterest,
  calculateFinalPayable,
  getPurityPercentage
};
