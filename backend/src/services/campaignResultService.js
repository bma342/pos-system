const { CampaignResult } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllCampaignResults = async () => {
  return await CampaignResult.findAll();
};

const getCampaignResultById = async (id) => {
  return await CampaignResult.findByPk(id);
};

const createCampaignResult = async (data) => {
  return await CampaignResult.create(data);
};

const updateCampaignResult = async (id, data) => {
  const result = await CampaignResult.findByPk(id);
  if (!result) {
    return null;
  }
  return await result.update(data);
};

const deleteCampaignResult = async (id) => {
  const result = await CampaignResult.findByPk(id);
  if (!result) {
    return false;
  }
  await result.destroy();
  return true;
};

module.exports = {
  getAllCampaignResults,
  getCampaignResultById,
  createCampaignResult,
  updateCampaignResult,
  deleteCampaignResult
};