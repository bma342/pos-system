const db = require('../models');

class TaxService {
  // Get applicable tax rate based on location and provider
  async getApplicableTax(locationId, provider, guestId = null) {
    try {
      const locationTaxConfig = await db.LocationTaxConfig.findOne({
        where: { locationId, provider },
      });

      // Check for tax exemption (e.g., non-profit catering accounts)
      if (guestId) {
        const guest = await db.Guest.findByPk(guestId);
        if (guest && guest.taxExempt) {
          return { rate: 0, taxId: guest.taxIdNumber };
        }
      }

      // If no specific tax config is found for this provider, use the default tax rate
      if (!locationTaxConfig) {
        return { rate: 0, taxId: null };
      }

      return { rate: locationTaxConfig.taxRate, taxId: locationTaxConfig.taxIdNumber };
    } catch (error) {
      console.error('Error fetching applicable tax:', error);
      throw error;
    }
  }

  // Update tax settings for a location and provider
  async updateTaxSettings(locationId, provider, taxRate, taxIdNumber = null) {
    try {
      const [taxConfig, created] = await db.LocationTaxConfig.findOrCreate({
        where: { locationId, provider },
        defaults: { taxRate, taxIdNumber },
      });

      if (!created) {
        taxConfig.taxRate = taxRate;
        taxConfig.taxIdNumber = taxIdNumber;
        await taxConfig.save();
      }

      return taxConfig;
    } catch (error) {
      console.error('Error updating tax settings:', error);
      throw error;
    }
  }
}

module.exports = new TaxService();
