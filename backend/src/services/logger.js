const winston = require('winston');

// Customize log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

// Set up log level based on environment
const level = () => {
  return process.env.NODE_ENV === 'development' ? 'debug' : 'info';
};

// Configure the Winston logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

// Middleware to add request ID and user information to log metadata
logger.add(new winston.transports.Console({
  format: winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const requestId = meta.req && meta.req.headers['x-request-id'];
    const userId = meta.req && meta.req.user && meta.req.user.id;
    return `${timestamp} [${level}] [Request ID: ${requestId || 'N/A'}] [User ID: ${userId || 'N/A'}]: ${message}`;
  }),
}));

module.exports = logger;
