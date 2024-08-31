const express = require('express');
const twoFactorController = require('../controllers/twoFactorController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Enable 2FA for a user
router.post('/enable', authorize(['user', 'admin']), twoFactorController.enable2FA);

// Disable 2FA for a user
router.post('/disable', authorize(['user', 'admin']), twoFactorController.disable2FA);

// Verify 2FA token
router.post('/verify', twoFactorController.verify2FA);

// Generate backup codes
router.post('/generate-backup-codes', authorize(['user', 'admin']), twoFactorController.generateBackupCodes);

// Verify backup code
router.post('/verify-backup-code', twoFactorController.verifyBackupCode);

// Get 2FA status for a user
router.get('/status', authorize(['user', 'admin']), twoFactorController.get2FAStatus);

module.exports = router;