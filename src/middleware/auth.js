const jwt = require('jsonwebtoken');

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

// Role-based authorization middleware
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.roleId)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required permissions.' });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
