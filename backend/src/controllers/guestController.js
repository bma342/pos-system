const db = require('../models');
const { Op } = require('sequelize');

exports.getGuestProfile = async (req, res) => {
  const { guestId } = req.params;
  const { clientId } = req.user; // Assume clientId is extracted from authenticated user

  try {
    // Ensure guest belongs to the requesting client
    const guest = await db.Guest.findOne({
      where: {
        id: guestId,
        clientId, // Tenant isolation
      },
      include: [
        {
          model: db.Wallet,
          include: [db.LoyaltyReward, db.Discount],
        },
        db.Order,
      ],
    });

    if (!guest) return res.status(404).json({ message: 'Guest not found or access denied.' });

    // Calculate engagement score, order frequency, etc.
    const orderCount = guest.Orders.length;
    const totalSpend = guest.Orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const daysSinceFirstOrder = guest.Orders.length
      ? (new Date() - new Date(guest.Orders[0].orderDate)) / (1000 * 60 * 60 * 24)
      : 0;

    const engagementScore = calculateEngagementScore(orderCount, totalSpend, daysSinceFirstOrder);
    const orderFrequency = daysSinceFirstOrder && orderCount ? daysSinceFirstOrder / orderCount : 0;
    const averageOrderSize = orderCount ? totalSpend / orderCount : 0;

    res.json({
      ...guest.toJSON(),
      engagementScore,
      orderFrequency: orderFrequency.toFixed(2),
      averageOrderSize: averageOrderSize.toFixed(2),
      totalSpend: totalSpend.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guest profile', error });
  }
};

// Calculate engagement score based on various factors
function calculateEngagementScore(orderCount, totalSpend, daysSinceFirstOrder) {
  const frequencyScore = orderCount > 0 ? 50 / (daysSinceFirstOrder / orderCount) : 0;
  const spendScore = totalSpend > 0 ? Math.log(totalSpend) * 10 : 0;
  return Math.round(frequencyScore + spendScore);
}
