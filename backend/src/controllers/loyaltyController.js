const LoyaltyReward = require('../models/LoyaltyReward');
const Wallet = require('../models/Wallet');
const moment = require('moment');
const Guest = require('../models/Guest');

class LoyaltyController {
  static async applyLoyaltyReward(req, res) {
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
  }

  static async resetLoyaltyProgress(req, res) {
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
  }
}

module.exports = LoyaltyController;
