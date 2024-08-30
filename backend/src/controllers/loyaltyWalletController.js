const Guest = require('../models/Guest');
const LoyaltyReward = require('../models/LoyaltyReward'); // Assuming you have a LoyaltyReward model

exports.getWallet = async (req, res) => {
  const { guestId } = req.params;

  try {
    const guest = await Guest.findByPk(guestId);

    if (!guest) return res.status(404).json({ message: 'Guest not found.' });

    res.json({
      points: guest.loyaltyPoints,
      tier: guest.loyaltyTier,
      rewards: guest.rewardsWallet,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wallet data', error });
  }
};

exports.addPoints = async (req, res) => {
  const { guestId, points } = req.body;

  try {
    const guest = await Guest.findByPk(guestId);

    if (!guest) return res.status(404).json({ message: 'Guest not found.' });

    guest.loyaltyPoints += points;
    await guest.save();

    res.json({ message: 'Points added successfully.', points: guest.loyaltyPoints });
  } catch (error) {
    res.status(500).json({ message: 'Error adding points', error });
  }
};

exports.redeemReward = async (req, res) => {
  const { guestId, rewardId } = req.body;

  try {
    const guest = await Guest.findByPk(guestId);
    const reward = await LoyaltyReward.findByPk(rewardId); // Use reward

    if (!guest) return res.status(404).json({ message: 'Guest not found.' });

    if (!reward || reward.walletId !== guest.walletId) {
      return res.status(400).json({ message: 'Reward not found in wallet.' });
    }

    // Logic to redeem the reward (e.g., deduct points, apply discount, etc.)
    reward.isRedeemed = true; // Example logic
    await reward.save();

    res.json({ message: 'Reward redeemed successfully.', reward });
  } catch (error) {
    res.status(500).json({ message: 'Error redeeming reward', error });
  }
};
