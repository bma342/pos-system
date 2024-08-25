const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Custom log format
const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create the logger instance
const logger = createLogger({
  level: 'info', // Set the default log level
  format: combine(
    timestamp(),
    errors({ stack: true }), // Capture stack traces for errors
    logFormat
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'logs/combined.log' }), // Log all messages to a file
  ],
});

// Handle unhandled exceptions and rejections
logger.exceptions.handle(
  new transports.File({ filename: 'logs/exceptions.log' })
);
logger.rejections.handle(
  new transports.File({ filename: 'logs/rejections.log' })
);

module.exports = logger;
1~const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Custom log format
const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create the logger instance
const logger = createLogger({
  level: 'info', // Set the default log level
  format: combine(
    timestamp(),
    errors({ stack: true }), // Capture stack traces for errors
    logFormat
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'logs/combined.log' }), // Log all messages to a file
  ],
});

// Handle unhandled exceptions and rejections
logger.exceptions.handle(
  new transports.File({ filename: 'logs/exceptions.log' })
);
logger.rejections.handle(
  new transports.File({ filename: 'logs/rejections.log' })
);

module.exports = logger;
