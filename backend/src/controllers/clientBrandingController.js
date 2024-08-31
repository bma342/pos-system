const { Request, Response } = require 'express';
const { getClientBranding, updateClientBranding } = require '../services/clientBrandingService';
const { AppError } = require '../utils/errorHandler';

const getClientBrandingController = async (req, res) => {
  try {
    const clientId = req.user.clientId; // Assuming you have middleware that sets the user and clientId
    const branding = await getClientBranding(clientId);
    res.status(200).json(branding);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error fetching client branding' });
    }
  }
};

const updateClientBrandingController = async (req, res) => {
  try {
    const clientId = req.user.clientId;
    const updatedBranding = await updateClientBranding(clientId, req.body);
    res.status(200).json(updatedBranding);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message.message });
    } else {
      res.status(500).json({ message: 'Error updating client branding' });
    }
  }
};