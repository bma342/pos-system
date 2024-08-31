const TaxService = require('../services/taxService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.getAllTaxRates = async (req, res, next) => {
  try {
    const taxRates = await TaxService.getAllTaxRates();
    res.status(200).json(taxRates);
  } catch (error) {
    logger.error('Error fetching all tax rates:', error);
    next(new AppError('Failed to fetch tax rates', 500));
  }
};

exports.getTaxRateById = async (req, res, next) => {
  try {
    const taxRate = await TaxService.getTaxRateById(req.params.id);
    if (!taxRate) {
      return next(new AppError('Tax rate not found', 404));
    }
    res.status(200).json(taxRate);
  } catch (error) {
    logger.error(`Error fetching tax rate ${req.params.id}:`, error);
    next(error);
  }
};

exports.createTaxRate = async (req, res, next) => {
  try {
    const newTaxRate = await TaxService.createTaxRate(req.body);
    res.status(201).json(newTaxRate);
  } catch (error) {
    logger.error('Error creating tax rate:', error);
    next(new AppError('Failed to create tax rate', 500));
  }
};

exports.updateTaxRate = async (req, res, next) => {
  try {
    const updatedTaxRate = await TaxService.updateTaxRate(req.params.id, req.body);
    if (!updatedTaxRate) {
      return next(new AppError('Tax rate not found', 404));
    }
    res.status(200).json(updatedTaxRate);
  } catch (error) {
    logger.error(`Error updating tax rate ${req.params.id}:`, error);
    next(error);
  }
};

exports.deleteTaxRate = async (req, res, next) => {
  try {
    const result = await TaxService.deleteTaxRate(req.params.id);
    if (!result) {
      return next(new AppError('Tax rate not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting tax rate ${req.params.id}:`, error);
    next(error);
  }
};

exports.getTaxRatesByLocation = async (req, res, next) => {
  try {
    const taxRates = await TaxService.getTaxRatesByLocation(req.params.locationId);
    res.status(200).json(taxRates);
  } catch (error) {
    logger.error(`Error fetching tax rates for location ${req.params.locationId}:`, error);
    next(error);
  }
};

exports.calculateTax = async (req, res, next) => {
  try {
    const { locationId, items } = req.body;
    const taxAmount = await TaxService.calculateTax(locationId, items);
    res.status(200).json({ taxAmount });
  } catch (error) {
    logger.error('Error calculating tax:', error);
    next(error);
  }
};

exports.getTaxSettings = async (req, res, next) => {
  try {
    const { locationId, provider } = req.params;
    const taxSettings = await TaxService.getApplicableTax(locationId, provider);
    res.status(200).json(taxSettings);
  } catch (error) {
    logger.error('Error fetching tax settings:', error);
    next(new AppError('Failed to fetch tax settings', 500));
  }
};

exports.updateTaxSettings = async (req, res, next) => {
  try {
    const { locationId, provider, taxRate, taxIdNumber } = req.body;
    const updatedSettings = await TaxService.updateTaxSettings(locationId, provider, taxRate, taxIdNumber);
    res.status(200).json(updatedSettings);
  } catch (error) {
    logger.error('Error updating tax settings:', error);
    next(new AppError('Failed to update tax settings', 500));
  }
};
