const { Client, ClientSettings } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllClients = async () => {
  try {
    return await Client.findAll();
  } catch (error) {
    logger.error('Error fetching all clients:', error);
    throw new AppError('Failed to fetch clients', 500);
  }
};

const getClientById = async (id) => {
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      throw new AppError('Client not found', 404);
    }
    return client;
  } catch (error) {
    logger.error(`Error fetching client with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch client', 500);
  }
};

const createClient = async (clientData) => {
  try {
    const newClient = await Client.create(clientData);
    logger.info(`New client created with ID: ${newClient.id}`);
    return newClient;
  } catch (error) {
    logger.error('Error creating client:', error);
    throw new AppError('Failed to create client', 500);
  }
};

const updateClient = async (id, clientData) => {
  try {
    const client = await getClientById(id);
    const updatedClient = await client.update(clientData);
    logger.info(`Client updated with ID: ${id}`);
    return updatedClient;
  } catch (error) {
    logger.error(`Error updating client with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update client', 500);
  }
};

const deleteClient = async (id) => {
  try {
    const client = await getClientById(id);
    await client.destroy();
    logger.info(`Client deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting client with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete client', 500);
  }
};

const getClientSettings = async (clientId) => {
  try {
    const settings = await ClientSettings.findOne({ where: { clientId } });
    if (!settings) {
      throw new AppError('Client settings not found', 404);
    }
    return settings;
  } catch (error) {
    logger.error(`Error fetching settings for client ${clientId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch client settings', 500);
  }
};

const updateClientSettings = async (clientId, settingsData) => {
  try {
    const [settings, created] = await ClientSettings.findOrCreate({
      where: { clientId },
      defaults: settingsData
    });

    if (!created) {
      await settings.update(settingsData);
    }

    logger.info(`Settings updated for client: ${clientId}`);
    return settings;
  } catch (error) {
    logger.error(`Error updating settings for client ${clientId}:`, error);
    throw new AppError('Failed to update client settings', 500);
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientSettings,
  updateClientSettings
};