const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const userService = require('../services/userService');
const { UnauthorizedError } = require('../utils/errors');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userService.getUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  // In a stateless JWT setup, we don't need to do anything server-side for logout
  res.json({ message: 'Logged out successfully' });
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const verifyPhone = async (req, res, next) => {
  // Implement phone verification logic
};

const requestLoginCode = async (req, res, next) => {
  // Implement login code request logic
};

const loginWithCode = async (req, res, next) => {
  // Implement login with code logic
};

module.exports = {
  login,
  register,
  logout,
  getUser,
  verifyPhone,
  requestLoginCode,
  loginWithCode,
};