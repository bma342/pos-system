const path = require('path');
const fs = require('fs');
const BrandingService = require('../services/brandingService');

exports.getBrandingProfiles = async (req, res) => {
  try {
    const profiles = await BrandingService.getBrandingProfiles(req.params.clientId);
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching branding profiles', error });
  }
};

exports.saveBrandingProfile = async (req, res) => {
  try {
    const profileData = { ...req.body, clientId: req.params.clientId };
    const profile = await BrandingService.saveBrandingProfile(profileData);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error saving branding profile', error });
  }
};

exports.scheduleBrandingProfile = async (req, res) => {
  try {
    const { profileId, schedule } = req.body;
    const result = await BrandingService.scheduleBrandingProfile(profileId, schedule);
    res.status(200).json({ message: 'Branding profile scheduled successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling branding profile', error });
  }
};

exports.uploadLogo = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const logoFile = req.files.file;
    const uploadPath = path.join(__dirname, '../../uploads/branding', logoFile.name);

    // Ensure directory exists
    fs.mkdirSync(path.dirname(uploadPath), { recursive: true });

    logoFile.mv(uploadPath, (err) => {
      if (err) return res.status(500).json({ message: 'Failed to upload file', err });

      const logoUrl = `/uploads/branding/${logoFile.name}`;
      res.status(200).json({ url: logoUrl });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading logo', error });
  }
};
