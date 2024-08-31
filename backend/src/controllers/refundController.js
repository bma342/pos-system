const Refund = require('../models/Refund');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// Process a refund
exports.processRefund = async (req, res, next) => {
    try {
        const newRefund = await Refund.create(req.body);
        logger.info(`Refund processed successfully: ${newRefund.id}`);
        res.status(201).json(newRefund);
    } catch (error) {
        logger.error('Error processing refund:', error);
        next(new AppError('Failed to process refund', 500));
    }
};

// Get a single refund by ID
exports.getRefundById = async (req, res, next) => {
    try {
        const refund = await Refund.findByPk(req.params.id);
        if (!refund) {
            return next(new AppError('Refund not found', 404));
        }
        res.status(200).json(refund);
    } catch (error) {
        logger.error(`Error fetching refund ${req.params.id}:`, error);
        next(error);
    }
};

// Get all refunds for a specific order
exports.getRefundsByOrder = async (req, res, next) => {
    try {
        const refunds = await Refund.findAll({ where: { orderId: req.params.orderId } });
        res.status(200).json(refunds);
    } catch (error) {
        logger.error(`Error fetching refunds for order ${req.params.orderId}:`, error);
        next(error);
    }
};

// Update the status of a refund
exports.updateRefundStatus = async (req, res, next) => {
    try {
        const [updated] = await Refund.update(
            { status: req.body.status },
            { where: { id: req.params.id } }
        );
        if (!updated) {
            return next(new AppError('Refund not found', 404));
        }
        const updatedRefund = await Refund.findByPk(req.params.id);
        res.status(200).json(updatedRefund);
    } catch (error) {
        logger.error(`Error updating refund status ${req.params.id}:`, error);
        next(error);
    }
};

// Cancel a refund
exports.cancelRefund = async (req, res, next) => {
    try {
        const refund = await Refund.findByPk(req.params.id);
        if (!refund) {
            return next(new AppError('Refund not found', 404));
        }
        if (refund.status === 'cancelled') {
            return next(new AppError('Refund is already cancelled', 400));
        }
        refund.status = 'cancelled';
        await refund.save();
        res.status(200).json(refund);
    } catch (error) {
        logger.error(`Error cancelling refund ${req.params.id}:`, error);
        next(error);
    }
};
