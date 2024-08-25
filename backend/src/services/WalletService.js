const { Wallet, Guest, Discount, LoyaltyReward } = require('../models');

class WalletService {
  static async getWalletBalance(guestId) {
    const wallet = await Wallet.findOne({
      where: { guestId },
      include: [Guest],
    });

    return wallet ? wallet.balance : 0;
  }

  static async addDiscountToWallet(guestId, discountId) {
    const wallet = await Wallet.findOne({ where: { guestId } });
    if (wallet) {
      await Discount.update({ walletId: wallet.id }, { where: { id: discountId } });
      return true;
    }
    throw new Error('Wallet not found');
  }

  static async getWalletDiscounts(guestId) {
    const wallet = await Wallet.findOne({ where: { guestId } });
    if (wallet) {
      return await Discount.findAll({ where: { walletId: wallet.id } });
    }
    throw new Error('Wallet not found');
  }

  static async applyLoyaltyPoints(guestId, points) {
    const wallet = await Wallet.findOne({ where: { guestId } });
    if (wallet) {
      if (wallet.balance >= points) {
        wallet.balance -= points;
        await wallet.save();
        return true;
      }
      throw new Error('Insufficient points');
    }
    throw new Error('Wallet not found');
  }
}

module.exports = WalletService;
