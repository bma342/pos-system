const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');

// Set Redis host to the service name defined in docker-compose
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis', // Docker service name 'redis'
  port: process.env.REDIS_PORT || 6379, // Default Redis port
});

const app = express();

// Security middleware
app.use(helmet());

// Rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/', apiLimiter);

app.use(cors());
app.use(express.json());

// Registering the routes
const menuRoutes = require('./routes/menuRoutes');
const menuGroupRoutes = require('./routes/menuGroupRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const modifierRoutes = require('./routes/modifierRoutes');
const locationMenuOverrideRoutes = require('./routes/locationMenuOverrideRoutes');
const providerPricingRoutes = require('./routes/providerPricingRoutes');
const locationHoursRoutes = require('./routes/locationHoursRoutes');
const providerIntegrationRoutes = require('./routes/providerIntegrationRoutes');
const posIntegrationRoutes = require('./routes/posIntegrationRoutes');
const locationRoutes = require('./routes/locationRoutes');
const guestRoutes = require('./routes/guestRoutes');
const brandingRoutes = require('./routes/brandingRoutes');
const assetRoutes = require('./routes/assetRoutes');
const imageUploadRoutes = require('./routes/imageUploadRoutes');
const cateringOrderRoutes = require('./routes/cateringOrderRoutes');
const cateringRoutes = require('./routes/cateringRoutes');
const orderHistoryRoutes = require('./routes/orderHistoryRoutes');
const houseAccountRoutes = require('./routes/houseAccountRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const throttleSettingsRoutes = require('./routes/throttleSettingsRoutes');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/locations', locationRoutes);
app.use('/api/pos-integration', posIntegrationRoutes);
app.use('/api/provider-integration', providerIntegrationRoutes);
app.use('/api/location-hours', locationHoursRoutes);
app.use('/api/provider-pricing', providerPricingRoutes);
app.use('/api/location-menu-overrides', locationMenuOverrideRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/menu-groups', menuGroupRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/modifiers', modifierRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/uploads', express.static('src/uploads'));
app.use('/api/invoices', invoiceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/throttle-settings', throttleSettingsRoutes);
app.use('/api/branding', brandingRoutes);
app.use('/api/house-accounts', houseAccountRoutes);
app.use('/api/catering', cateringRoutes);
app.use('/api/order-history', orderHistoryRoutes);
app.use('/api/catering-orders', cateringOrderRoutes);
app.use('/api/images', imageUploadRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/guests', guestRoutes);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

module.exports = app;
