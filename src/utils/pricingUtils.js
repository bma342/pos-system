// Utility to round a price up to the next .99
function roundToNext99(price) {
  if (typeof price !== 'number') {
    throw new Error('Price must be a number');
  }
  const roundedPrice = Math.ceil(price) - 0.01;
  return parseFloat(roundedPrice.toFixed(2));
}

module.exports = {
  roundToNext99,
};
