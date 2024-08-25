const db = require('../models');

class LoyaltyService {
  // Calculate points based on the order total and program configuration
  async calculatePoints(orderTotal, clientId) {
    // Fetch loyalty program settings for the client
    const program = await db.Loyalty.findOne({ where: { clientId } });
    if (!program) throw new Error('Loyalty program not found');

    const pointsEarned = orderTotal * program.pointMultiplier;
    return Math.floor(pointsEarned);
  }

  // Check and update loyalty tier based on guest's accumulated points
  async updateLoyaltyTier(guestId) {
    const guest = await db.Guest.findByPk(guestId);
    if (!guest) throw new Error('Guest not found');

    const program = await db.Loyalty.findOne({ where: { clientId: guest.clientId } });
    if (!program) throw new Error('Loyalty program not found');

    const tiers = program.tiers.sort((a, b) => a.requiredPoints - b.requiredPoints);
    const currentTier = tiers.find(tier => guest.loyaltyPoints >= tier.requiredPoints);
    if (currentTier) guest.loyaltyTier = currentTier.name;

    await guest.save();
    return guest;
  }

  // Record a loyalty transaction
  async recordTransaction(guestId, points, type, description) {
    await db.LoyaltyTransaction.create({
      guestId,
      points,
      type, // 'earn' or 'redeem'
      description,
    });
  }
}

module.exports = new LoyaltyService();
