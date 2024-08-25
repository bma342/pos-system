/**
 * Utility functions for pricing-related operations.
 */

/**
 * Applies rounding logic to a price based on the provided options.
 * @param {number} price - The original price before rounding.
 * @param {Object} roundingOption - Rounding options.
 * @param {boolean} roundingOption.enabled - If rounding is enabled.
 * @param {string} roundingOption.type - Type of rounding: "up", "down", or "nearest".
 * @param {number} roundingOption.increment - The increment to round to (e.g., 0.05, 0.10, 0.99).
 * @returns {number} - The rounded price.
 */
function applyRoundingIfNeeded(price, roundingOption) {
  if (!roundingOption || !roundingOption.enabled) {
    return price; // Return the original price if rounding is disabled.
  }

  const { type, increment } = roundingOption;

  switch (type) {
    case 'up':
      return Math.ceil(price / increment) * increment;
    case 'down':
      return Math.floor(price / increment) * increment;
    case 'nearest':
    default:
      return Math.round(price / increment) * increment;
  }
}

module.exports = {
  applyRoundingIfNeeded,
};
