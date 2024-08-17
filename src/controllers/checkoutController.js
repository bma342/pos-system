const LocationMenuOverride = require('../models/LocationMenuOverride');
const ProviderPricing = require('../models/ProviderPricing');

// Handle checkout logic
const checkout = async (req, res) => {
  const { items, paymentMethod } = req.body;

  try {
    let totalCurrencyPrice = 0;
    let totalPointsPrice = 0;

    for (const item of items) {
      const locationOverride = await LocationMenuOverride.findOne({ where: { menuItemId: item.menuItemId, locationId: item.locationId } });

      if (!locationOverride) {
        return res.status(400).json({ message: `Item ${item.menuItemId} not available for this location.` });
      }

      if (paymentMethod === 'currency') {
        // Calculate price with potential uplift
        let price = locationOverride.price;
        if (locationOverride.applyUplift) {
          const providerPricing = await ProviderPricing.findOne({ where: { locationMenuOverrideId: locationOverride.id } });
          if (providerPricing) {
            price += (price * providerPricing.upliftPercentage) / 100;
            price = applyRoundingIfNeeded(price);
          }
        }
        totalCurrencyPrice += price;
      } else if (paymentMethod === 'points') {
        // Only use points price
        totalPointsPrice += locationOverride.pointsPrice;
      } else if (paymentMethod === 'mixed') {
        // Support both currency and points
        totalCurrencyPrice += locationOverride.price;
        totalPointsPrice += locationOverride.pointsPrice;
      }
    }

    res.json({
      totalCurrencyPrice,
      totalPointsPrice,
      message: 'Checkout calculated successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during checkout', error });
  }
};

// Apply rounding if configured
function
