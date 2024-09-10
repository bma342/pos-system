const express = require('express');
const orderProviderController = require('../controllers/orderProviderController');
const roleBasedAuth = require('../middleware/roleBasedAuth');

const router = express.Router();

router.get('/:locationId/order-providers', roleBasedAuth(['admin', 'manager']), orderProviderController.getOrderProviders);
router.get('/:locationId/order-providers/:providerId', roleBasedAuth(['admin', 'manager']), orderProviderController.getOrderProvider);
router.put('/:locationId/order-providers/:providerId', roleBasedAuth(['admin']), orderProviderController.updateOrderProvider);

module.exports = router;