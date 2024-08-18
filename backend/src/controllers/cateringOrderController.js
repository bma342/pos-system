const CateringOrder = require('../models/CateringOrder');
const Guest = require('../models/Guest');
const HouseAccount = require('../models/HouseAccount');

exports.createCateringOrder = async (req, res) => {
  try {
    const { guestId, houseAccountId, orderDate, scheduledDate, totalPrice, orderDetails } = req.body;

    const order = await CateringOrder.create({
      guestId,
      houseAccountId,
      orderDate,
      scheduledDate,
      totalPrice,
      orderDetails,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating catering order', error });
  }
};

exports.getCateringOrdersByHouseAccount = async (req, res) => {
  try {
    const orders = await CateringOrder.findAll({
      where: { houseAccountId: req.params.houseAccountId },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering orders', error });
  }
};

exports.getCateringOrdersByGuest = async (req, res) => {
  try {
    const orders = await CateringOrder.findAll({
      where: { guestId: req.params.guestId },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering orders', error });
  }
};
