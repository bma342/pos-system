const { Request, Response } = require ('express');
const orderService = require ('../services/orderService');
const tabletService = require('../services/tabletService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getActiveOrdersController = async (req, res) => {
  try {
    const activeOrders = await orderService.getActiveOrders();
    res.status(200).json(activeOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active orders' });
  }
};

const cancelOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;
    await orderService.cancelOrder(orderId);
    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order' });
  }
};

const markItemOutOfStockController = async (req, res) => {
  try {
    const { itemId } = req.params;
    await orderService.markItemOutOfStock(itemId);
    res.status(200).json({ message: 'Item marked  of stock' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking item  of stock' });
  }
};

exports.getAllTablets = async (req, res, next) => {
  try {
    const tablets = await tabletService.getAllTablets();
    res.status(200).json(tablets);
  } catch (error) {
    logger.error('Error fetching all tablets:', error);
    next(new AppError('Failed to fetch tablets', 500));
  }
};

exports.getTabletById = async (req, res, next) => {
  try {
    const tablet = await tabletService.getTabletById(req.params.id);
    if (!tablet) {
      return next(new AppError('Tablet not found', 404));
    }
    res.status(200).json(tablet);
  } catch (error) {
    logger.error(`Error fetching tablet ${req.params.id}:`, error);
    next(error);
  }
};

exports.createTablet = async (req, res, next) => {
  try {
    const newTablet = await tabletService.createTablet(req.body);
    res.status(201).json(newTablet);
  } catch (error) {
    logger.error('Error creating tablet:', error);
    next(new AppError('Failed to create tablet', 500));
  }
};

exports.updateTablet = async (req, res, next) => {
  try {
    const updatedTablet = await tabletService.updateTablet(req.params.id, req.body);
    if (!updatedTablet) {
      return next(new AppError('Tablet not found', 404));
    }
    res.status(200).json(updatedTablet);
  } catch (error) {
    logger.error(`Error updating tablet ${req.params.id}:`, error);
    next(error);
  }
};

exports.deleteTablet = async (req, res, next) => {
  try {
    const result = await tabletService.deleteTablet(req.params.id);
    if (!result) {
      return next(new AppError('Tablet not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting tablet ${req.params.id}:`, error);
    next(error);
  }
};

exports.getTabletsByLocation = async (req, res, next) => {
  try {
    const tablets = await tabletService.getTabletsByLocation(req.params.locationId);
    res.status(200).json(tablets);
  } catch (error) {
    logger.error(`Error fetching tablets for location ${req.params.locationId}:`, error);
    next(error);
  }
};

exports.syncTabletData = async (req, res, next) => {
  try {
    const result = await tabletService.syncTabletData(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error syncing data for tablet ${req.params.id}:`, error);
    next(error);
  }
};