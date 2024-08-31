const WalletDrop = require '../models/WalletDrop';
const logger = require '../utils/logger';

const createWalletDrop = async (
  userId,
  type: 'credit' | 'percentage' | 'fixed' | 'item',
  value,
  reason,
  itemId?,
  expirationDate?
) => {
  try {
    const walletDrop = await WalletDrop.create({ userId, type, value, reason, itemId, expirationDate });
    logger.info(`Wallet drop created: ${walletDrop.id}`);
    return walletDrop;
  } catch (error) {
    logger.error('Error creating wallet drop:', error);
    throw error;
  }
};

const getWalletDropsByUser = async (userId) => {
  try {
    return await WalletDrop.findAll({ where: { userId } });
  } catch (error) {
    logger.error('Error fetching wallet drops:', error);
    throw error;
  }
};

// Add more methods  (update, delete, etc.)