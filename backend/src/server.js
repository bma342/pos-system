const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { AppError, errorHandler } = require('./utils/errorHandler');
const logger = require('./utils/logger');
const routes = require('./routes');
const subdomainMiddleware = require('./middleware/subdomainMiddleware');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Add this before your routes
app.use(subdomainMiddleware);

// Routes
app.use('/api', routes);

// 404 handler
app.use((req, res, next) => {
  next(new AppError('Not Found', 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Handle Sequelize errors
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({ field: e.path, message: e.message }));
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Validation error',
      errors
    });
  }

  // Handle other known errors types here...

  // Generic error response
  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logic...
});

// Uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  // Application specific logic...
  process.exit(1);
});

module.exports = app;
