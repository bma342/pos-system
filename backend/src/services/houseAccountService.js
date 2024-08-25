const db = require('../models');
const logger = require('../services/logger');

class HouseAccountService {
  // Create a new house account
  async createHouseAccount(clientId, accountDetails) {
    try {
      const newAccount = await db.HouseAccount.create({
        ...accountDetails,
        clientId,
      });
      logger.info(`House account created: ${newAccount.name}`);
      return newAccount;
    } catch (error) {
      logger.error(`Error creating house account: ${error.message}`);
      throw error;
    }
  }

  // Fetch all house accounts for a client
  async getAllHouseAccounts(clientId) {
    return await db.HouseAccount.findAll({ where: { clientId } });
  }

  // Update a house account
  async updateHouseAccount(accountId, accountDetails) {
    try {
      const account = await db.HouseAccount.findByPk(accountId);
      if (!account) throw new Error('House account not found');
      
      await account.update(accountDetails);
      logger.info(`House account updated: ${account.name}`);
      return account;
    } catch (error) {
      logger.error(`Error updating house account: ${error.message}`);
      throw error;
    }
  }

  // Delete a house account
  async deleteHouseAccount(accountId) {
    try {
      const account = await db.HouseAccount.findByPk(accountId);
      if (!account) throw new Error('House account not found');

      await account.destroy();
      logger.info(`House account deleted: ${account.name}`);
    } catch (error) {
      logger.error(`Error deleting house account: ${error.message}`);
      throw error;
    }
  }

  // Generate an invoice for a house account
  async generateInvoice(accountId) {
    try {
      const account = await db.HouseAccount.findByPk(accountId, {
        include: [db.CateringOrder],
      });
      if (!account) throw new Error('House account not found');

      // Logic to generate and format the invoice (PDF, CSV, etc.)
      const invoiceData = {
        accountName: account.name,
        orders: account.CateringOrders,
        totalAmount: account.CateringOrders.reduce((sum, order) => sum + order.amount, 0),
      };

      // Return or save the invoice
      logger.info(`Invoice generated for account: ${account.name}`);
      return invoiceData;
    } catch (error) {
      logger.error(`Error generating invoice: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new HouseAccountService();
