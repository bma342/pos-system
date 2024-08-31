const cateringService = require('../services/cateringService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getCateringMenu = async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const menu = await cateringService.getCateringMenu(locationId, req.user.clientId);
    res.status(200).json(menu);
  } catch (error) {
    logger.error(`Error fetching catering menu for location ${req.params.locationId}:`, error);
    next(new AppError('Error fetching catering menu', 500));
  }
};

const createCateringOrder = async (req, res, next) => {
  try {
    const order = await cateringService.createCateringOrder(req.body, req.user.clientId);
    res.status(201).json(order);
  } catch (error) {
    logger.error('Error creating catering order:', error);
    next(new AppError('Error creating catering order', 500));
  }
};

const getCateringOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await cateringService.getCateringOrderDetails(orderId, req.user.clientId);
    res.status(200).json(order);
  } catch (error) {
    logger.error(`Error fetching catering order details for order ${req.params.orderId}:`, error);
    next(new AppError('Error fetching catering order details', 500));
  }
};

const updateCateringOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = await cateringService.updateCateringOrderStatus(orderId, status, req.user.clientId);
    res.status(200).json(updatedOrder);
  } catch (error) {
    logger.error(`Error updating catering order status for order ${req.params.orderId}:`, error);
    next(new AppError('Error updating catering order status', 500));
  }
};

const getAllCateringOrders = async (req, res, next) => {
  try {
    const orders = await cateringService.getAllCateringOrders(req.user.clientId);
    res.status(200).json(orders);
  } catch (error) {
    logger.error('Error fetching all catering orders:', error);
    next(new AppError('Error fetching catering orders', 500));
  }
};

const upsertCateringMenuItem = async (req, res, next) => {
  try {
    const menuItem = await cateringService.upsertCateringMenuItem(req.body, req.user.clientId);
    res.status(201).json(menuItem);
  } catch (error) {
    logger.error('Error upserting catering menu item:', error);
    next(new AppError('Error upserting catering menu item', 500));
  }
};

const deleteCateringMenuItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    await cateringService.deleteCateringMenuItem(itemId, req.user.clientId);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting catering menu item ${req.params.itemId}:`, error);
    next(new AppError('Error deleting catering menu item', 500));
  }
};

module.exports = {
  getCateringMenu,
  createCateringOrder,
  getCateringOrderDetails,
  updateCateringOrderStatus,
  getAllCateringOrders,
  upsertCateringMenuItem,
  deleteCateringMenuItem
};