const db = require('../models');

const getWalletBalance = async (req, res) => {
  try {
    const wallet = await db.Wallet.findOne({
      where: { guestId: req.user.id, clientId: req.user.clientId }, // Ensure client isolation
    });

    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve wallet balance', error });
  }
};

const addDiscountToWallet = async (req, res) => {
  try {
    const { discountId } = req.body;

    const discount = await db.Discount.findOne({
      where: { id: discountId, clientId: req.user.clientId }, // Ensure discount belongs to the correct client
    });

    if (!discount) return res.status(404).json({ message: 'Discount not found' });

    const wallet = await db.Wallet.findOne({
      where: { guestId: req.user.id, clientId: req.user.clientId }, // Ensure wallet belongs to the correct client
    });

    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    await wallet.addDiscount(discount);
    res.status(200).json({ message: 'Discount added to wallet' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add discount to wallet', error });
  }
};

const getWalletDiscounts = async (req, res) => {
  try {
    const wallet = await db.Wallet.findOne({
      where: { guestId: req.user.id, clientId: req.user.clientId }, // Ensure wallet belongs to the correct client
      include: [{
        model: db.Discount,
        where: { clientId: req.user.clientId }, // Ensure discounts belong to the correct client
      }],
    });

    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    res.status(200).json(wallet.Discounts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve wallet discounts', error });
  }
};

module.exports = { getWalletBalance, addDiscountToWallet, getWalletDiscounts };
