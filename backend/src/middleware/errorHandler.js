const logger = require('../services/logger');

const errorHandler = (err, req, res, next) => {
  // Log error details
  logger.error({
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    requestId: req.headers['x-request-id'],
    userId: req.user ? req.user.id : 'unauthenticated',
    ip: req.ip
  });

  // Operational vs. Critical Error Handling
  if (err.isOperational) {
    // Handle known, operational errors (e.g., validation issues)
    return res.status(err.statusCode || 400).json({
      message: err.message,
      details: err.details,
      errorType: 'operational'
    });
  }

  // Handle unexpected errors (critical)
  const errorResponse = {
    message: 'Internal Server Error',
    errorId: req.headers['x-request-id'],
    errorType: 'critical'
  };

  // Use next() for cases where you might want to pass the error to other error handling middleware
  if (res.headersSent) {
    return next(err);
  }

  // If in development, include the stack trace
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  return res.status(500).json(errorResponse);
};

module.exports = errorHandler;
