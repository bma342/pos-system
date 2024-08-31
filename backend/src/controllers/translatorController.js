const PosProfile = require('../models/PosProfile');
const translatorService = require('../services/translatorService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// Sync order with the POS system
exports.syncOrder = async (req, res) => {
  const { locationId, orderData } = req.body;

  try {
    const posProfile = await PosProfile.findOne({ where: { locationId } });

    if (!posProfile) {
      return res.status(404).json({ message: 'POS profile not found for this location.' });
    }

    // Customize payload based on POS profile settings
    const payload = generatePayload(posProfile, orderData);

    // Send the payload to the third-party POS system (e.g., via API call)
    const response = await sendToThirdParty(posProfile.posName, payload);

    res.json({ message: 'Order synced successfully.', response });
  } catch (error) {
    logger.error('Error syncing order with POS:', error);
    res.status(500).json({ message: 'Error syncing order with POS', error: error.message });
  }
};

// Helper function to generate custom payload
function generatePayload(posProfile, orderData) {
  switch (posProfile.posName) {
    case 'Stripe':
      return { /* Stripe-specific payload structure with orderData */ orderData };
    case 'WorldPay':
      return { /* WorldPay-specific payload structure with orderData */ orderData };
    default:
      return { /* Default payload structure with orderData */ orderData };
  }
}

// Placeholder function for sending data to third-party systems
async function sendToThirdParty(posName, payload) {
  // Implement API call logic here
  return { success: true, posName, payload };
}

// New methods for translation functionality
exports.translateText = async (req, res, next) => {
  try {
    const { text, targetLanguage, sourceLanguage } = req.body;
    const translatedText = await translatorService.translateText(text, targetLanguage, sourceLanguage);
    res.status(200).json({ translatedText });
  } catch (error) {
    logger.error('Error translating text:', error);
    next(new AppError('Failed to translate text', 500));
  }
};

exports.getSupportedLanguages = async (req, res, next) => {
  try {
    const languages = await translatorService.getSupportedLanguages();
    res.status(200).json(languages);
  } catch (error) {
    logger.error('Error fetching supported languages:', error);
    next(new AppError('Failed to fetch supported languages', 500));
  }
};

exports.detectLanguage = async (req, res, next) => {
  try {
    const { text } = req.body;
    const detectedLanguage = await translatorService.detectLanguage(text);
    res.status(200).json({ detectedLanguage });
  } catch (error) {
    logger.error('Error detecting language:', error);
    next(new AppError('Failed to detect language', 500));
  }
};

exports.translateMenu = async (req, res, next) => {
  try {
    const { menuId, targetLanguage } = req.body;
    const translatedMenu = await translatorService.translateMenu(menuId, targetLanguage);
    res.status(200).json(translatedMenu);
  } catch (error) {
    logger.error('Error translating menu:', error);
    next(new AppError('Failed to translate menu', 500));
  }
};

exports.getTranslationHistory = async (req, res, next) => {
  try {
    const history = await translatorService.getTranslationHistory(req.query);
    res.status(200).json(history);
  } catch (error) {
    logger.error('Error fetching translation history:', error);
    next(new AppError('Failed to fetch translation history', 500));
  }
};
