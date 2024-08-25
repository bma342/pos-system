const jwt = require('jsonwebtoken');
const db = require('../models');
const logger = require('../services/logger');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.warn('Access denied: No token provided.');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn('Invalid or expired token.');
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
}

function authorizeRoles(...allowedRoles) {
  return async (req, res, next) => {
    try {
      const user = await db.User.findByPk(req.user.id, {
        include: [{ model: db.Role, include: [db.Permission] }],
      });

      if (!user || !allowedRoles.includes(user.Role.name)) {
        logger.warn(`Access denied: Insufficient permissions for user ${req.user.id}`);
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      req.permissions = user.Role.Permissions.map((perm) => perm.name);
      next();
    } catch (error) {
      logger.error(`Error in role authorization: ${error.message}`);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };
}

module.exports = { authenticateToken, authorizeRoles };
