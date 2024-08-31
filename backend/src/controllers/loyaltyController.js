const LoyaltyReward = require('../models/LoyaltyReward');
const Wallet = require('../models/Wallet');
const moment = require('moment');
const Guest = require('../models/Guest');
const loyaltyService = require('../services/loyaltyService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.applyLoyaltyReward = async (req, res) => {
  try {
    const { orderId, loyaltyRewardId } = req.body;
    const reward = await LoyaltyReward.findByPk(loyaltyRewardId);
    const wallet = await Wallet.findOne({ where: { guestId: req.user.id } });

    if (!reward || reward.walletId !== wallet.id) {
      return res.status(400).json({ message: 'Loyalty reward not available.' });
    }

    const now = new Date();
    if (reward.expirationDate && now > reward.expirationDate) {
      return res.status(400).json({ message: 'This reward has expired.' });
    }

    if (reward.cooldownPeriod) {
      const lastUsed = reward.lastUsedAt;
      if (lastUsed && now - lastUsed < reward.cooldownPeriod * 60 * 60 * 1000) {
        return res.status(400).json({ message: `This reward is on cooldown. Try again later.` });
      }
    }

    // Apply reward logic here (e.g., adjusting order totals)
    // For demonstration, we'll just update the lastUsedAt
    reward.lastUsedAt = now;
    await reward.save();

    return res.status(200).json({ 
      message: 'Loyalty reward applied successfully.', 
      orderId, 
      rewardId: loyaltyRewardId,
      appliedAt: now
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.resetLoyaltyProgress = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { resetOption } = req.body;
    const guest = await Guest.findByPk(guestId);

    if (!guest) {
      return res.status(404).json({ message: 'Guest not found.' });
    }

    const now = moment();
    let resetDate;
    if (resetOption === 'calendar_year') {
      resetDate = moment().startOf('year');
    } else if (resetOption === 'signup_anniversary') {
      resetDate = moment(guest.createdAt).add(1, 'year').startOf('day');
    } else {
      return res.status(400).json({ message: 'Invalid reset option.', providedOption: resetOption });
    }

    if (now.isAfter(resetDate)) {
      const oldPoints = guest.loyaltyPoints;
      guest.loyaltyPoints = 0;
      await guest.save();
      return res.status(200).json({ 
        message: 'Loyalty progress has been reset.',
        guestId,
        oldPoints,
        newPoints: 0,
        resetDate: resetDate.toDate(),
        resetOption
      });
    } else {
      return res.status(400).json({ 
        message: 'Loyalty reset is not yet applicable.',
        guestId,
        currentPoints: guest.loyaltyPoints,
        nextResetDate: resetDate.toDate(),
        resetOption
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getLoyaltyProgram = async (req, res, next) => {
  try {
    const program = await loyaltyService.getLoyaltyProgram(req.params.clientId);
    res.status(200).json(program);
  } catch (error) {
    logger.error(`Error fetching loyalty program for client ${req.params.clientId}:`, error);
    next(new AppError('Error fetching loyalty program', 500));
  }
};

exports.createOrUpdateLoyaltyProgram = async (req, res, next) => {
  try {
    const program = await loyaltyService.createOrUpdateLoyaltyProgram(req.body);
    res.status(201).json(program);
  } catch (error) {
    logger.error('Error creating/updating loyalty program:', error);
    next(new AppError('Error creating/updating loyalty program', 500));
  }
};

exports.getCustomerPoints = async (req, res, next) => {
  try {
    const points = await loyaltyService.getCustomerPoints(req.params.customerId);
    res.status(200).json({ points });
  } catch (error) {
    logger.error(`Error fetching points for customer ${req.params.customerId}:`, error);
    next(new AppError('Error fetching customer points', 500));
  }
};

exports.addLoyaltyPoints = async (req, res, next) => {
  try {
    const { customerId, points } = req.body;
    const updatedPoints = await loyaltyService.addLoyaltyPoints(customerId, points);
    res.status(200).json({ updatedPoints });
  } catch (error) {
    logger.error('Error adding loyalty points:', error);
    next(new AppError('Error adding loyalty points', 500));
  }
};

exports.redeemLoyaltyPoints = async (req, res, next) => {
  try {
    const { customerId, points, rewardId } = req.body;
    const result = await loyaltyService.redeemLoyaltyPoints(customerId, points, rewardId);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error redeeming loyalty points:', error);
    next(new AppError('Error redeeming loyalty points', 500));
  }
};

exports.getLoyaltyTiers = async (req, res, next) => {
  try {
    const tiers = await loyaltyService.getLoyaltyTiers(req.params.clientId);
    res.status(200).json(tiers);
  } catch (error) {
    logger.error(`Error fetching loyalty tiers for client ${req.params.clientId}:`, error);
    next(new AppError('Error fetching loyalty tiers', 500));
  }
};

exports.createLoyaltyTier = async (req, res, next) => {
  try {
    const newTier = await loyaltyService.createLoyaltyTier(req.body);
    res.status(201).json(newTier);
  } catch (error) {
    logger.error('Error creating loyalty tier:', error);
    next(new AppError('Error creating loyalty tier', 500));
  }
};

exports.updateLoyaltyTier = async (req, res, next) => {
  try {
    const updatedTier = await loyaltyService.updateLoyaltyTier(req.params.tierId, req.body);
    res.status(200).json(updatedTier);
  } catch (error) {
    logger.error(`Error updating loyalty tier ${req.params.tierId}:`, error);
    next(new AppError('Error updating loyalty tier', 500));
  }
};

exports.deleteLoyaltyTier = async (req, res, next) => {
  try {
    await loyaltyService.deleteLoyaltyTier(req.params.tierId);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting loyalty tier ${req.params.tierId}:`, error);
    next(new AppError('Error deleting loyalty tier', 500));
  }
};

exports.getLoyaltyRewards = async (req, res, next) => {
  try {
    const rewards = await loyaltyService.getLoyaltyRewards(req.params.clientId);
    res.status(200).json(rewards);
  } catch (error) {
    logger.error(`Error fetching loyalty rewards for client ${req.params.clientId}:`, error);
    next(new AppError('Error fetching loyalty rewards', 500));
  }
};

exports.createLoyaltyReward = async (req, res, next) => {
  try {
    const newReward = await loyaltyService.createLoyaltyReward(req.body);
    res.status(201).json(newReward);
  } catch (error) {
    logger.error('Error creating loyalty reward:', error);
    next(new AppError('Error creating loyalty reward', 500));
  }
};

exports.updateLoyaltyReward = async (req, res, next) => {
  try {
    const updatedReward = await loyaltyService.updateLoyaltyReward(req.params.rewardId, req.body);
    res.status(200).json(updatedReward);
  } catch (error) {
    logger.error(`Error updating loyalty reward ${req.params.rewardId}:`, error);
    next(new AppError('Error updating loyalty reward', 500));
  }
};

exports.deleteLoyaltyReward = async (req, res, next) => {
  try {
    await loyaltyService.deleteLoyaltyReward(req.params.rewardId);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting loyalty reward ${req.params.rewardId}:`, error);
    next(new AppError('Error deleting loyalty reward', 500));
  }
};
