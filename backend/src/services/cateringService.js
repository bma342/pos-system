const db = require('../models');

exports.getApplicableTax = async (locationId, provider, guestId) => {
  // Implement logic to fetch tax configurations based on location and provider.
  // Placeholder logic for demonstration:
  const taxConfig = await db.TaxConfig.findOne({ where: { locationId, provider, guestId } }); // Updated to include guestId
  if (taxConfig) {
    return { rate: taxConfig.rate, taxId: taxConfig.taxId };
  }

  // Default tax rate and ID if none is configured:
  return { rate: 8.25, taxId: 'DEFAULT_TAX_ID' };
};

// Additional catering-related service functions can be added here.
