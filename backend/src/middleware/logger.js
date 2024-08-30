const winston = require('winston');
const { createLogger, format, transports } = winston;

// Define custom format for logs
const customFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Create a logger instance
const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/application.log' }), // Ensure correct log file path
  ],
});

module.exports = logger;
