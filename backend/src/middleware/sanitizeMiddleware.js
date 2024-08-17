const { body } = require('express-validator');

module.exports = [
  body('*').escape(), // Escape HTML entities
  body('*').trim(),   // Trim whitespace
];
