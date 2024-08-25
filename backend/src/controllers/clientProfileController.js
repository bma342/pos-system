const db = require('../models');

// Fetch all client profiles
exports.getClientProfiles = async (req, res) => {
  try {
    const profiles = await db.ClientProfile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client profiles', error });
  }
};

// Create a new client profile
exports.createClientProfile = async (req, res) => {
  try {
    const profile = await db.ClientProfile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client profile', error });
  }
};

// Update a client profile
exports.updateClientProfile = async (req, res) => {
  try {
    const profile = await db.ClientProfile.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client profile', error });
  }
};

// Delete a client profile
exports.deleteClientProfile = async (req, res) => {
  try {
    await db.ClientProfile.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client profile', error });
  }
};
