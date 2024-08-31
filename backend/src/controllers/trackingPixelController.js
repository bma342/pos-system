const trackingPixelService = require('../services/trackingPixelService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.createPixel = async (req, res, next) => {
  try {
    const newPixel = await trackingPixelService.createPixel(req.body);
    res.status(201).json(newPixel);
  } catch (error) {
    logger.error('Error creating tracking pixel:', error);
    next(new AppError('Failed to create tracking pixel', 500));
  }
};

exports.getAllPixels = async (req, res, next) => {
  try {
    const pixels = await trackingPixelService.getAllPixels();
    res.status(200).json(pixels);
  } catch (error) {
    logger.error('Error fetching all tracking pixels:', error);
    next(new AppError('Failed to fetch tracking pixels', 500));
  }
};

exports.getPixelById = async (req, res, next) => {
  try {
    const pixel = await trackingPixelService.getPixelById(req.params.id);
    if (!pixel) {
      return next(new AppError('Tracking pixel not found', 404));
    }
    res.status(200).json(pixel);
  } catch (error) {
    logger.error(`Error fetching tracking pixel ${req.params.id}:`, error);
    next(error);
  }
};

exports.updatePixel = async (req, res, next) => {
  try {
    const updatedPixel = await trackingPixelService.updatePixel(req.params.id, req.body);
    if (!updatedPixel) {
      return next(new AppError('Tracking pixel not found', 404));
    }
    res.status(200).json(updatedPixel);
  } catch (error) {
    logger.error(`Error updating tracking pixel ${req.params.id}:`, error);
    next(error);
  }
};

exports.deletePixel = async (req, res, next) => {
  try {
    const result = await trackingPixelService.deletePixel(req.params.id);
    if (!result) {
      return next(new AppError('Tracking pixel not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting tracking pixel ${req.params.id}:`, error);
    next(error);
  }
};

exports.triggerPixel = async (req, res, next) => {
  try {
    const result = await trackingPixelService.triggerPixel(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error triggering tracking pixel ${req.params.id}:`, error);
    next(error);
  }
};
