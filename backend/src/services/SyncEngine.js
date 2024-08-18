const POSConnectorService = require('../posConnector/posConnectorService');
const { posProfiles } = require('../models/PosProfile');
const { Menu } = require('../models/Menu');

class SyncEngine {
  constructor() {
    this.lastSyncTime = new Date();
  }

  async syncMenus(locationId) {
    const posProfile = posProfiles[`location${locationId}`];
    if (!posProfile) {
      throw new Error(`No POS profile found for location ${locationId}`);
    }

    const posConnector = new POSConnectorService(posProfile.posConfig);
    
    // Fetch menu data from your database
    const localMenus = await Menu.findAll({ where: { locationId } });

    // Determine if partial sync or full sync is needed
    const shouldPerformFullSync = posProfile.posSystem === 'par' || this.requiresFullSync(locationId);
    
    if (shouldPerformFullSync) {
      // Full sync logic
      const syncedData = await posConnector.syncMenus(localMenus);
      console.log(`Performed full sync for location ${locationId}`);
      return syncedData;
    } else {
      // Perform incremental sync
      const updatedMenus = this.getUpdatedMenus(localMenus, this.lastSyncTime);
      const syncedData = await posConnector.syncMenus(updatedMenus);
      this.lastSyncTime = new Date(); // Update last sync time
      console.log(`Performed incremental sync for location ${locationId}`);
      return syncedData;
    }
  }

  requiresFullSync(locationId) {
    // Logic to determine if a full sync is required, can be extended
    return false;
  }

  getUpdatedMenus(localMenus, lastSyncTime) {
    return localMenus.filter(menu => new Date(menu.updatedAt) > lastSyncTime);
  }
}

module.exports = new SyncEngine();
