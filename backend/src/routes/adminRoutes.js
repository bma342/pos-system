const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const roleController = require('../controllers/roleController');
const permissionController = require('../controllers/permissionController');

const router = express.Router();

// Role and Permission Routes
router.get('/roles', authenticateToken, authorizeRoles('Admin'), roleController.getAllRoles);
router.post('/roles', authenticateToken, authorizeRoles('Super Admin'), roleController.createRole);
router.put('/roles/:id', authenticateToken, authorizeRoles('Super Admin'), roleController.assignPermission);

router.get('/permissions', authenticateToken, authorizeRoles('Admin'), permissionController.getAllPermissions);
router.post('/permissions', authenticateToken, authorizeRoles('Super Admin'), permissionController.createPermission);
router.put('/permissions/:id', authenticateToken, authorizeRoles('Super Admin'), permissionController.updatePermission);
router.delete('/permissions/:id', authenticateToken, authorizeRoles('Super Admin'), permissionController.deletePermission);

module.exports = router;
