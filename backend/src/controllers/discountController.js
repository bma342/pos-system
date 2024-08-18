const Discount = require('../models/Discount');
const GuestDiscounts = require('../models/GuestDiscounts');
const Guest = require('../models/Guest');

exports.createDiscount = async (req, res) => {
  const { name, type, value, conditions, startDate, endDate, locationId, maxUsesPerGuest } = req.body;

  try {
    const discount = await Discount.create({
      name,
      type,
      value,
      conditions,
      startDate,
      endDate,
      locationId,
      maxUsesPerGuest,
    });

    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ message: 'Error creating discount', error });
  }
};

exports.getDiscountsByLocation = async (req, res) => {
  const { locationId } = req.params;

  try {
    const discounts = await Discount.findAll({ where: { locationId } });
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discounts', error });
  }
};

exports.scheduleDiscountDrop = async (req, res) => {
  const { discountId, guestIds, scheduleTime } = req.body;

  try {
    // Schedule discount drop
    setTimeout(async () => {
      const discount = await Discount.findByPk(discountId);
      if (!discount) return;

      for (const guestId of guestIds) {
        await GuestDiscounts.create({ guestId, discountId });
      }
    }, new Date(scheduleTime) - Date.now());

    res.status(200).json({ message: 'Discount scheduled for drop' });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling discount drop', error });
  }
};
