const { BrandingProfile } = require('../models');

exports.getBrandingProfile = async (req, res) => {
  try {
    const brandingProfile = await BrandingProfile.findOne({ where: { clientId: req.user.clientId } });
    if (brandingProfile) {
      res.json(brandingProfile);
    } else {
      res.status(404).json({ message: 'Branding profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching branding profile', error: error.message });
  }
};

exports.createBrandingProfile = async (req, res) => {
  try {
    const newBrandingProfile = await BrandingProfile.create({ ...req.body, clientId: req.user.clientId });
    res.status(201).json(newBrandingProfile);
  } catch (error) {
    res.status(400).json({ message: 'Error creating branding profile', error: error.message });
  }
};

exports.updateBrandingProfile = async (req, res) => {
  try {
    const [updated] = await BrandingProfile.update(req.body, {
      where: { clientId: req.user.clientId }
    });
    if (updated) {
      const updatedBrandingProfile = await BrandingProfile.findOne({ where: { clientId: req.user.clientId } });
      res.json(updatedBrandingProfile);
    } else {
      res.status(404).json({ message: 'Branding profile not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating branding profile', error: error.message });
  }
};

exports.deleteBrandingProfile = async (req, res) => {
  try {
    const deleted = await BrandingProfile.destroy({
      where: { clientId: req.user.clientId }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Branding profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting branding profile', error: error.message });
  }
};
