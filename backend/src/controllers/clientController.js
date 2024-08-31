const clientService = require('../services/clientService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllClients = async (req, res, next) => {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    logger.error('Error fetching all clients:', error);
    next(new AppError('Error fetching clients', 500));
  }
};

const getClientById = async (req, res, next) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    if (!client) {
      return next(new AppError('Client not found', 404));
    }
    res.status(200).json(client);
  } catch (error) {
    logger.error(`Error fetching client ${req.params.id}:`, error);
    next(new AppError('Error fetching client', 500));
  }
};

const createClient = async (req, res, next) => {
  try {
    const newClient = await clientService.createClient(req.body);
    logger.info(`New client created: ${newClient.id}`);
    res.status(201).json(newClient);
  } catch (error) {
    logger.error('Error creating client:', error);
    next(new AppError('Error creating client', 500));
  }
};

const updateClient = async (req, res, next) => {
  try {
    const updatedClient = await clientService.updateClient(req.params.id, req.body);
    if (!updatedClient) {
      return next(new AppError('Client not found', 404));
    }
    logger.info(`Client updated: ${req.params.id}`);
    res.status(200).json(updatedClient);
  } catch (error) {
    logger.error(`Error updating client ${req.params.id}:`, error);
    next(new AppError('Error updating client', 500));
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const result = await clientService.deleteClient(req.params.id);
    if (!result) {
      return next(new AppError('Client not found', 404));
    }
    logger.info(`Client deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting client ${req.params.id}:`, error);
    next(new AppError('Error deleting client', 500));
  }
};

const getClientSettings = async (req, res, next) => {
  try {
    const settings = await clientService.getClientSettings(req.params.id);
    if (!settings) {
      return next(new AppError('Client settings not found', 404));
    }
    res.status(200).json(settings);
  } catch (error) {
    logger.error(`Error fetching settings for client ${req.params.id}:`, error);
    next(new AppError('Error fetching client settings', 500));
  }
};

const updateClientSettings = async (req, res, next) => {
  try {
    const updatedSettings = await clientService.updateClientSettings(req.params.id, req.body);
    if (!updatedSettings) {
      return next(new AppError('Client settings not found', 404));
    }
    logger.info(`Settings updated for client: ${req.params.id}`);
    res.status(200).json(updatedSettings);
  } catch (error) {
    logger.error(`Error updating settings for client ${req.params.id}:`, error);
    next(new AppError('Error updating client settings', 500));
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