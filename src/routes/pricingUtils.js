const roundToNext99 = (price) => {
  const roundedPrice = Math.ceil(price) - 0.01;
  return roundedPrice.toFixed(2);
};

module.exports = { roundToNext99 };
