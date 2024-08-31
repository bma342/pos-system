const { Request, Response } = require 'express';
const { POSAlert } = require '../models/POSAlert';
const { createPOSAlert, getPOSAlerts } = require '../services/posAlertService';

const createAlert = async (req, res) => {
  try {
    const alert = await createPOSAlert(req.body);
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: 'Error creating POS alert', error });
  }
};

const getAlerts = async (req, res) => {
  try {
    const alerts = await getPOSAlerts();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching POS alerts', error });
  }
};