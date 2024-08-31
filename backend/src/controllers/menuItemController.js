const { Request, Response } = require 'express';
const { getMenuItemsByLocation } = require '../services/menuItemService';
const { AppError } = require '../utils/errorHandler';

const getMenuItems = async (req, res) => {
  try {
    const { locationId } = req.params;
    const menuItems = await getMenuItemsByLocation(locationId);
    res.status(200).json(menuItems);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error fetching menu items' });
    }
  }
};