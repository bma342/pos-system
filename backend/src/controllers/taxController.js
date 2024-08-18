const TaxService = require('../services/taxService');

exports.getTaxSettings = async (req, res) => {
  try {
    const { locationId, provider } = req.params;
    const taxSettings = await TaxService.getApplicableTax(locationId, provider);
    res.status(200).json(taxSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tax settings', error });
  }
};

exports.updateTaxSettings = async (req, res) => {
  try {
    const { locationId, provider, taxRate, taxIdNumber } = req.body;
    const updatedSettings = await TaxService.updateTaxSettings(locationId, provider, taxRate, taxIdNumber);
    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tax settings', error });
  }
};
