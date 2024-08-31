const twoFactorService = require('../services/twoFactorService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.enable2FA = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const result = await twoFactorService.enable2FA(userId);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error enabling 2FA:', error);
    next(new AppError('Failed to enable 2FA', 500));
  }
};

exports.disable2FA = async (req, res, next) => {
  try {
    const { userId } = req.user;
    await twoFactorService.disable2FA(userId);
    res.status(200).json({ message: '2FA disabled successfully' });
  } catch (error) {
    logger.error('Error disabling 2FA:', error);
    next(new AppError('Failed to disable 2FA', 500));
  }
};

exports.verify2FA = async (req, res, next) => {
  try {
    const { userId, token } = req.body;
    const isValid = await twoFactorService.verify2FA(userId, token);
    res.status(200).json({ isValid });
  } catch (error) {
    logger.error('Error verifying 2FA token:', error);
    next(new AppError('Failed to verify 2FA token', 500));
  }
};

exports.generateBackupCodes = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const backupCodes = await twoFactorService.generateBackupCodes(userId);
    res.status(200).json({ backupCodes });
  } catch (error) {
    logger.error('Error generating backup codes:', error);
    next(new AppError('Failed to generate backup codes', 500));
  }
};

exports.verifyBackupCode = async (req, res, next) => {
  try {
    const { userId, backupCode } = req.body;
    const isValid = await twoFactorService.verifyBackupCode(userId, backupCode);
    res.status(200).json({ isValid });
  } catch (error) {
    logger.error('Error verifying backup code:', error);
    next(new AppError('Failed to verify backup code', 500));
  }
};

exports.get2FAStatus = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const status = await twoFactorService.get2FAStatus(userId);
    res.status(200).json(status);
  } catch (error) {
    logger.error('Error fetching 2FA status:', error);
    next(new AppError('Failed to fetch 2FA status', 500));
  }
};