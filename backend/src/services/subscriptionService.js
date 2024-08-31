const { Subscription, Order } = require '../models';
const { createOrder } = require './orderService';

const createSubscription = async (userId, planId) => {
  const nextBillingDate = new Date();
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

  return await Subscription.create({
    userId,
    planId,
    status: 'active',
    nextBillingDate,
  });
};

const processSubscriptions = async () => {
  const activeSubscriptions = await Subscription.findAll({
    where: {
      status: 'active',
      nextBillingDate: {
        [Op.lte] Date(),
      },
    },
  });

  for (const subscription of activeSubscriptions) {
    await createOrder({
      userId.userId,
      items: [{ id.planId, quantity: 1 }],
      isSubscription,
    });

    const nextBillingDate = new Date(subscription.nextBillingDate);
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    await subscription.update({ nextBillingDate });
  }
};