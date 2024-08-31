const { TaxRate, LocationTaxConfig } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllTaxRates = async () => {
  try {
    return await TaxRate.findAll();
  } catch (error) {
    logger.error('Error fetching all tax rates:', error);
    throw new AppError('Failed to fetch tax rates', 500);
  }
};

const getTaxRateById = async (id) => {
  try {
    const taxRate = await TaxRate.findByPk(id);
    if (!taxRate) {
      throw new AppError('Tax rate not found', 404);
    }
    return taxRate;
  } catch (error) {
    logger.error(`Error fetching tax rate with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch tax rate', 500);
  }
};

const createTaxRate = async (taxRateData) => {
  try {
    const newTaxRate = await TaxRate.create(taxRateData);
    logger.info(`New tax rate created with ID: ${newTaxRate.id}`);
    return newTaxRate;
  } catch (error) {
    logger.error('Error creating tax rate:', error);
    throw new AppError('Failed to create tax rate', 500);
  }
};

const updateTaxRate = async (id, taxRateData) => {
  try {
    const taxRate = await getTaxRateById(id);
    const updatedTaxRate = await taxRate.update(taxRateData);
    logger.info(`Tax rate updated with ID: ${id}`);
    return updatedTaxRate;
  } catch (error) {
    logger.error(`Error updating tax rate with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update tax rate', 500);
  }
};

const deleteTaxRate = async (id) => {
  try {
    const taxRate = await getTaxRateById(id);
    await taxRate.destroy();
    logger.info(`Tax rate deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting tax rate with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete tax rate', 500);
  }
};

const getTaxRatesByLocation = async (locationId) => {
  try {
    return await TaxRate.findAll({ where: { locationId } });
  } catch (error) {
    logger.error(`Error fetching tax rates for location ${locationId}:`, error);
    throw new AppError('Failed to fetch tax rates for location', 500);
  }
};

const calculateTax = async (locationId, items) => {
  try {
    const taxRates = await getTaxRatesByLocation(locationId);
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxAmount = taxRates.reduce((sum, rate) => sum + totalAmount * (rate.percentage / 100), 0);
    return Number(taxAmount.toFixed(2));
  } catch (error) {
    logger.error(`Error calculating tax for location ${locationId}:`, error);
    throw new AppError('Failed to calculate tax', 500);
  }
};

const getApplicableTax = async (locationId, provider, guestId = null) => {
  try {
    const locationTaxConfig = await LocationTaxConfig.findOne({
      where: { locationId, provider },
    });

    if (guestId) {
      const guest = await Guest.findByPk(guestId);
      if (guest && guest.taxExempt) {
        return { rate: 0, taxId: guest.taxIdNumber };
      }
    }

    if (!locationTaxConfig) {
      return { rate: 0, taxId: null };
    }

    return { rate: locationTaxConfig.taxRate, taxId: locationTaxConfig.taxIdNumber };
  } catch (error) {
    logger.error('Error fetching applicable tax:', error);
    throw new AppError('Failed to fetch applicable tax', 500);
  }
};

const updateTaxSettings = async (locationId, provider, taxRate, taxIdNumber = null) => {
  try {
    const [taxConfig, created] = await LocationTaxConfig.findOrCreate({
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
    logger.error('Error updating tax settings:', error);
    throw new AppError('Failed to update tax settings', 500);
  }
};

module.exports = {
  getAllTaxRates,
  getTaxRateById,
  createTaxRate,
  updateTaxRate,
  deleteTaxRate,
  getTaxRatesByLocation,
  calculateTax,
  getApplicableTax,
  updateTaxSettings
};
