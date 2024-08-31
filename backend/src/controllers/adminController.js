const { validationResult } = require('express-validator');
const adminService = require('../services/adminService');
const dashboardService = require('../services/dashboardService');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errorHandler');

const validateRequest = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, errors.array());
  }
};

const getDashboardData = async (req, res, next) => {
  try {
    const dashboardData = await dashboardService.getDashboardData();
    res.status(200).json(dashboardData);
  } catch (error) {
    logger.error('Error fetching dashboard data:', error);
    next(new AppError('Error fetching dashboard data', 500));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    logger.error('Error fetching users:', error);
    next(new AppError('Error fetching users', 500));
  }
};

const createUser = async (req, res, next) => {
  try {
    validateRequest(req);
    const newUser = await adminService.createUser(req.body);
    logger.info(`New user created: ${newUser.id}`);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('Error creating user:', error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    validateRequest(req);
    const updatedUser = await adminService.updateUser(req.params.id, req.body);
    logger.info(`User updated: ${req.params.id}`);
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error(`Error updating user ${req.params.id}:`, error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await adminService.deleteUser(req.params.id);
    logger.info(`User deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting user ${req.params.id}:`, error);
    next(error);
  }
};

const getSystemLogs = async (req, res, next) => {
  try {
    const logs = await adminService.getSystemLogs(req.query);
    res.status(200).json(logs);
  } catch (error) {
    logger.error('Error fetching system logs:', error);
    next(new AppError('Error fetching system logs', 500));
  }
};

const getSystemHealth = async (req, res, next) => {
  try {
    const healthData = await adminService.getSystemHealth();
    res.status(200).json(healthData);
  } catch (error) {
    logger.error('Error fetching system health:', error);
    next(new AppError('Error fetching system health', 500));
  }
};

const backupDatabase = async (req, res, next) => {
  try {
    const backupResult = await adminService.backupDatabase();
    logger.info('Database backup initiated');
    res.status(200).json(backupResult);
  } catch (error) {
    logger.error('Error initiating database backup:', error);
    next(new AppError('Error initiating database backup', 500));
  }
};

const restoreDatabase = async (req, res, next) => {
  try {
    validateRequest(req);
    const restoreResult = await adminService.restoreDatabase(req.body.backupId);
    logger.info(`Database restore initiated from backup: ${req.body.backupId}`);
    res.status(200).json(restoreResult);
  } catch (error) {
    logger.error('Error initiating database restore:', error);
    next(new AppError('Error initiating database restore', 500));
  }
};

module.exports = {
  getDashboardData,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSystemLogs,
  getSystemHealth,
  backupDatabase,
  restoreDatabase
};