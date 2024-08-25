const HouseAccount = require('../models/HouseAccount');
const HouseAccountUser = require('../models/HouseAccountUser');

exports.getHouseAccountsByClient = async (req, res) => {
  try {
    const accounts = await HouseAccount.findAll({ where: { clientId: req.params.clientId } });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching house accounts', error });
  }
};

exports.createHouseAccount = async (req, res) => {
  try {
    const { name, billingType, poNumber, clientId } = req.body;
    const account = await HouseAccount.create({ name, billingType, poNumber, clientId });
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error creating house account', error });
  }
};

exports.addUserToHouseAccount = async (req, res) => {
  try {
    const { userId } = req.body;
    const userAccount = await HouseAccountUser.create({
      userId,
      houseAccountId: req.params.houseAccountId,
    });
    res.status(201).json(userAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user to house account', error });
  }
};

exports.getUsersByHouseAccount = async (req, res) => {
  try {
    const users = await HouseAccountUser.findAll({
      where: { houseAccountId: req.params.houseAccountId },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching house account users', error });
  }
};
