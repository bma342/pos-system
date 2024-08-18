const Guest = require('../models/Guest');
const LoyaltyConfig = require('../models/LoyaltyConfig');
const Order = require('../models/Order');

exports.getLoyaltyInfo = async (req, res) => {
  const { guestId } = req.params;

  try {
    const guest = await Guest.findByPk(guestId);
    if (!guest) return res.status(404).json({ message: 'Guest not found.' });

    res.json({
      loyaltyPoints: guest.loyaltyPoints,
      loyaltyTier: guest.loyaltyTier,
      loyaltySubscription: guest.loyaltySubscription,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loyalty info.', error });
  }
};

exports.updateLoyaltyPoints = async (guestId, orderId, amountSpent) => {
  try {
    const guest = await Guest.findByPk(guestId);
    if (!guest) throw new Error('Guest not found.');

    const loyaltyConfig = await LoyaltyConfig.findOne({ where: { clientId: guest.clientId } });

    const pointsEarned = amountSpent * loyaltyConfig.pointsPerDollar;

    // Check if the guest reaches a new tier
    const newPoints = guest.loyaltyPoints + pointsEarned;
    let newTier = guest.loyaltyTier;

    if (newPoints >= loyaltyConfig.tierThreshold) {
      newTier = loyaltyConfig.tierName;
    }

    await guest.update({ loyaltyPoints: newPoints, loyaltyTier: newTier });

    // Log the points update in the order history
    await OrderHistory.create({
      orderId,
      guestId,
      action: `Loyalty Points Updated: +${pointsEarned}`,
    });

    return { pointsEarned, newTier };
  } catch (error) {
    console.error('Error updating loyalty points:', error);
  }
};
