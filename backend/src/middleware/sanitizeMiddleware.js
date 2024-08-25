const { body } = require('express-validator');

module.exports = [
  // Escape HTML entities and trim whitespace
  body('*').escape().trim(),

  // Custom sanitization for email fields
  body('email').normalizeEmail(),

  // Custom sanitization for phone number fields
  body('phone').trim().escape().customSanitizer(value => value.replace(/[^0-9]/g, '')),

  // Additional custom sanitization based on specific model requirements
  body('address').optional().trim().escape(),

  // Use a different approach for sanitizing fields like price
  body('price').toFloat(),
];

