const express = require('express');
const router = express.Router();
const itemReviewController = require('../controllers/itemReviewController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), itemReviewController.getAllItemReviews);
router.get('/:id', authorizeRoles(1, 2), itemReviewController.getItemReviewById);
router.post('/', authorizeRoles(1, 2), itemReviewController.createItemReview);
router.put('/:id', authorizeRoles(1, 2), itemReviewController.updateItemReview);
router.delete('/:id', authorizeRoles(1, 2), itemReviewController.deleteItemReview);

module.exports = router;
