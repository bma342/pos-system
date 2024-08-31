const express = require('express');
const { authenticate } = require('../middleware/auth');

// Import all route files
const authRoutes = require('./authRoutes');
const locationRoutes = require('./locationRoutes');
const menuRoutes = require('./menuRoutes');
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const posRoutes = require('./posRoutes');
const abTestRoutes = require('./abTestRoutes');
const adminRoutes = require('./adminRoutes');
const assetRoutes = require('./assetRoutes');
const brandingRoutes = require('./brandingRoutes');
const campaignRoutes = require('./campaignResultRoutes');
const categoryRoutes = require('./categoryRoutes');
const cateringRoutes = require('./cateringRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const clientRoutes = require('./clientRoutes');
const commissaryRoutes = require('./commissaryKitchenRoutes');
const discountRoutes = require('./discountRoutes');
const driverRoutes = require('./deliveryDriverRoutes');
const featureManagementRoutes = require('./featureManagementRoutes');
const guestRoutes = require('./guestRoutes');
const houseAccountRoutes = require('./houseAccountRoutes');
const imageUploadRoutes = require('./imageUploadRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const loyaltyRoutes = require('./loyaltyRoutes');
const paymentRoutes = require('./paymentRoutes');
const providerRoutes = require('./providerRoutes');
const refundRoutes = require('./refundRoutes');
const reportRoutes = require('./reportRoutes');
const reviewRoutes = require('./reviewRoutes');
const roleRoutes = require('./roleRoutes');
const serviceFeeRoutes = require('./serviceFeeRoutes');
const tabletRoutes = require('./tabletRoutes');
const taxRoutes = require('./taxRoutes');
const tipRoutes = require('./tipRoutes');
const trackingPixelRoutes = require('./trackingPixelRoutes');
const translatorRoutes = require('./translatorRoutes');
const twoFactorRoutes = require('./twoFactorRoutes');
const walletRoutes = require('./walletRoutes');
const campaignResultRoutes = require('./campaignResultRoutes');

const router = express.Router();

// Public routes
router.use('/auth', authRoutes);
router.use('/two-factor', twoFactorRoutes);

// Apply authentication middleware to all routes below
router.use(authenticate);

// Protected routes
router.use('/locations', locationRoutes);
router.use('/menu', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/pos', posRoutes);
router.use('/ab-test', abTestRoutes);
router.use('/admin', adminRoutes);
router.use('/assets', assetRoutes);
router.use('/branding', brandingRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/categories', categoryRoutes);
router.use('/catering', cateringRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/clients', clientRoutes);
router.use('/commissary', commissaryRoutes);
router.use('/discounts', discountRoutes);
router.use('/drivers', driverRoutes);
router.use('/features', featureManagementRoutes);
router.use('/guests', guestRoutes);
router.use('/house-accounts', houseAccountRoutes);
router.use('/images', imageUploadRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/loyalty', loyaltyRoutes);
router.use('/payments', paymentRoutes);
router.use('/providers', providerRoutes);
router.use('/refunds', refundRoutes);
router.use('/reports', reportRoutes);
router.use('/reviews', reviewRoutes);
router.use('/roles', roleRoutes);
router.use('/service-fees', serviceFeeRoutes);
router.use('/tablet', tabletRoutes);
router.use('/taxes', taxRoutes);
router.use('/tips', tipRoutes);
router.use('/tracking', trackingPixelRoutes);
router.use('/translator', translatorRoutes);
router.use('/wallets', walletRoutes);
router.use('/campaign-results', campaignResultRoutes);

module.exports = router;
