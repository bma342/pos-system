const { CateringSettings } = require('../models');

exports.getSettings = async (req, res) => {
  try {
    const settings = await CateringSettings.findOne({ where: { locationId: req.user.locationId } });
    if (settings) {
      res.json(settings);
    } else {
      res.status(404).json({ message: 'Catering settings not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering settings', error: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const [updated] = await CateringSettings.update(req.body, {
      where: { locationId: req.user.locationId }
    });
    if (updated) {
      const updatedSettings = await CateringSettings.findOne({ where: { locationId: req.user.locationId } });
      res.json(updatedSettings);
    } else {
      res.status(404).json({ message: 'Catering settings not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating catering settings', error: error.message });
  }
};
