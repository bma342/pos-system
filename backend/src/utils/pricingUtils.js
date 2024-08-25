function roundToNext99(price) {
  if (typeof price !== 'number') {
    throw new Error('Price must be a number');
  }
  const roundedPrice = Math.ceil(price) - 0.01;
  return parseFloat(roundedPrice.toFixed(2));
}

// Function to calculate the uplifted price based on the percentage
function calculateUplift(price, upliftPercentage) {
  if (typeof price !== 'number' || typeof upliftPercentage !== 'number') {
    throw new Error('Price and uplift percentage must be numbers');
  }
  const upliftedPrice = price * (1 + upliftPercentage / 100);
  return parseFloat(upliftedPrice.toFixed(2));
}

// Function to apply rounding based on provider settings
function applyRoundingIfNeeded(price, roundingOption) {
  switch (roundingOption) {
    case '.99':
      return roundToNext99(price);
    case 'nearest':
      return Math.round(price * 100) / 100;
    default:
      return price;
  }
}

// Function to calculate provider-specific pricing uplifts with rounding options
function calculateProviderPricing(price, upliftPercentage, roundingOption) {
  let upliftedPrice = calculateUplift(price, upliftPercentage);
  return applyRoundingIfNeeded(upliftedPrice, roundingOption);
}

module.exports = {
  roundToNext99,
  calculateUplift,
  applyRoundingIfNeeded,
  calculateProviderPricing,
};

