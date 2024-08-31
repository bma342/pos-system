const express = require 'express';
const { login, logout, refreshToken } = require '../controllers/authController';
const { authenticate } = require '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/refresh-token', refreshToken);

module.exports = router;