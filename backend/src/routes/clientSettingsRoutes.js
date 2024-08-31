const express = require 'express';
const *  = require '../controllers/clientSettingsController';
const { authenticate, authorize } = require '../middleware/auth';

const router = express.Router();

router.use(authenticate);
router.use(authorize(['clientAdmin']));

router.put('/two-factor', clientSettingsController.updateGlobalTwoFactorSetting);
router.put('/location-two-factor-exception', clientSettingsController.updateLocationTwoFactorException);

router.put('/payment-gateways', clientSettingsController.updateGlobalPaymentGateways);
router.put('/location-payment-gateway-exceptions', clientSettingsController.updateLocationPaymentGatewayExceptions);

module.exports = router;