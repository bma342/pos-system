const express = require('express');
const cors = require('cors');
const app = express();
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
app.use('/api/guests', guestRoutes);

app.use(cors());
app.use(express.json());

// Registering the routes
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
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

module.exports = app;

