const Permission = require('../models/Permission');
const User = require('../models/User');
const logger = require('../services/logger');

exports.checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userPermissions = req.user.permissions;

      const permissionDetails = await Permission.findOne({ where: { name: requiredPermission } });

      if (!permissionDetails) {
        logger.error(`Required permission ${requiredPermission} not found in the database`);
        return res.status(500).json({ message: 'Permission check failed: Invalid permission' });
      }

      if (!userPermissions.includes(permissionDetails.id)) {
        logger.warn(`User ${req.user.id} denied access: missing permission ${requiredPermission}`);
        return res.status(403).json({ message: 'You do not have the required permission.' });
      }

      logger.info(`User ${req.user.id} granted access: has permission ${requiredPermission}`);
      next();
    } catch (error) {
      logger.error(`Permission check failed: ${error.message}`);
      res.status(500).json({ message: 'Permission check failed', error: error.message });
    }
  };
};

exports.hasPermission = async (userId, requiredPermission) => {
  try {
    const user = await User.findByPk(userId, { include: ['permissions'] });
    if (!user) {
      logger.error(`User with ID ${userId} not found`);
      return false;
    }

    const permissionDetails = await Permission.findOne({ where: { name: requiredPermission } });

    if (!permissionDetails) {
      logger.error(`Required permission ${requiredPermission} not found in the database`);
      return false;
    }

    return user.permissions.some(p => p.id === permissionDetails.id);
  } catch (error) {
    logger.error(`Error checking permission for user ${userId}: ${error.message}`);
    return false;
  }
};

module.exports = exports;
