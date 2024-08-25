const { LoyaltyReward, Guest } = require('../models');
const loyaltyUtils = require('../utils/loyaltyUtils');

class LoyaltyService {
  static async getLoyaltyProgram(guestId) {
    const guest = await Guest.findByPk(guestId);
    return guest ? loyaltyUtils.calculateLoyaltyTier(guest) : null;
  }

  static async applyLoyaltyReward(order, guestId) {
    return await loyaltyUtils.applyLoyaltyReward(order, guestId);
  }

  static async updateLoyaltyProgress(order, guestId) {
    return await loyaltyUtils.updateLoyaltyProgress(order, guestId);
  }
}

module.exports = LoyaltyService;
