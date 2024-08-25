const { Discount } = require('../models');

/**
 * Get applicable discounts for an order based on guest and location.
 * @param {Order} order - The order being placed.
 * @param {number} guestId - The ID of the guest placing the order.
 * @returns {Array<Discount>} An array of applicable discounts.
 */
async function getApplicableDiscounts(order, guestId) {
  const discounts = await Discount.findAll({
    where: {
      locationId: order.locationId,
      status: 'active',
    },
  });

  return discounts.filter(discount => discount.isApplicable(order, guestId));
}

/**
 * Apply the best discount to the order.
 * @param {Array<Discount>} discounts - The array of applicable discounts.
 * @param {Order} order - The order to apply the discount to.
 * @returns {Order} The updated order with the best discount applied.
 */
function applyBestDiscount(discounts, order) {
  if (discounts.length === 0) return order;

  const bestDiscount = discounts.reduce((prev, current) => (current.value > prev.value ? current : prev));
  order.discountApplied = bestDiscount.value;
  order.totalAmount -= bestDiscount.value;

  return order.save();
}

module.exports = {
  getApplicableDiscounts,
  applyBestDiscount,
};
