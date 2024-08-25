const BrandingProfile = require('../models/BrandingProfile');

class BrandingService {
  async getBrandingProfiles(clientId) {
    try {
      return await BrandingProfile.findAll({ where: { clientId } });
    } catch (error) {
      throw new Error('Error fetching branding profiles: ' + error.message);
    }
  }

  async saveBrandingProfile(profileData) {
    try {
      const { id, clientId, name, colors, logo } = profileData;
      let profile;

      if (id) {
        profile = await BrandingProfile.findByPk(id);
        if (profile) {
          return await profile.update({ name, colors, logo });
        }
      } else {
        return await BrandingProfile.create({ clientId, name, colors, logo });
      }
    } catch (error) {
      throw new Error('Error saving branding profile: ' + error.message);
    }
  }

  async scheduleBrandingProfile(profileId, scheduleData) {
    try {
      const profile = await BrandingProfile.findByPk(profileId);
      if (!profile) {
        throw new Error('Branding profile not found');
      }

      profile.schedule = scheduleData;
      return await profile.save();
    } catch (error) {
      throw new Error('Error scheduling branding profile: ' + error.message);
    }
  }
}

module.exports = new BrandingService();
