const CateringOrder = require('../models/CateringOrder');
const Guest = require('../models/Guest');
const HouseAccount = require('../models/HouseAccount');
const TaxService = require('../services/taxService');

exports.createCateringOrder = async (req, res) => {
  try {
    const { guestId, houseAccountId, orderDate, scheduledDate, totalPrice, orderDetails, locationId, provider } = req.body;

    // Fetch applicable tax
    const taxDetails = await TaxService.getApplicableTax(locationId, provider, guestId);

    // Adjust the order total based on the tax rate
    const totalWithTax = totalPrice + (totalPrice * taxDetails.rate) / 100;

    const order = await CateringOrder.create({
      guestId,
      houseAccountId,
      orderDate,
      scheduledDate,
      totalPrice: totalWithTax,
      orderDetails,
      taxExempt: taxDetails.rate === 0, // Flag for tax-exempt orders
      taxIdNumber: taxDetails.taxId, // Store the tax ID if applicable
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
