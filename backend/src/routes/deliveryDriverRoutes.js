const express = require('express');
const router = express.Router();
const deliveryDriverController = require('../controllers/deliveryDriverController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), deliveryDriverController.getAllDeliveryDrivers);
router.get('/:id', authorizeRoles(1, 2), deliveryDriverController.getDeliveryDriverById);
router.post('/', authorizeRoles(1, 2), deliveryDriverController.createDeliveryDriver);
router.put('/:id', authorizeRoles(1, 2), deliveryDriverController.updateDeliveryDriver);
router.delete('/:id', authorizeRoles(1, 2), deliveryDriverController.deleteDeliveryDriver);

module.exports = router;
