const { PosIntegrationSettings } = require('../models');

// Get all POS integration settings
exports.getAllPosIntegrationSettings = async (req, res) => {
    try {
        const settings = await PosIntegrationSettings.findAll();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching POS integration settings', error: error.message });
    }
};

// Get a specific POS integration setting by ID
exports.getPosIntegrationSettingById = async (req, res) => {
    try {
        const setting = await PosIntegrationSettings.findByPk(req.params.id);
        if (!setting) {
            return res.status(404).json({ message: 'POS integration setting not found' });
        }
        res.json(setting);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching POS integration setting', error: error.message });
    }
};

// Create a new POS integration setting
exports.createPosIntegrationSetting = async (req, res) => {
    try {
        const newSetting = await PosIntegrationSettings.create(req.body);
        res.status(201).json(newSetting);
    } catch (error) {
        res.status(400).json({ message: 'Error creating POS integration setting', error: error.message });
    }
};

// Update an existing POS integration setting
exports.updatePosIntegrationSetting = async (req, res) => {
    try {
        const [updated] = await PosIntegrationSettings.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'POS integration setting not found' });
        }
        const updatedSetting = await PosIntegrationSettings.findByPk(req.params.id);
        res.json(updatedSetting);
    } catch (error) {
        res.status(400).json({ message: 'Error updating POS integration setting', error: error.message });
    }
};

// Delete a POS integration setting
exports.deletePosIntegrationSetting = async (req, res) => {
    try {
        const deleted = await PosIntegrationSettings.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'POS integration setting not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting POS integration setting', error: error.message });
    }
};
