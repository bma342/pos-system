const PosIntegrationSettings = require('../models/PosIntegrationSettings');

// Get all POS integration settings
exports.getAllSettings = async (req, res) => {
    try {
        const settings = await PosIntegrationSettings.findAll();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching POS integration settings', error });
    }
};

// Create new POS integration settings
exports.createSettings = async (req, res) => {
    try {
        const newSettings = await PosIntegrationSettings.create(req.body);
        res.status(201).json(newSettings);
    } catch (error) {
        res.status(400).json({ message: 'Error creating POS integration settings', error });
    }
};

// Get POS integration settings by ID
exports.getSettingsById = async (req, res) => {
    try {
        const settings = await PosIntegrationSettings.findByPk(req.params.id);
        if (settings) {
            res.json(settings);
        } else {
            res.status(404).json({ message: 'POS integration settings not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching POS integration settings', error });
    }
};

// Update POS integration settings by ID
exports.updateSettings = async (req, res) => {
    try {
        const [updated] = await PosIntegrationSettings.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedSettings = await PosIntegrationSettings.findByPk(req.params.id);
            res.json(updatedSettings);
        } else {
            res.status(404).json({ message: 'POS integration settings not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating POS integration settings', error });
    }
};

// Delete POS integration settings by ID
exports.deleteSettings = async (req, res) => {
    try {
        const deleted = await PosIntegrationSettings.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'POS integration settings not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting POS integration settings', error });
    }
};
