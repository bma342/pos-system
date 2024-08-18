const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles, checkPermission } = require('../middleware/roleMiddleware');
const roleController = require('../controllers/roleController');

// Routes for managing roles and permissions
router.post('/create-role', authenticateToken, authorizeRoles(['Super Admin']), roleController.createRole);
router.post('/assign-permission', authenticateToken, authorizeRoles(['Super Admin']), roleController.assignPermission);
router.get('/roles', authenticateToken, authorizeRoles(['Super Admin']), roleController.getAllRoles);
router.get('/permissions', authenticateToken, authorizeRoles(['Super Admin']), roleController.getAllPermissions);

module.exports = router;
