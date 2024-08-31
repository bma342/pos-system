const express = require('express');
const translatorController = require('../controllers/translatorController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Translate text
router.post('/translate', authorize(['admin', 'manager']), translatorController.translateText);

// Get supported languages
router.get('/languages', authorize(['admin', 'manager']), translatorController.getSupportedLanguages);

// Detect language
router.post('/detect', authorize(['admin', 'manager']), translatorController.detectLanguage);

// Translate menu items
router.post('/translate-menu', authorize(['admin']), translatorController.translateMenu);

// Get translation history
router.get('/history', authorize(['admin', 'manager']), translatorController.getTranslationHistory);

module.exports = router;
