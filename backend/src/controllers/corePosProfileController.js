const { CorePOSProfile } = require('../models');

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await CorePOSProfile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error); // Updated to use error
    res.status(500).json({ error: 'Error fetching profiles' });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await CorePOSProfile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error); // Updated to use error
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const newProfile = await CorePOSProfile.create(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error); // Updated to use error
    res.status(500).json({ error: 'Error creating profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await CorePOSProfile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    await profile.update(req.body);
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating profile:', error); // Updated to use error
    res.status(500).json({ error: 'Error updating profile' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await CorePOSProfile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    await profile.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting profile:', error); // Updated to use error
    res.status(500).json({ error: 'Error deleting profile' });
  }
};
