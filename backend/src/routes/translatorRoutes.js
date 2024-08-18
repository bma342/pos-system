const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const translatorController = require('../controllers/translatorController');

// Translator routes for syncing orders and managing payloads
router.post('/sync-order', authenticateToken, translatorController.syncOrder);

module.exports = router;
