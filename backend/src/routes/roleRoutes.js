const express = require('express');
const roleController = require('../controllers/roleController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Create a new role
router.post('/create-role', authorize(['Super Admin']), roleController.createRole);

// Get all roles
router.get('/', authorize(['Super Admin', 'Admin']), roleController.getAllRoles);

// Get a specific role
router.get('/:id', authorize(['Super Admin', 'Admin']), roleController.getRoleById);

// Update a role
router.put('/:id', authorize(['Super Admin']), roleController.updateRole);

// Delete a role
router.delete('/:id', authorize(['Super Admin']), roleController.deleteRole);

// Assign a role to a user
router.post('/assign', authorize(['Super Admin', 'Admin']), roleController.assignRole);

// Remove a role from a user
router.post('/remove', authorize(['Super Admin', 'Admin']), roleController.removeRole);

// Get roles for a specific user
router.get('/user/:userId', authorize(['Super Admin', 'Admin']), roleController.getUserRoles);

// Assign permission to a role
router.post('/assign-permission', authorize(['Super Admin']), roleController.assignPermission);

// Get all permissions
router.get('/permissions', authorize(['Super Admin', 'Admin']), roleController.getAllPermissions);

// Assign role template
router.post('/assign-template', authorize(['Super Admin']), roleController.assignRoleTemplate);

module.exports = router;
