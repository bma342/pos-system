const { Request, Response } = require ('express');
const { getMenuItems, checkInventory } = require ('../services/menuService');
const { createOrder } = require('../services/orderService');
const { calculatePrepTime, formatEstimatedTime } = require('../services/orderPrepService');
const guestService = require('../services/guestService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getMenuController = async (req, res) => {
  try {
    const { locationId } = req.params;
    const menuItems = await getMenuItems(parseInt(locationId));
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items' });
  }
};

const checkInventoryController = async (req, res) => {
  try {
    const { items } = req.body;
    const inventoryStatus = await checkInventory(items);
    res.status(200).json(inventoryStatus);
  } catch (error) {
    res.status(500).json({ message: 'Error checking inventory' });
  }
};

const createOrderController = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};

const getEstimatedPrepTimeController = async (req, res) => {
  try {
    const { items, locationId } = req.body;
    const prepTime = await calculatePrepTime({ items, locationId });
    const estimatedTime = formatEstimatedTime(prepTime);
    res.status(200).json({ estimatedTime });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating estimated prep time' });
  }
};

const getAllGuests = async (req, res, next) => {
  try {
    const guests = await guestService.getAllGuests(req.user.clientId);
    res.status(200).json(guests);
  } catch (error) {
    logger.error('Error fetching all guests:', error);
    next(new AppError('Failed to fetch guests', 500));
  }
};

const getGuestById = async (req, res, next) => {
  try {
    const guest = await guestService.getGuestById(req.params.id, req.user.clientId);
    if (!guest) {
      return next(new AppError('Guest not found', 404));
    }
    res.status(200).json(guest);
  } catch (error) {
    logger.error(`Error fetching guest ${req.params.id}:`, error);
    next(error);
  }
};

const createGuest = async (req, res, next) => {
  try {
    const newGuest = await guestService.createGuest(req.body, req.user.clientId);
    res.status(201).json(newGuest);
  } catch (error) {
    logger.error('Error creating guest:', error);
    next(error);
  }
};

const updateGuest = async (req, res, next) => {
  try {
    const updatedGuest = await guestService.updateGuest(req.params.id, req.body, req.user.clientId);
    if (!updatedGuest) {
      return next(new AppError('Guest not found', 404));
    }
    res.status(200).json(updatedGuest);
  } catch (error) {
    logger.error(`Error updating guest ${req.params.id}:`, error);
    next(error);
  }
};

const deleteGuest = async (req, res, next) => {
  try {
    const result = await guestService.deleteGuest(req.params.id, req.user.clientId);
    if (!result) {
      return next(new AppError('Guest not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting guest ${req.params.id}:`, error);
    next(error);
  }
};

module.exports = {
  getAllGuests,
  getGuestById,
  createGuest,
  updateGuest,
  deleteGuest
};