const { LoyaltyReward, Guest, Order } = require('../models');
const moment = require('moment-timezone');

/**
 * Calculate the loyalty tier based on a guest's order history.
 * @param {Guest} guest - The guest to calculate the tier for.
 * @returns {string} The loyalty tier (e.g., 'Silver', 'Gold').
 */
function calculateLoyaltyTier(guest) {
  const totalSpend = guest.totalSpend;
  if (totalSpend >= 1000) return 'Platinum';
  if (totalSpend >= 500) return 'Gold';
  return 'Silver';
}

/**
 * Apply loyalty rewards to an order.
 * @param {Order} order - The order to apply rewards to.
 * @param {number} guestId - The ID of the guest.
 * @returns {Order} The updated order with loyalty rewards applied.
 */
async function applyLoyaltyReward(order, guestId) {
  const wallet = await Wallet.findOne({ where: { guestId }, include: [LoyaltyReward] });
  if (!wallet) throw new Error('Wallet not found');

  const applicableRewards = wallet.LoyaltyRewards.filter(reward => {
    return (
      reward.status === 'active' &&
      reward.pointsRequired <= wallet.loyaltyPoints
    );
  });

  if (!applicableRewards.length) {
    return order; // No reward applicable
  }

  const rewardToApply = applicableRewards[0];
  wallet.loyaltyPoints -= rewardToApply.pointsRequired;

  await wallet.save();

  order.loyaltyPointsUsed = rewardToApply.pointsRequired;
  return order;
}

/**
 * Update a guest's loyalty progress after placing an order.
 * @param {Order} order - The order that was placed.
 * @param {number} guestId - The ID of the guest.
 */
async function updateLoyaltyProgress(order, guestId) {
  const guest = await Guest.findByPk(guestId);
  const pointsEarned = Math.floor(order.subtotal);

  guest.loyaltyPoints += pointsEarned;
  guest.totalSpend += order.subtotal;

  // Handle point expiration based on tier
  if (guest.loyaltyTier === 'Silver') {
    guest.loyaltyPoints = applyRollingExpiration(guest.loyaltyPoints, 30);
  } else if (guest.loyaltyTier === 'Platinum') {
    guest.loyaltyPoints = applyRollingExpiration(guest.loyaltyPoints, 90);
  }

  await guest.save();
}

/**
 * Apply rolling expiration logic for loyalty points.
 * @param {number} points - The guest's loyalty points.
 * @param {number} days - The number of days before points expire.
 * @returns {number} The updated points after applying expiration.
 */
function applyRollingExpiration(points, days) {
  const expirationDate = moment().subtract(days, 'days');
  return points > 0 ? Math.max(points - 10, 0) : 0;
}

module.exports = {
  calculateLoyaltyTier,
  applyLoyaltyReward,
  updateLoyaltyProgress,
};
