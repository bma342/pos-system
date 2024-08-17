const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');
const { authenticateToken } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const sanitizeMiddleware = require('./middleware/sanitizeMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Add this line for database connection
const sequelize = require('./config/database');

const app = express();

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error connecting to the database:', err));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'POS System API',
      version: '1.0.0',
      description: 'API documentation for the POS system',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development server' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to your route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sanitize all incoming requests
app.use(sanitizeMiddleware);

// Set Redis host to the service name defined in docker-compose
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379,
});

// Security middleware
app.use(helmet());

// Rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use('/api/auth/', authLimiter);
app.use('/api/', apiLimiter);
app.use(cors());
app.use(express.json());

// Mock secure route for testing
app.get('/api/secure-endpoint', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Access granted' });
});

// Registering the routes
const menuRoutes = require('./routes/menuRoutes');
const posIntegrationRoutes = require('./routes/posIntegrationRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/menus', menuRoutes);
app.use('/api/pos-integration', posIntegrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Global error handler
app.use(errorHandler);

module.exports = app;
