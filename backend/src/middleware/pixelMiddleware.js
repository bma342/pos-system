const db = require('../models');

async function applyTrackingPixels(req, res, next) {
  try {
    const { locationId } = req.client; // Assuming locationId is set by subdomainMiddleware
    const globalPixels = await db.TrackingPixel.findAll({ where: { isGlobal: true } });
    const locationPixels = await db.TrackingPixel.findAll({ where: { locationId } });

    req.trackingPixels = [...globalPixels, ...locationPixels];
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error loading tracking pixels', error });
  }
}

module.exports = applyTrackingPixels;
