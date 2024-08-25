const db = require('../models');

// Fetch all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await db.Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error });
  }
};

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const client = await db.Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client', error });
  }
};

// Update a client
exports.updateClient = async (req, res) => {
  try {
    const client = await db.Client.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    await db.Client.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error });
  }
};
