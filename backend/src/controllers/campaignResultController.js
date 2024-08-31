const campaignResultService = require('../services/campaignResultService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllCampaignResults = async (req, res, next) => {
  try {
    const results = await campaignResultService.getAllCampaignResults();
    res.status(200).json(results);
  } catch (error) {
    logger.error('Error fetching campaign results:', error);
    next(new AppError('Error fetching campaign results', 500));
  }
};

const getCampaignResultById = async (req, res, next) => {
  try {
    const result = await campaignResultService.getCampaignResultById(req.params.id);
    if (!result) {
      return next(new AppError('Campaign result not found', 404));
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error fetching campaign result ${req.params.id}:`, error);
    next(new AppError('Error fetching campaign result', 500));
  }
};

const createCampaignResult = async (req, res, next) => {
  try {
    const newResult = await campaignResultService.createCampaignResult(req.body);
    res.status(201).json(newResult);
  } catch (error) {
    logger.error('Error creating campaign result:', error);
    next(new AppError('Error creating campaign result', 500));
  }
};

const updateCampaignResult = async (req, res, next) => {
  try {
    const updatedResult = await campaignResultService.updateCampaignResult(req.params.id, req.body);
    if (!updatedResult) {
      return next(new AppError('Campaign result not found', 404));
    }
    res.status(200).json(updatedResult);
  } catch (error) {
    logger.error(`Error updating campaign result ${req.params.id}:`, error);
    next(new AppError('Error updating campaign result', 500));
  }
};

const deleteCampaignResult = async (req, res, next) => {
  try {
    const deleted = await campaignResultService.deleteCampaignResult(req.params.id);
    if (!deleted) {
      return next(new AppError('Campaign result not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting campaign result ${req.params.id}:`, error);
    next(new AppError('Error deleting campaign result', 500));
  }
};

module.exports = {
  getAllCampaignResults,
  getCampaignResultById,
  createCampaignResult,
  updateCampaignResult,
  deleteCampaignResult
};
