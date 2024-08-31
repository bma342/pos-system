const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { body } = require('express-validator');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Apply authorization middleware to all routes
router.use(authorize(['clientAdmin', 'superAdmin']));

// Dashboard data
router.get('/dashboard', adminController.getDashboardData);

// User management
router.get('/users', adminController.getUsers);
router.post('/users', [
  body('username').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['user', 'admin', 'clientAdmin', 'superAdmin'])
], adminController.createUser);
router.put('/users/:id', [
  body('username').optional().isString(),
  body('email').optional().isEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('role').optional().isIn(['user', 'admin', 'clientAdmin', 'superAdmin'])
], adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// System logs
router.get('/logs', adminController.getSystemLogs);

// System health
router.get('/health', adminController.getSystemHealth);

// Database operations
router.post('/backup', adminController.backupDatabase);
router.post('/restore', [
  body('backupId').isString().notEmpty()
], adminController.restoreDatabase);

module.exports = router;