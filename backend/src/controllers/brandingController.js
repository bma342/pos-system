const brandingService = require('../services/brandingService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getBrandingProfiles = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const profiles = await brandingService.getBrandingProfiles(clientId);
    res.status(200).json(profiles);
  } catch (error) {
    logger.error(`Error fetching branding profiles for client ${req.params.clientId}:`, error);
    next(new AppError('Error fetching branding profiles', 500));
  }
};

const getBrandingProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await brandingService.getBrandingProfileById(id);
    if (!profile) {
      return next(new AppError('Branding profile not found', 404));
    }
    res.status(200).json(profile);
  } catch (error) {
    logger.error(`Error fetching branding profile ${req.params.id}:`, error);
    next(new AppError('Error fetching branding profile', 500));
  }
};

const createBrandingProfile = async (req, res, next) => {
  try {
    const newProfile = await brandingService.createBrandingProfile(req.body);
    logger.info(`New branding profile created: ${newProfile.id}`);
    res.status(201).json(newProfile);
  } catch (error) {
    logger.error('Error creating branding profile:', error);
    next(new AppError('Error creating branding profile', 500));
  }
};

const updateBrandingProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProfile = await brandingService.updateBrandingProfile(id, req.body);
    if (!updatedProfile) {
      return next(new AppError('Branding profile not found', 404));
    }
    logger.info(`Branding profile updated: ${id}`);
    res.status(200).json(updatedProfile);
  } catch (error) {
    logger.error(`Error updating branding profile ${req.params.id}:`, error);
    next(new AppError('Error updating branding profile', 500));
  }
};

const deleteBrandingProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    await brandingService.deleteBrandingProfile(id);
    logger.info(`Branding profile deleted: ${id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting branding profile ${req.params.id}:`, error);
    next(new AppError('Error deleting branding profile', 500));
  }
};

module.exports = {
  getBrandingProfiles,
  getBrandingProfileById,
  createBrandingProfile,
  updateBrandingProfile,
  deleteBrandingProfile
};
