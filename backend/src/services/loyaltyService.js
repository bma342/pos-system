const { User, Order, LoyaltyProgram } = require ('../models');

const calculatePoints = async (orderId) => {
  const order = await Order.findByPk(orderId);
  const loyaltyProgram = await LoyaltyProgram.findOne();
  
  const points = Math.floor(order.total * loyaltyProgram.pointsPerDollar);
  
  await User.increment('loyaltyPoints', { by: points, where: { id: order.userId } });
};

const checkAndUpdateTier = async (userId) => {
  const user = await User.findByPk(userId);
  const loyaltyProgram = await LoyaltyProgram.findOne();
  
  const newTier = loyaltyProgram.tiers.find(tier => user.loyaltyPoints >= tier.minPoints);
  
  if (newTier && newTier.name !== user.loyaltyTier) {
    await user.update({ loyaltyTier: newTier.name });
  }
};