const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

const logFormat = printf(({ timestamp, level, message, stack }) => 
  `${timestamp} [${level}]: ${stack || message}`
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'logs/rejections.log' })
  ],
});

module.exports = logger;
