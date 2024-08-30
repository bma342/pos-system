const express = require('express');
const router = express.Router();
const locationTaxConfigController = require('../controllers/locationTaxConfigController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), locationTaxConfigController.getAllLocationTaxConfigs);
router.get('/:id', authorizeRoles(1, 2), locationTaxConfigController.getLocationTaxConfigById);
router.post('/', authorizeRoles(1, 2), locationTaxConfigController.createLocationTaxConfig);
router.put('/:id', authorizeRoles(1, 2), locationTaxConfigController.updateLocationTaxConfig);
router.delete('/:id', authorizeRoles(1, 2), locationTaxConfigController.deleteLocationTaxConfig);

module.exports = router;
