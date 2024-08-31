const speakeasy = require('speakeasy');
const { User, ClientSettings, Location } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const generateSecret = () => {
  return speakeasy.generateSecret({ length: 32 });
};

const verifyToken = (secret, token) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
  });
};

const enableTwoFactor = async (userId) => {
  try {
    const secret = generateSecret();
    await User.update(
      { 
        twoFactorSecret: secret.base32, 
        twoFactorEnabled: true 
      },
      { where: { id: userId } }
    );
    return secret.otpauth_url;
  } catch (error) {
    logger.error(`Error enabling 2FA for user ${userId}:`, error);
    throw new AppError('Failed to enable 2FA', 500);
  }
};

const disableTwoFactor = async (userId) => {
  try {
    await User.update(
      { 
        twoFactorSecret: null, 
        twoFactorEnabled: false 
      },
      { where: { id: userId } }
    );
  } catch (error) {
    logger.error(`Error disabling 2FA for user ${userId}:`, error);
    throw new AppError('Failed to disable 2FA', 500);
  }
};

const isTwoFactorRequired = async (userId, locationId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const clientSettings = await ClientSettings.findOne({ where: { clientId: user.clientId } });
    if (!clientSettings) {
      throw new AppError('Client settings not found', 404);
    }

    const location = await Location.findByPk(locationId);

    if (!clientSettings.twoFactorRequired) {
      return false;
    }

    if (location && location.twoFactorException) {
      return false;
    }

    return true;
  } catch (error) {
    logger.error(`Error checking if 2FA is required for user ${userId} at location ${locationId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to check 2FA requirement', 500);
  }
};

const validateTwoFactor = async (userId, token, locationId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user || !user.twoFactorSecret) {
      return false;
    }

    const isRequired = await isTwoFactorRequired(userId, locationId);
    if (!isRequired) {
      return true; // 2FA is not required, so we consider it valid
    }

    return verifyToken(user.twoFactorSecret, token);
  } catch (error) {
    logger.error(`Error validating 2FA for user ${userId}:`, error);
    throw new AppError('Failed to validate 2FA', 500);
  }
};

module.exports = {
  enableTwoFactor,
  disableTwoFactor,
  isTwoFactorRequired,
  validateTwoFactor
};