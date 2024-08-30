const express = require('express');
const router = express.Router();
const guestDiscountsController = require('../controllers/guestDiscountsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), guestDiscountsController.getAllGuestDiscounts);
router.get('/:id', authorizeRoles(1, 2), guestDiscountsController.getGuestDiscountById);
router.post('/', authorizeRoles(1, 2), guestDiscountsController.createGuestDiscount);
router.put('/:id', authorizeRoles(1, 2), guestDiscountsController.updateGuestDiscount);
router.delete('/:id', authorizeRoles(1, 2), guestDiscountsController.deleteGuestDiscount);

module.exports = router;
