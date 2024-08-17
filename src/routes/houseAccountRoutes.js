const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const HouseAccount = require('../models/HouseAccount');
const HouseAccountUser = require('../models/HouseAccountUser');

// Get all house accounts for a client
router.get('/client/:clientId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const accounts = await HouseAccount.findAll({ where: { clientId: req.params.clientId } });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching house accounts', error });
  }
});

// Create a new house account
router.post('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { name, billingType, poNumber, clientId } = req.body;
    const account = await HouseAccount.create({ name, billingType, poNumber, clientId });
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error creating house account', error });
  }
});

// Add a user to a house account
router.post('/:houseAccountId/users', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { userId } = req.body;
    const userAccount = await HouseAccountUser.create({ userId, houseAccountId: req.params.houseAccountId });
    res.status(201).json(userAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user to house account', error });
  }
});

// Get users for a specific house account
router.get('/:houseAccountId/users', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const users = await HouseAccountUser.findAll({ where: { houseAccountId: req.params.houseAccountId } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching house account users', error });
  }
});

module.exports = router;
