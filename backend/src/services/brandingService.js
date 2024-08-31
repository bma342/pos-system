const { BrandingProfile } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getBrandingProfiles = async (clientId) => {
  if (!clientId) {
    throw new AppError('Client ID is required', 400);
  }
  return await BrandingProfile.findAll({ where: { clientId } });
};

const getBrandingProfileById = async (id) => {
  if (!id) {
    throw new AppError('Profile ID is required', 400);
  }
  const profile = await BrandingProfile.findByPk(id);
  if (!profile) {
    throw new AppError('Branding profile not found', 404);
  }
  return profile;
};

const createBrandingProfile = async (profileData) => {
  if (!profileData || !profileData.clientId) {
    throw new AppError('Invalid profile data', 400);
  }
  try {
    return await BrandingProfile.create(profileData);
  } catch (error) {
    logger.error('Error creating branding profile:', error);
    throw new AppError('Failed to create branding profile', 500);
  }
};

const updateBrandingProfile = async (id, profileData) => {
  if (!id || !profileData) {
    throw new AppError('Invalid update data', 400);
  }
  const profile = await getBrandingProfileById(id);
  try {
    return await profile.update(profileData);
  } catch (error) {
    logger.error(`Error updating branding profile ${id}:`, error);
    throw new AppError('Failed to update branding profile', 500);
  }
};

const deleteBrandingProfile = async (id) => {
  if (!id) {
    throw new AppError('Profile ID is required', 400);
  }
  const profile = await getBrandingProfileById(id);
  try {
    await profile.destroy();
  } catch (error) {
    logger.error(`Error deleting branding profile ${id}:`, error);
    throw new AppError('Failed to delete branding profile', 500);
  }
};

module.exports = {
  getBrandingProfiles,
  getBrandingProfileById,
  createBrandingProfile,
  updateBrandingProfile,
  deleteBrandingProfile
};
