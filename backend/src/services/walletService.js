const { Wallet, Guest, Discount, LoyaltyReward, Transaction } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

class WalletService {
  static async getWalletBalance(guestId) {
    try {
      const wallet = await Wallet.findOne({
        where: { guestId },
        include: [Guest, LoyaltyReward],
      });

      if (!wallet) {
        throw new AppError('Wallet not found', 404);
      }

      // Calculate total balance including any unused rewards
      const totalBalance = wallet.balance + wallet.LoyaltyRewards.reduce((sum, reward) => sum + reward.value, 0);

      return totalBalance;
    } catch (error) {
      logger.error(`Error fetching wallet balance for guest ${guestId}:`, error);
      throw error instanceof AppError ? error : new AppError('Failed to fetch wallet balance', 500);
    }
  }

  static async addFunds(guestId, amount) {
    try {
      const wallet = await Wallet.findOne({ where: { guestId } });
      if (!wallet) {
        throw new AppError('Wallet not found', 404);
      }

      wallet.balance += amount;
      await wallet.save();

      await Transaction.create({
        walletId: wallet.id,
        type: 'DEPOSIT',
        amount,
        balance: wallet.balance
      });

      return wallet.balance;
    } catch (error) {
      logger.error(`Error adding funds to wallet for guest ${guestId}:`, error);
      throw error instanceof AppError ? error : new AppError('Failed to add funds to wallet', 500);
    }
  }

  static async withdrawFunds(guestId, amount) {
    try {
      const wallet = await Wallet.findOne({ where: { guestId } });
      if (!wallet) {
        throw new AppError('Wallet not found', 404);
      }

      if (wallet.balance < amount) {
        throw new AppError('Insufficient funds', 400);
      }

      wallet.balance -= amount;
      await wallet.save();

      await Transaction.create({
        walletId: wallet.id,
        type: 'WITHDRAWAL',
        amount: -amount,
        balance: wallet.balance
      });

      return wallet.balance;
    } catch (error) {
      logger.error(`Error withdrawing funds from wallet for guest ${guestId}:`, error);
      throw error instanceof AppError ? error : new AppError('Failed to withdraw funds from wallet', 500);
    }
  }

  static async getTransactionHistory(guestId) {
    try {
      const wallet = await Wallet.findOne({ where: { guestId } });
      if (!wallet) {
        throw new AppError('Wallet not found', 404);
      }

      return Transaction.findAll({
        where: { walletId: wallet.id },
        order: [['createdAt', 'DESC']],
        limit: 50
      });
    } catch (error) {
      logger.error(`Error fetching transaction history for guest ${guestId}:`, error);
      throw error instanceof AppError ? error : new AppError('Failed to fetch transaction history', 500);
    }
  }

  static async transferFunds(senderId, recipientId, amount) {
    try {
      const senderWallet = await Wallet.findOne({ where: { guestId: senderId } });
      const recipientWallet = await Wallet.findOne({ where: { guestId: recipientId } });

      if (!senderWallet || !recipientWallet) {
        throw new AppError('Wallet not found', 404);
      }

      if (senderWallet.balance < amount) {
        throw new AppError('Insufficient funds', 400);
      }

      senderWallet.balance -= amount;
      recipientWallet.balance += amount;

      await senderWallet.save();
      await recipientWallet.save();

      await Transaction.create({
        walletId: senderWallet.id,
        type: 'TRANSFER_OUT',
        amount: -amount,
        balance: senderWallet.balance,
        recipientId
      });

      await Transaction.create({
        walletId: recipientWallet.id,
        type: 'TRANSFER_IN',
        amount,
        balance: recipientWallet.balance,
        senderId
      });

      return { message: 'Funds transferred successfully' };
    } catch (error) {
      logger.error(`Error transferring funds from guest ${senderId} to guest ${recipientId}:`, error);
      throw error instanceof AppError ? error : new AppError('Failed to transfer funds', 500);
    }
  }

  static async getWalletDetails(guestId) {
    try {
      const wallet = await Wallet.findOne({
        where: { guestId },
        include: [Guest, LoyaltyReward, Discount]
      });

      if (!wallet) {
        throw new AppError('Wallet not found', 404);
      }

      return wallet;
    } catch (error) {
      logger.error(`Error fetching wallet details for guest ${guestId}:`, error);
      throw error instanceof AppError ? error : new AppError('Failed to fetch wallet details', 500);
    }
  }

  static async addDiscountToWallet(guestId, discountId) {
    try {
      const wallet = await Wallet.findOne({ where: { guestId } });
      if (!wallet) {
        throw new AppError('Wallet not found', 404);
      }

      await Discount.update({ walletId: wallet.id }, { where: { id: discountId } });
      return true;
    } catch (error) {
      logger.error(`Error adding discount to wallet for guest ${guestId}:`, error);
      throw error instanceof AppError ? error : new AppError('Failed to add discount to wallet', 500);
    }
  }

  static async getWalletDiscounts(guestId) {
    try {
      const wallet = await Wallet.findOne({ where: { guestId } });
      if (!wallet) {
        throw new AppError('Wallet not found', 404);
      }

      return await Discount.findAll({ where: { walletId: wallet.id } });
    } catch (error) {
      logger.error(`Error fetching wallet discounts for guest ${guestId}:`, error);
      throw error instanceof AppError ? error : new AppError('Failed to fetch wallet discounts', 500);
    }
  }

  static async applyLoyaltyPoints(guestId, points) {
    try {
      const wallet = await Wallet.findOne({ where: { guestId } });
      if (!wallet) {
        throw new AppError('Wallet not found', 404);
      }

      if (wallet.balance < points) {
        throw new AppError('Insufficient points', 400);
      }

      wallet.balance -= points;
      await wallet.save();

      await Transaction.create({
        walletId: wallet.id,
        type: 'LOYALTY_POINTS_USED',
        amount: -points,
        balance: wallet.balance
      });

      return true;
    } catch (error) {
      logger.error(`Error applying loyalty points for guest ${guestId}:`, error);
      throw error instanceof AppError ? error : new AppError('Failed to apply loyalty points', 500);
    }
  }
}

module.exports = WalletService;
