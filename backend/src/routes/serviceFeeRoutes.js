const express = require('express');
const router = express.Router();
const serviceFeeController = require('../controllers/serviceFeeController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles('Admin', 'Manager'), serviceFeeController.getAllServiceFees);
router.post('/', authorizeRoles('Admin', 'Manager'), serviceFeeController.createServiceFee);
router.get('/:id', authorizeRoles('Admin', 'Manager'), serviceFeeController.getServiceFeeById);
router.put('/:id', authorizeRoles('Admin', 'Manager'), serviceFeeController.updateServiceFee);
router.delete('/:id', authorizeRoles('Admin', 'Manager'), serviceFeeController.deleteServiceFee);

module.exports = router;
