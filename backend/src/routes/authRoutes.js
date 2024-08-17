const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Register a new user
router.post(
  '/register',
  [
    check('username', 'Username is required and should be alphanumeric.')
      .not().isEmpty().isAlphanumeric(),
    check('email', 'Please include a valid email.')
      .isEmail().normalizeEmail(),
    check('phone', 'Please include a valid phone number.')
      .isMobilePhone(),
    check('password', 'Password must be at least 8 characters and include one uppercase letter, one lowercase letter, and a number.')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
  ],
  AuthController.register
);

// Verify phone number
router.post('/verify-phone', AuthController.verifyPhone);

// Request login code
router.post('/request-login-code', AuthController.requestLoginCode);

// Login with code
router.post('/login-with-code', AuthController.loginWithCode);

// Login a user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  AuthController.login
);

module.exports = router;
