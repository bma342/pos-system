const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const userService = require('../services/userService');
const { UnauthorizedError } = require('../utils/errors');
const Client = require('../models/Client'); // Assuming Client model is defined

const login = async (req, res) => {
  const { email, password } = req.body;
  const { subdomain } = req.params; // Assuming subdomain is passed as a route parameter

  try {
    const client = await Client.findOne({ subdomain });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const user = await User.findOne({ email, clientId: client._id });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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