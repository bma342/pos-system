const Guest = require('../models/Guest');

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
  const { guestId, reward } = req.body;

  try {
    const guest = await Guest.findByPk(guestId);

    if (!guest) return res.status(404).json({ message: 'Guest not found.' });

    // Logic to redeem the reward (e.g., check if reward exists in wallet, update wallet, etc.)

    res.json({ message: 'Reward redeemed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error redeeming reward', error });
  }
};
