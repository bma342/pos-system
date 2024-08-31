const { Review, MenuItem } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const createReview = async (reviewData) => {
  try {
    const newReview = await Review.create(reviewData);
    logger.info(`New review created with ID: ${newReview.id}`);
    return newReview;
  } catch (error) {
    logger.error('Error creating review:', error);
    throw new AppError('Failed to create review', 500);
  }
};

const getReviewsForMenuItem = async (menuItemId) => {
  try {
    const reviews = await Review.findAll({
      where: { menuItemId },
      include: [{ model: MenuItem, as: 'menuItem' }]
    });
    return reviews;
  } catch (error) {
    logger.error(`Error fetching reviews for menu item ${menuItemId}:`, error);
    throw new AppError('Failed to fetch reviews for menu item', 500);
  }
};

const getReviewById = async (id) => {
  try {
    const review = await Review.findByPk(id, {
      include: [{ model: MenuItem, as: 'menuItem' }]
    });
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    return review;
  } catch (error) {
    logger.error(`Error fetching review with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch review', 500);
  }
};

const updateReview = async (id, reviewData) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    const updatedReview = await review.update(reviewData);
    logger.info(`Review updated with ID: ${id}`);
    return updatedReview;
  } catch (error) {
    logger.error(`Error updating review with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update review', 500);
  }
};

const deleteReview = async (id) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    await review.destroy();
    logger.info(`Review deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting review with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete review', 500);
  }
};

const getAverageRatingForMenuItem = async (menuItemId) => {
  try {
    const result = await Review.findAll({
      where: { menuItemId },
      attributes: [
        [Review.sequelize.fn('AVG', Review.sequelize.col('rating')), 'averageRating']
      ]
    });
    return result[0].get('averageRating') || 0;
  } catch (error) {
    logger.error(`Error calculating average rating for menu item ${menuItemId}:`, error);
    throw new AppError('Failed to calculate average rating', 500);
  }
};

module.exports = {
  createReview,
  getReviewsForMenuItem,
  getReviewById,
  updateReview,
  deleteReview,
  getAverageRatingForMenuItem
};