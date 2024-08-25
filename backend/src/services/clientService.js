const db = require('../models');
const logger = require('../services/logger');

class ClientService {
  // Fetch all clients
  async getAllClients() {
    try {
      const clients = await db.Client.findAll();
      return clients;
    } catch (error) {
      logger.error(`Error fetching all clients: ${error.message}`);
      throw new Error('Error fetching clients.');
    }
  }

  // Fetch client by ID
  async getClientById(clientId) {
    try {
      const client = await db.Client.findByPk(clientId);
      if (!client) throw new Error('Client not found');
      return client;
    } catch (error) {
      logger.error(`Error fetching client by ID: ${error.message}`);
      throw new Error('Error fetching client.');
    }
  }

  // Create a new client
  async createClient(clientData) {
    try {
      const { name, email, phoneNumber, address } = clientData;
      const subdomain = name.toLowerCase().replace(/\s+/g, '-'); // Generate subdomain from client name
      const client = await db.Client.create({ name, email, phoneNumber, address, subdomain });
      logger.info(`Client created: ${client.name}`);
      return client;
    } catch (error) {
      logger.error(`Error creating client: ${error.message}`);
      throw new Error('Error creating client.');
    }
  }

  // Update client details
  async updateClient(clientId, updateData) {
    try {
      const client = await db.Client.findByPk(clientId);
      if (!client) throw new Error('Client not found');
      await client.update(updateData);
      logger.info(`Client updated: ${client.name}`);
      return client;
    } catch (error) {
      logger.error(`Error updating client: ${error.message}`);
      throw new Error('Error updating client.');
    }
  }

  // Delete a client
  async deleteClient(clientId) {
    try {
      const client = await db.Client.findByPk(clientId);
      if (!client) throw new Error('Client not found');
      await client.destroy();
      logger.info(`Client deleted: ${client.name}`);
      return { message: 'Client deleted successfully' };
    } catch (error) {
      logger.error(`Error deleting client: ${error.message}`);
      throw new Error('Error deleting client.');
    }
  }

  // Fetch client theme settings
  async getClientTheme(subdomain) {
    try {
      const client = await db.Client.findOne({ where: { subdomain } });
      if (!client) throw new Error('Client not found');

      const theme = {
        primaryColor: client.primaryColor,
        secondaryColor: client.secondaryColor,
        accentColor: client.accentColor,
        primaryFont: client.primaryFont,
        secondaryFont: client.secondaryFont,
      };

      logger.info(`Client theme fetched: ${client.name}`);
      return theme;
    } catch (error) {
      logger.error(`Error fetching client theme: ${error.message}`);
      throw new Error('Error fetching client theme.');
    }
  }
}

module.exports = new ClientService();
