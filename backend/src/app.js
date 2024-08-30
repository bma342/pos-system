const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');
const { authenticateToken } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const sanitizeMiddleware = require('./middleware/sanitizeMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const subdomainMiddleware = require('./middleware/subdomainMiddleware');
const routes = require('./routes');

const app = express();

console.log('Initializing middleware...');

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      `https://${process.env.DOMAIN}`,
      ...process.env.ALLOWED_SUBDOMAINS.split(',').map(sub => `https://${sub}.${process.env.DOMAIN}`),
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

console.log('Setting up Redis session store...');
const redisClient = new Redis(process.env.REDIS_URL);
redisClient.on('error', (err) => console.error('Redis connection error:', err));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  }
}));

console.log('Setting up middleware...');
app.use(sanitizeMiddleware);
app.use(subdomainMiddleware);
app.use(authenticateToken);

console.log('Configuring Swagger...');
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'POS System API',
      version: '1.0.0',
      description: 'API documentation for the POS system',
    },
    servers: [
      { url: `https://${process.env.DOMAIN}`, description: 'API Server' },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log('Loading routes...');
app.use('/api', routes);

// New routes
const cateringMenuRoutes = require('./routes/cateringMenuRoutes');
const cateringMenuItemRoutes = require('./routes/cateringMenuItemRoutes');
const cateringOrderRoutes = require('./routes/cateringOrderRoutes');
const cateringOrderAssignmentsRoutes = require('./routes/cateringOrderAssignmentsRoutes');
const cateringOrderCustomizationRoutes = require('./routes/cateringOrderCustomizationRoutes');

app.use('/api/catering-menus', cateringMenuRoutes);
app.use('/api/catering-menu-items', cateringMenuItemRoutes);
app.use('/api/catering-orders', cateringOrderRoutes);
app.use('/api/catering-order-assignments', cateringOrderAssignmentsRoutes);
app.use('/api/catering-order-customizations', cateringOrderCustomizationRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.use(errorHandler);

console.log('App initialized successfully.');

module.exports = app;

