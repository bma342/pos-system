const db = require('../models');
const LoyaltyService = require('../services/loyaltyService');
const logger = require('../services/logger');

// Fetch loyalty program details for a client
exports.getLoyaltyProgram = async (req, res) => {
  const { clientId } = req.params;

  try {
    const program = await LoyaltyService.getLoyaltyProgram(clientId);
    if (!program) {
      return res.status(404).json({ message: 'Loyalty program not found' });
    }
    res.status(200).json(program);
  } catch (error) {
    logger.error(`Error fetching loyalty program for client ${clientId}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching loyalty program', error: error.message });
  }
};

// Update loyalty program settings for a client
exports.updateLoyaltyProgram = async (req, res) => {
  const { clientId } = req.params;

  try {
    const updatedProgram = await LoyaltyService.updateLoyaltyProgram(clientId, req.body);
    res.status(200).json(updatedProgram);
  } catch (error) {
    logger.error(`Error updating loyalty program for client ${clientId}: ${error.message}`);
    res.status(500).json({ message: 'Error updating loyalty program', error: error.message });
  }
};

// Add or update a loyalty challenge
exports.upsertLoyaltyChallenge = async (req, res) => {
  try {
    const challenge = await LoyaltyService.upsertLoyaltyChallenge(req.body);
    res.status(challenge.created ? 201 : 200).json(challenge);
  } catch (error) {
    logger.error(`Error adding/updating loyalty challenge: ${error.message}`);
    res.status(500).json({ message: 'Error adding/updating loyalty challenge', error: error.message });
  }
};

// Delete a loyalty challenge
exports.deleteLoyaltyChallenge = async (req, res) => {
  try {
    await LoyaltyService.deleteLoyaltyChallenge(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting loyalty challenge: ${error.message}`);
    res.status(500).json({ message: 'Error deleting loyalty challenge', error: error.message });
  }
};

// Fetch available loyalty rewards for a guest
exports.getAvailableRewards = async (req, res) => {
  const { guestId } = req.params;

  try {
    const rewards = await LoyaltyService.getAvailableRewards(guestId);
    res.status(200).json(rewards);
  } catch (error) {
    logger.error(`Error fetching available rewards for guest ${guestId}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching available rewards', error: error.message });
  }
};

// Redeem a loyalty reward
exports.redeemReward = async (req, res) => {
  const { guestId, rewardId } = req.params;

  try {
    const result = await LoyaltyService.redeemReward(guestId, rewardId);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error redeeming reward for guest ${guestId}: ${error.message}`);
    res.status(500).json({ message: 'Error redeeming reward', error: error.message });
  }
};

// Sync loyalty data with an external system
exports.syncLoyaltyData = async (req, res) => {
  const { externalSystem } = req.body;

  try {
    const result = await LoyaltyService.syncLoyaltyData(externalSystem, req.body.loyaltyData);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error syncing loyalty data with ${externalSystem}: ${error.message}`);
    res.status(500).json({ message: 'Error syncing loyalty data', error: error.message });
  }
};

// Calculate engagement score for a guest
exports.calculateEngagementScore = async (req, res) => {
  const { guestId } = req.params;

  try {
    const engagementScore = await LoyaltyService.calculateEngagementScore(guestId);
    res.status(200).json({ engagementScore });
  } catch (error) {
    logger.error(`Error calculating engagement score for guest ${guestId}: ${error.message}`);
    res.status(500).json({ message: 'Error calculating engagement score', error: error.message });
  }
};

