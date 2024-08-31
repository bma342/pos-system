const { Request, Response } = require 'express';
const { ClientSettings, Location } = require '../models';

const updateGlobalTwoFactorSetting = async (req, res) => {
  try {
    const { twoFactorRequired } = req.body;
    const clientId = req.user.clientId;

    await ClientSettings.update({ twoFactorRequired }, { where: { clientId } });

    res.json({ message: 'Global 2FA setting updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating global 2FA setting' });
  }
};

const updateLocationTwoFactorException = async (req, res) => {
  try {
    const { locationId, twoFactorException } = req.body;
    const clientId = req.user.clientId;

    const location = await Location.findOne({ where: { id, clientId } });
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    await location.update({ twoFactorException });

    res.json({ message: 'Location 2FA exception updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating location 2FA exception' });
  }
};

const updateGlobalPaymentGateways = async (req, res) => {
  try {
    const { defaultPaymentGateways } = req.body;
    const clientId = req.user.clientId;

    await ClientSettings.update({ defaultPaymentGateways }, { where: { clientId } });

    res.json({ message: 'Global payment gateway settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating global payment gateway settings' });
  }
};

const updateLocationPaymentGatewayExceptions = async (req, res) => {
  try {
    const { locationId, paymentGatewayExceptions } = req.body;
    const clientId = req.user.clientId;

    const location = await Location.findOne({ where: { id, clientId } });
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    await location.update({ paymentGatewayExceptions });

    res.json({ message: 'Location payment gateway exceptions updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating location payment gateway exceptions' });
  }
};