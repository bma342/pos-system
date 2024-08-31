const ClientBranding = require '../models/ClientBranding';
const { AppError } = require '../utils/errorHandler';

const getClientBranding = async (clientId) => {
  const branding = await ClientBranding.findOne({ where: { clientId } });
  if (!branding) {
    throw new AppError('Client branding not found', 404);
  }
  return branding;
};

const updateClientBranding = async (clientId, brandingData) => {
  const branding = await ClientBranding.findOne({ where: { clientId } });
  if (!branding) {
    throw new AppError('Client branding not found', 404);
  }
  await branding.update(brandingData);
  return branding;
};