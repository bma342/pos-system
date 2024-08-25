const Permission = require('../models/Permission');

exports.checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userPermissions = req.user.permissions;
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ message: 'You do not have the required permission.' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Permission check failed', error });
    }
  };
};
