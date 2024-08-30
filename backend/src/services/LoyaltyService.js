const { LoyaltyReward, Guest } = require('../models');
const loyaltyUtils = require('../utils/loyaltyUtils');

class LoyaltyService {
  static async getLoyaltyProgram(guestId) {
    const guest = await Guest.findByPk(guestId);
    if (!guest) return null;
    
    // Check if the guest is eligible for any rewards
    const rewards = await LoyaltyReward.findAll({ where: { guestId } });
    if (rewards.length) {
      // Apply any rewards or return the current loyalty tier
      return loyaltyUtils.calculateLoyaltyTier(guest);
    }

    return null;
  }

  static async applyLoyaltyReward(order, guestId) {
    return await loyaltyUtils.applyLoyaltyReward(order, guestId);
  }

  static async updateLoyaltyProgress(order, guestId) {
    return await loyaltyUtils.updateLoyaltyProgress(order, guestId);
  }
}

module.exports = LoyaltyService;
