const logger = require('../services/logger');

const errorHandler = (err, req, res, next) => {
  // Log error details
  logger.error({
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    requestId: req.headers['x-request-id'],
  });

  // Operational vs. Critical Error Handling
  if (err.isOperational) {
    // Handle known, operational errors (e.g., validation issues)
    return res.status(err.statusCode || 400).json({ message: err.message, details: err.details });
  }

  // Handle unexpected errors (critical)
  return res.status(500).json({ message: 'Internal Server Error', errorId: req.headers['x-request-id'] });
};

module.exports = errorHandler;
