const express = require('express');
const router = express.Router();
const posIntegrationMappingController = require('../controllers/posIntegrationMappingController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles('Admin', 'Manager'), posIntegrationMappingController.getAllMappings);
router.post('/', authorizeRoles('Admin', 'Manager'), posIntegrationMappingController.createMapping);
router.get('/:id', authorizeRoles('Admin', 'Manager'), posIntegrationMappingController.getMappingById);
router.put('/:id', authorizeRoles('Admin', 'Manager'), posIntegrationMappingController.updateMapping);
router.delete('/:id', authorizeRoles('Admin', 'Manager'), posIntegrationMappingController.deleteMapping);

module.exports = router;
