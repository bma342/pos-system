const { User } = require('../models');

const roleBasedAuth = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (user && allowedRoles.includes(user.role)) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error checking user role' });
    }
  };
};

module.exports = roleBasedAuth;