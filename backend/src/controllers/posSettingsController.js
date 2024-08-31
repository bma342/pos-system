const { Request, Response } = require 'express';
const { getPOSSettings, updatePOSSettings } = require '../services/posSettingsService';
const { AppError } = require '../utils/errorHandler';

const getPOSSettingsController = async (req, res) => {
  try {
    const clientId = req.user.clientId;
    const settings = await getPOSSettings(clientId);
    res.status(200).json(settings);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error fetching POS settings' });
    }
  }
};

const updatePOSSettingsController = async (req, res) => {
  try {
    const clientId = req.user.clientId;
    const { modifierSendMethod } = req.body;
    const updatedSettings = await updatePOSSettings(clientId, { modifierSendMethod });
    res.status(200).json(updatedSettings);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error updating POS settings' });
    }
  }
};