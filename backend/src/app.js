const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');
const { authenticateToken } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const sanitizeMiddleware = require('./middleware/sanitizeMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const subdomainMiddleware = require('./middleware/subdomainMiddleware'); // Import the subdomain middleware
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

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(subdomainMiddleware); // Apply the subdomain middleware globally
app.use(sanitizeMiddleware);

// Set Redis host to the service name defined in docker-compose
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379,
});

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

// Import your routes here
const menuRoutes = require('./routes/menuRoutes');
const posIntegrationRoutes = require('./routes/posIntegrationRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const discountsRoutes = require('./routes/discountsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const loyaltyRoutes = require('./routes/loyaltyRoutes');
const clientRoutes = require('./routes/clientRoutes');
const roleRoutes = require('./routes/roleRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Mock secure route for testing
app.get('/api/secure-endpoint', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Access granted' });
});

// Registering the routes
app.use('/api/menus', menuRoutes);
app.use('/api/pos-integration', posIntegrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/discounts', discountsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/reports', reportRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
