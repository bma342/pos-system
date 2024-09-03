const { CorePOSProfile, LocationPOSProfile } = require('../models');
const ToastService = require('./integrations/toastService');
const BrinkService = require('./integrations/brinkService');
const RevelService = require('./integrations/revelService');
const SquareService = require('./integrations/squareService');

class CorePosProfileService {
  async getAll() {
    return CorePOSProfile.findAll({ where: { isActive: true } });
  }

  async getById(id) {
    return CorePOSProfile.findByPk(id);
  }

  async create(data) {
    return CorePOSProfile.create(data);
  }

  async update(id, data) {
    const profile = await CorePOSProfile.findByPk(id);
    if (profile) {
      return profile.update(data);
    }
    return null;
  }

  async delete(id) {
    await CorePOSProfile.update({ isActive: false }, { where: { id } });
  }

  async syncLocation(locationProfileId) {
    const locationProfile = await LocationPOSProfile.findByPk(locationProfileId, {
      include: [CorePOSProfile],
    });
    if (!locationProfile) {
      throw new Error('Location POS profile not found');
    }

    const coreProfile = locationProfile.CorePOSProfile;

    let integrationService;
    switch (coreProfile.posType) {
      case 'TOAST':
        integrationService = new ToastService(coreProfile, locationProfile);
        break;
      case 'BRINK':
        integrationService = new BrinkService(coreProfile, locationProfile);
        break;
      case 'REVEL':
        integrationService = new RevelService(coreProfile, locationProfile);
        break;
      case 'SQUARE':
        integrationService = new SquareService(coreProfile, locationProfile);
        break;
      default:
        throw new Error('Unsupported POS type');
    }

    try {
      await locationProfile.update({ lastSyncStatus: 'IN_PROGRESS' });

      await integrationService.syncMenuItems();
      await integrationService.syncOrders();
      await integrationService.syncInventory();
      
      await locationProfile.update({
        lastSyncStatus: 'SUCCESS',
        lastSyncError: null,
        lastSyncTimestamp: new Date(),
      });
    } catch (error) {
      await locationProfile.update({
        lastSyncStatus: 'FAILED',
        lastSyncError: error.message,
        lastSyncTimestamp: new Date(),
      });
      throw error;
    }
  }
}

module.exports = new CorePosProfileService();
