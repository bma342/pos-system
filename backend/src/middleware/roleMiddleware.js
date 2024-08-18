const { Role, Permission, User } = require('../models');

// Middleware for role-based permissions
exports.authorizeRoles = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{ model: Role, include: [Permission] }],
      });

      if (!user || !allowedRoles.includes(user.Role.name)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };
};

// Middleware for permission checks
exports.checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{ model: Role, include: [Permission] }],
      });

      const hasPermission = user.Role.Permissions.some((perm) => perm.name === permissionName);

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access denied. Missing required permissions.' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };
};
