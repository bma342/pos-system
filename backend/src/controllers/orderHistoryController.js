const OrderHistory = require('../models/OrderHistory');
const Order = require('../models/Order');
const Guest = require('../models/Guest');

exports.getOrderHistoryByGuest = async (req, res) => {
  const { guestId } = req.params;

  try {
    const orders = await OrderHistory.findAll({
      where: { guestId },
      include: [
        {
          model: Order,
          attributes: ['id', 'totalPrice', 'createdAt'],
        },
        {
          model: Guest,
          attributes: ['firstName', 'lastName', 'email'],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history', error });
  }
};
