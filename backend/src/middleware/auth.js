const jwt = require('jsonwebtoken');
const db = require('../models');

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
}

// Role-based authorization middleware
function authorizeRoles(...allowedRoles) {
  return async (req, res, next) => {
    try {
      const user = await db.User.findByPk(req.user.id, {
        include: [{ model: db.Role, attributes: ['name', 'permissions'] }],
      });

      if (!user || !allowedRoles.includes(user.Role.name)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = { authenticateToken, authorizeRoles };
