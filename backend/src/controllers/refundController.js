const Refund = require('../models/Refund');

// Get all refunds
exports.getAllRefunds = async (req, res) => {
    try {
        const refunds = await Refund.findAll();
        res.json(refunds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching refunds', error });
    }
};

// Create a new refund
exports.createRefund = async (req, res) => {
    try {
        const newRefund = await Refund.create(req.body);
        res.status(201).json(newRefund);
    } catch (error) {
        res.status(400).json({ message: 'Error creating refund', error });
    }
};

// Get a single refund by ID
exports.getRefundById = async (req, res) => {
    try {
        const refund = await Refund.findByPk(req.params.id);
        if (refund) {
            res.json(refund);
        } else {
            res.status(404).json({ message: 'Refund not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching refund', error });
    }
};

// Update a refund by ID
exports.updateRefund = async (req, res) => {
    try {
        const [updated] = await Refund.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRefund = await Refund.findByPk(req.params.id);
            res.json(updatedRefund);
        } else {
            res.status(404).json({ message: 'Refund not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating refund', error });
    }
};

// Delete a refund by ID
exports.deleteRefund = async (req, res) => {
    try {
        const deleted = await Refund.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Refund not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting refund', error });
    }
};
