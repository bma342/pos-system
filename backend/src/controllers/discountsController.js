const Discount = require('../models/Discount');

exports.applyDiscount = async (req, res) => {
  const { discountCode } = req.body;

  try {
    const discount = await Discount.findOne({ where: { code: discountCode } });

    if (!discount || !discount.isActive) {
      return res.status(400).json({ message: 'Invalid or inactive discount code.' });
    }

    res.json({ message: 'Discount applied successfully.', discount });
  } catch (error) {
    res.status(500).json({ message: 'Error applying discount', error });
  }
};
