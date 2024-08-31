const reviewService = require('../services/reviewService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await reviewService.createReview(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    logger.error('Error creating review:', error);
    next(new AppError('Failed to create review', 500));
  }
};

exports.getReviewsForMenuItem = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviewsForMenuItem(req.params.menuItemId);
    res.status(200).json(reviews);
  } catch (error) {
    logger.error(`Error fetching reviews for menu item ${req.params.menuItemId}:`, error);
    next(error);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      return next(new AppError('Review not found', 404));
    }
    res.status(200).json(review);
  } catch (error) {
    logger.error(`Error fetching review ${req.params.id}:`, error);
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const updatedReview = await reviewService.updateReview(req.params.id, req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    logger.error(`Error updating review ${req.params.id}:`, error);
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting review ${req.params.id}:`, error);
    next(error);
  }
};

exports.getAverageRatingForMenuItem = async (req, res, next) => {
  try {
    const averageRating = await reviewService.getAverageRatingForMenuItem(req.params.menuItemId);
    res.status(200).json({ averageRating });
  } catch (error) {
    logger.error(`Error fetching average rating for menu item ${req.params.menuItemId}:`, error);
    next(error);
  }
};