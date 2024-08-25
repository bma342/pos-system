const { PosProfile, Location } = require('../models');

class PosService {
  static async createProfile(profileData) {
    return await PosProfile.create(profileData);
  }

  static async getAllProfiles() {
    return await PosProfile.findAll({
      include: [Location],
    });
  }

  static async getProfileById(id) {
    return await PosProfile.findByPk(id, {
      include: [Location],
    });
  }

  static async updateProfile(id, profileData) {
    const profile = await PosProfile.findByPk(id);
    if (profile) {
      return await profile.update(profileData);
    }
    throw new Error('Profile not found');
  }

  static async deleteProfile(id) {
    const profile = await PosProfile.findByPk(id);
    if (profile) {
      await profile.destroy();
      return true;
    }
    throw new Error('Profile not found');
  }

  static async getPosTimezone(locationId) {
    const location = await Location.findByPk(locationId);
    return location ? location.timezone : null;
  }
}

module.exports = PosService;
