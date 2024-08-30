const ClientService = require('../services/clientService');
const logger = require('../services/logger');
const { check, validationResult } = require('express-validator');

const validateClient = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('phoneNumber').optional().isMobilePhone().withMessage('Valid phone number is required'),
];

exports.getAllClients = async (req, res) => {
  try {
    const clients = await ClientService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    logger.error(`Error fetching all clients: ${error.message}`);
    res.status(500).json({ message: 'Error fetching all clients', error: error.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await ClientService.getClientById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  } catch (error) {
    logger.error(`Error fetching client by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching client details', error: error.message });
  }
};

exports.createClient = [
  ...validateClient,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phoneNumber, address } = req.body;
      const client = await ClientService.createClient({ name, email, phoneNumber, address });

      logger.info(`Client created: ${client.name} (ID: ${client.id})`);
      res.status(201).json(client);
    } catch (error) {
      logger.error(`Error creating client: ${error.message}`);
      res.status(500).json({ message: 'Error creating client', error: error.message });
    }
  }
];

exports.updateClient = [
  ...validateClient,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const client = await ClientService.updateClient(req.params.id, req.body);
      if (!client) return res.status(404).json({ message: 'Client not found' });

      logger.info(`Client updated: ${client.name} (ID: ${client.id})`);
      res.json(client);
    } catch (error) {
      logger.error(`Error updating client (${req.params.id}): ${error.message}`);
      res.status(500).json({ message: 'Error updating client', error: error.message });
    }
  }
];

exports.deleteClient = async (req, res) => {
  try {
    const client = await ClientService.deleteClient(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    logger.info(`Client deleted: ${client.name} (ID: ${client.id})`);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting client (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
};

exports.getClientTheme = async (req, res) => {
  try {
    const subdomain = req.headers['x-subdomain'];
    if (!subdomain) {
      return res.status(400).json({ message: 'Subdomain header is missing' });
    }
    const theme = await ClientService.getClientTheme(subdomain);
    if (!theme) return res.status(404).json({ message: 'Client not found' });

    logger.info(`Client theme fetched (Subdomain: ${subdomain})`);
    res.json(theme);
  } catch (error) {
    logger.error(`Error fetching client theme (Subdomain: ${req.headers['x-subdomain']}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching client theme', error: error.message });
  }
};

module.exports = exports;
