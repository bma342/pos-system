const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Create a new review
router.post('/', authorize(['customer', 'admin']), reviewController.createReview);

// Get reviews for a menu item
router.get('/menuItem/:menuItemId', reviewController.getReviewsForMenuItem);

// Get a specific review
router.get('/:id', reviewController.getReviewById);

// Update a review
router.put('/:id', authorize(['customer', 'admin']), reviewController.updateReview);

// Delete a review
router.delete('/:id', authorize(['admin']), reviewController.deleteReview);

// Get average rating for a menu item
router.get('/menuItem/:menuItemId/averageRating', reviewController.getAverageRatingForMenuItem);

module.exports = router;