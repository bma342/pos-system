const { LoyaltyReward, Guest, Order, Wallet } = require('../models');
const moment = require('moment-timezone');

function calculateLoyaltyTier(guest) {
  const totalSpend = guest.totalSpend;
  if (totalSpend >= 1000) return 'Platinum';
  if (totalSpend >= 500) return 'Gold';
  return 'Silver';
}

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

  const expirationDate = moment().add(30, 'days');

  await wallet.save();

  order.loyaltyPointsUsed = rewardToApply.pointsRequired;
  order.rewardExpirationDate = expirationDate;
  return order;
}

async function updateLoyaltyProgress(order, guestId) {
  const guest = await Guest.findByPk(guestId);
  const pointsEarned = Math.floor(order.subtotal);

  guest.loyaltyPoints += pointsEarned;
  guest.totalSpend += order.subtotal;

  if (guest.loyaltyTier === 'Silver') {
    guest.loyaltyPoints = applyRollingExpiration(guest.loyaltyPoints, 30);
  } else if (guest.loyaltyTier === 'Platinum') {
    guest.loyaltyPoints = applyRollingExpiration(guest.loyaltyPoints, 90);
  }

  await guest.save();
}

function applyRollingExpiration(points, days) {
  const expirationDate = moment().subtract(days, 'days');
  const currentDate = moment();
  
  // Calculate the fraction of a year that has passed since the expiration date
  const yearFraction = currentDate.diff(expirationDate, 'days') / 365;
  
  // Expire points proportional to the time passed, with a maximum of the input points
  const expiredPoints = Math.min(points, Math.floor(points * yearFraction));
  
  return Math.max(points - expiredPoints, 0);
}

async function getOrderHistory(guestId) {
  return await Order.findAll({ where: { guestId } });
}

module.exports = {
  calculateLoyaltyTier,
  applyLoyaltyReward,
  updateLoyaltyProgress,
  getOrderHistory,
};
