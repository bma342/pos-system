const walletService = require('../services/walletService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.getWalletBalance = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const balance = await walletService.getWalletBalance(userId);
    res.status(200).json({ balance });
  } catch (error) {
    logger.error('Error fetching wallet balance:', error);
    next(new AppError('Failed to fetch wallet balance', 500));
  }
};

exports.addFunds = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { amount } = req.body;
    const updatedBalance = await walletService.addFunds(userId, amount);
    res.status(200).json({ message: 'Funds added successfully', balance: updatedBalance });
  } catch (error) {
    logger.error('Error adding funds to wallet:', error);
    next(new AppError('Failed to add funds to wallet', 500));
  }
};

exports.withdrawFunds = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { amount } = req.body;
    const updatedBalance = await walletService.withdrawFunds(userId, amount);
    res.status(200).json({ message: 'Funds withdrawn successfully', balance: updatedBalance });
  } catch (error) {
    logger.error('Error withdrawing funds from wallet:', error);
    next(new AppError('Failed to withdraw funds from wallet', 500));
  }
};

exports.getTransactionHistory = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const transactions = await walletService.getTransactionHistory(userId);
    res.status(200).json(transactions);
  } catch (error) {
    logger.error('Error fetching transaction history:', error);
    next(new AppError('Failed to fetch transaction history', 500));
  }
};

exports.transferFunds = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { recipientId, amount } = req.body;
    const result = await walletService.transferFunds(userId, recipientId, amount);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error transferring funds:', error);
    next(new AppError('Failed to transfer funds', 500));
  }
};

exports.getWalletDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const walletDetails = await walletService.getWalletDetails(userId);
    res.status(200).json(walletDetails);
  } catch (error) {
    logger.error('Error fetching wallet details:', error);
    next(new AppError('Failed to fetch wallet details', 500));
  }
};
