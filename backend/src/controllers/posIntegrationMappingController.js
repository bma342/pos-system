const PosIntegrationMapping = require('../models/PosIntegrationMapping');

// Get all POS integration mappings
exports.getAllMappings = async (req, res) => {
    try {
        const mappings = await PosIntegrationMapping.findAll();
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching POS integration mappings', error });
    }
};

// Create a new POS integration mapping
exports.createMapping = async (req, res) => {
    try {
        const newMapping = await PosIntegrationMapping.create(req.body);
        res.status(201).json(newMapping);
    } catch (error) {
        res.status(400).json({ message: 'Error creating POS integration mapping', error });
    }
};

// Get a single POS integration mapping by ID
exports.getMappingById = async (req, res) => {
    try {
        const mapping = await PosIntegrationMapping.findByPk(req.params.id);
        if (mapping) {
            res.json(mapping);
        } else {
            res.status(404).json({ message: 'POS integration mapping not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching POS integration mapping', error });
    }
};

// Update a POS integration mapping by ID
exports.updateMapping = async (req, res) => {
    try {
        const [updated] = await PosIntegrationMapping.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedMapping = await PosIntegrationMapping.findByPk(req.params.id);
            res.json(updatedMapping);
        } else {
            res.status(404).json({ message: 'POS integration mapping not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating POS integration mapping', error });
    }
};

// Delete a POS integration mapping by ID
exports.deleteMapping = async (req, res) => {
    try {
        const deleted = await PosIntegrationMapping.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'POS integration mapping not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting POS integration mapping', error });
    }
};
