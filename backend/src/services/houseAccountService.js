const { HouseAccount, Transaction } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getHouseAccountsByClient = async (clientId) => {
  try {
    return await HouseAccount.findAll({ where: { clientId } });
  } catch (error) {
    logger.error(`Error fetching house accounts for client ${clientId}:`, error);
    throw new AppError('Failed to fetch house accounts', 500);
  }
};

const getHouseAccountById = async (id) => {
  try {
    const account = await HouseAccount.findByPk(id);
    if (!account) {
      throw new AppError('House account not found', 404);
    }
    return account;
  } catch (error) {
    logger.error(`Error fetching house account with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch house account', 500);
  }
};

const createHouseAccount = async (accountData) => {
  try {
    const newAccount = await HouseAccount.create(accountData);
    logger.info(`New house account created with ID: ${newAccount.id}`);
    return newAccount;
  } catch (error) {
    logger.error('Error creating house account:', error);
    throw new AppError('Failed to create house account', 500);
  }
};

const updateHouseAccount = async (id, accountData) => {
  try {
    const account = await getHouseAccountById(id);
    const updatedAccount = await account.update(accountData);
    logger.info(`House account updated with ID: ${id}`);
    return updatedAccount;
  } catch (error) {
    logger.error(`Error updating house account with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update house account', 500);
  }
};

const deleteHouseAccount = async (id) => {
  try {
    const account = await getHouseAccountById(id);
    await account.destroy();
    logger.info(`House account deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting house account with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete house account', 500);
  }
};

const addFunds = async (id, amount) => {
  try {
    const account = await getHouseAccountById(id);
    account.balance += amount;
    await account.save();
    await Transaction.create({ houseAccountId: id, amount, type: 'credit' });
    logger.info(`Funds added to house account ${id}: ${amount}`);
    return account;
  } catch (error) {
    logger.error(`Error adding funds to house account ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to add funds', 500);
  }
};

const deductFunds = async (id, amount) => {
  try {
    const account = await getHouseAccountById(id);
    if (account.balance < amount) {
      throw new AppError('Insufficient funds', 400);
    }
    account.balance -= amount;
    await account.save();
    await Transaction.create({ houseAccountId: id, amount, type: 'debit' });
    logger.info(`Funds deducted from house account ${id}: ${amount}`);
    return account;
  } catch (error) {
    logger.error(`Error deducting funds from house account ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to deduct funds', 500);
  }
};

const getTransactionHistory = async (id) => {
  try {
    await getHouseAccountById(id); // Ensure account exists
    const transactions = await Transaction.findAll({ where: { houseAccountId: id } });
    return transactions;
  } catch (error) {
    logger.error(`Error fetching transaction history for house account ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch transaction history', 500);
  }
};

module.exports = {
  getHouseAccountsByClient,
  getHouseAccountById,
  createHouseAccount,
  updateHouseAccount,
  deleteHouseAccount,
  addFunds,
  deductFunds,
  getTransactionHistory
};
