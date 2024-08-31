const POSSettings = require '../models/POSSettings';
const { AppError } = require '../utils/errorHandler';

const getPOSSettings = async (clientId) => {
  const settings = await POSSettings.findOne({ where: { clientId } });
  if (!settings) {
    throw new AppError('POS settings not found', 404);
  }
  return settings;
};

const updatePOSSettings = async (clientId, updates: { modifierSendMethod }) => {
  const settings = await POSSettings.findOne({ where: { clientId } });
  if (!settings) {
    throw new AppError('POS settings not found', 404);
  }
  await settings.update(updates);
  return settings;
};