const db = require('../models');

class PosProfileService {
  async getPosProfileByLocation(locationId) {
    return await db.PosProfile.findOne({ where: { locationId } });
  }

  async updatePosProfile(locationId, posProfileDetails) {
    let posProfile = await this.getPosProfileByLocation(locationId);

    if (posProfile) {
      posProfile = await posProfile.update(posProfileDetails);
    } else {
      posProfile = await db.PosProfile.create({ locationId, ...posProfileDetails });
    }

    return posProfile;
  }
}

module.exports = new PosProfileService();
