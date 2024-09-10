const { Request, Response } = require 'express';
const orderProviderService = require('../services/orderProviderService');
const { AppError } = require '../utils/errorHandler';

const createOrderProviderController = async (req, res) => {
  try {
    const { locationId } = req.params;
    const newProvider = await orderProviderService.createOrderProvider(parseInt(locationId), req.body);
    res.status(201).json(newProvider);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error creating order provider' });
    }
  }
};

const updateOrderProviderController = async (req, res) => {
  try {
    const updatedProvider = await orderProviderService.updateOrderProvider(parseInt(req.params.id), req.body);
    res.status(200).json(updatedProvider);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error updating order provider' });
    }
  }
};

const getOrderProvidersController = async (req, res) => {
  try {
    const providers = await orderProviderService.getOrderProviders(parseInt(req.params.locationId));
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order providers' });
  }
};

const deleteOrderProviderController = async (req, res) => {
  try {
    await orderProviderService.deleteOrderProvider(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error deleting order provider' });
    }
  }
};

const handleIncomingOrderController = async (req, res) => {
  try {
    const { providerId } = req.params;
    const orderData = req.body;
    const processedOrder = await orderProviderService.processIncomingOrder(parseInt(providerId), orderData);
    res.status(200).json(processedOrder);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error processing incoming order' });
    }
  }
};

const createLocationMenuController = async (req, res) => {
  try {
    const { locationId } = req.params;
    const newMenu = await orderProviderService.createLocationMenu(parseInt(locationId), req.body);
    res.status(201).json(newMenu);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error creating location menu' });
    }
  }
};

// ... add other controllers for updateLocationMenu, getLocationMenus, deleteLocationMenu

exports.getOrderProviders = async (req, res) => {
  try {
    const providers = await orderProviderService.getOrderProviders(req.params.locationId);
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order providers' });
  }
};

exports.getOrderProvider = async (req, res) => {
  try {
    const provider = await orderProviderService.getOrderProvider(req.params.locationId, req.params.providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Order provider not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order provider' });
  }
};

exports.updateOrderProvider = async (req, res) => {
  try {
    const updatedProvider = await orderProviderService.updateOrderProvider(req.params.locationId, req.params.providerId, req.body);
    res.json(updatedProvider);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order provider' });
  }
};