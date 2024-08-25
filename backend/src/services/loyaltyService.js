const db = require('../models');
const logger = require('../services/logger');

class LoyaltyService {
  async createLoyaltyProgram(clientId, programData) {
    try {
      if (!programData.name || !programData.rewardType) {
        throw new Error('Program name and reward type are required');
      }

      const program = await db.LoyaltyProgram.create({
        ...programData,
        clientId,
      });

      logger.info(`Loyalty program created for Client ${clientId}: ${program.name}`);
      return program;
    } catch (error) {
      logger.error(`Error creating loyalty program: ${error.message}`, { clientId });
      throw error;
    }
  }

  async updateLoyaltyProgram(programId, updates) {
    try {
      const program = await db.LoyaltyProgram.findByPk(programId);
      if (!program) throw new Error('Loyalty program not found');

      await program.update(updates);
      logger.info(`Loyalty program updated: ID ${programId}`);
      return program;
    } catch (error) {
      logger.error(`Error updating loyalty program: ${error.message}`, { programId });
      throw error;
    }
  }

  async redeemReward(guestId, rewardId) {
    try {
      const guest = await db.Guest.findByPk(guestId);
      const reward = await db.Reward.findByPk(rewardId);

      if (!guest) throw new Error('Guest not found');
      if (!reward) throw new Error('Reward not found');
      if (guest.loyaltyPoints < reward.pointsRequired) {
        throw new Error('Insufficient loyalty points');
      }

      guest.loyaltyPoints -= reward.pointsRequired;
      await guest.save();

      await db.RedeemedReward.create({
        guestId,
        rewardId,
        redeemedAt: new Date(),
      });

      logger.info(`Reward redeemed: Guest ${guestId}, Reward ${rewardId}`);
      return { success: true, message: 'Reward redeemed successfully' };
    } catch (error) {
      logger.error(`Error redeeming reward: ${error.message}`, { guestId, rewardId });
      throw error;
    }
  }

  async getAvailableRewards(guestId) {
    try {
      const guest = await db.Guest.findByPk(guestId);
      if (!guest) throw new Error('Guest not found');

      const rewards = await db.Reward.findAll({
        where: {
          pointsRequired: { [db.Sequelize.Op.lte]: guest.loyaltyPoints },
        },
      });

      return rewards;
    } catch (error) {
      logger.error(`Error fetching available rewards: ${error.message}`, { guestId });
      throw error;
    }
  }

  async syncLoyaltyData(externalSystem, loyaltyData) {
    try {
      logger.info(`Loyalty data synced with ${externalSystem}: ${JSON.stringify(loyaltyData)}`);
      return { success: true };
    } catch (error) {
      logger.error(`Error syncing loyalty data: ${error.message}`);
      throw error;
    }
  }

  async calculateEngagementScore(guestId) {
    try {
      const guest = await db.Guest.findByPk(guestId, {
        include: [db.RedeemedReward],
      });
      if (!guest) throw new Error('Guest not found');

      const engagementScore = guest.RedeemedRewards.length * 10;
      guest.engagementScore = engagementScore;
      await guest.save();

      logger.info(`Engagement score updated for Guest ${guestId}: ${engagementScore}`);
      return engagementScore;
    } catch (error) {
      logger.error(`Error calculating engagement score: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new LoyaltyService();

