const express = require('express');
const router = express.Router();
const cateringOrderFeesController = require('../controllers/cateringOrderFeesController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), cateringOrderFeesController.getAllFees);
router.post('/', authorizeRoles(1, 2), cateringOrderFeesController.createFee);
router.get('/:id', authorizeRoles(1, 2), cateringOrderFeesController.getFee);
router.put('/:id', authorizeRoles(1, 2), cateringOrderFeesController.updateFee);
router.delete('/:id', authorizeRoles(1, 2), cateringOrderFeesController.deleteFee);

module.exports = router;
