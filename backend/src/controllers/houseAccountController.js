const HouseAccount = require('../models/HouseAccount');
const HouseAccountUser = require('../models/HouseAccountUser');
const houseAccountService = require('../services/houseAccountService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.getHouseAccountsByClient = async (req, res, next) => {
  try {
    const accounts = await houseAccountService.getHouseAccountsByClient(req.params.clientId);
    res.status(200).json(accounts);
  } catch (error) {
    logger.error(`Error fetching house accounts for client ${req.params.clientId}:`, error);
    next(new AppError('Error fetching house accounts', 500));
  }
};

exports.getHouseAccountById = async (req, res, next) => {
  try {
    const account = await houseAccountService.getHouseAccountById(req.params.id);
    if (!account) {
      return next(new AppError('House account not found', 404));
    }
    res.status(200).json(account);
  } catch (error) {
    logger.error(`Error fetching house account ${req.params.id}:`, error);
    next(error);
  }
};

exports.createHouseAccount = async (req, res, next) => {
  try {
    const newAccount = await houseAccountService.createHouseAccount(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    logger.error('Error creating house account:', error);
    next(error);
  }
};

exports.updateHouseAccount = async (req, res, next) => {
  try {
    const updatedAccount = await houseAccountService.updateHouseAccount(req.params.id, req.body);
    if (!updatedAccount) {
      return next(new AppError('House account not found', 404));
    }
    res.status(200).json(updatedAccount);
  } catch (error) {
    logger.error(`Error updating house account ${req.params.id}:`, error);
    next(error);
  }
};

exports.deleteHouseAccount = async (req, res, next) => {
  try {
    const result = await houseAccountService.deleteHouseAccount(req.params.id);
    if (!result) {
      return next(new AppError('House account not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting house account ${req.params.id}:`, error);
    next(error);
  }
};

exports.addFunds = async (req, res, next) => {
  try {
    const updatedAccount = await houseAccountService.addFunds(req.params.id, req.body.amount);
    res.status(200).json(updatedAccount);
  } catch (error) {
    logger.error(`Error adding funds to house account ${req.params.id}:`, error);
    next(error);
  }
};

exports.deductFunds = async (req, res, next) => {
  try {
    const updatedAccount = await houseAccountService.deductFunds(req.params.id, req.body.amount);
    res.status(200).json(updatedAccount);
  } catch (error) {
    logger.error(`Error deducting funds from house account ${req.params.id}:`, error);
    next(error);
  }
};

exports.getTransactionHistory = async (req, res, next) => {
  try {
    const transactions = await houseAccountService.getTransactionHistory(req.params.id);
    res.status(200).json(transactions);
  } catch (error) {
    logger.error(`Error fetching transaction history for house account ${req.params.id}:`, error);
    next(error);
  }
};
