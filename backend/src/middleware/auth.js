const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');
const { User, Role } = require('../models');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(new AppError('Authentication required', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, { include: Role });

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Invalid token', 401));
  }
};

const authorizeGlobalAdmin = (req, res, next) => {
  if (req.user.Role.name !== 'GLOBAL_ADMIN') {
    return next(new AppError('Access denied. Global Admin rights required.', 403));
  }
  next();
};

module.exports = { authenticate, authorizeGlobalAdmin };