const express = require('express');
const router = express.Router();
const discountItemController = require('../controllers/discountItemController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), discountItemController.getAllDiscountItems);
router.get('/:id', authorizeRoles(1, 2), discountItemController.getDiscountItemById);
router.post('/', authorizeRoles(1, 2), discountItemController.createDiscountItem);
router.put('/:id', authorizeRoles(1, 2), discountItemController.updateDiscountItem);
router.delete('/:id', authorizeRoles(1, 2), discountItemController.deleteDiscountItem);

module.exports = router;

