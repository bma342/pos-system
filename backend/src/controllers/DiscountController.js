const Discount = require('../models/Discount');
const { Op } = require('sequelize');
const { StripEmojis } = require('../utils/emojiUtils');

class DiscountController {
  static async createDiscount(req, res) {
    try {
      const discountData = {
        ...req.body,
        name: StripEmojis(req.body.name),
        description: StripEmojis(req.body.description),
      };
      const discount = await Discount.create(discountData);
      return res.status(201).json(discount);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getDiscounts(req, res) {
    try {
      const discounts = await Discount.findAll({
        where: {
          status: 'active',
          [Op.or]: [
            { startDate: { [Op.lte]: new Date() } },
            { startDate: null },
          ],
          [Op.and]: [
            { endDate: { [Op.gte]: new Date() } },
            { endDate: null },
          ],
        },
      });
      return res.status(200).json(discounts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateDiscount(req, res) {
    try {
      const discount = await Discount.findByPk(req.params.id);
      if (discount) {
        const updatedData = {
          ...req.body,
          name: StripEmojis(req.body.name),
          description: StripEmojis(req.body.description),
        };
        await discount.update(updatedData);
        return res.status(200).json(discount);
      }
      return res.status(404).json({ message: 'Discount not found' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteDiscount(req, res) {
    try {
      const discount = await Discount.findByPk(req.params.id);
      if (discount) {
        await discount.destroy();
        return res.status(204).send();
      }
      return res.status(404).json({ message: 'Discount not found' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = DiscountController;
