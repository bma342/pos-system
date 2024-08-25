const PosSyncService = require('./posSyncService');
const ToastService = require('./toastService');
const db = require('../models');

class SyncEngine {
  static async syncMenus(locationId) {
    try {
      const posProfiles = await db.PosProfile.findAll({ where: { locationId } });

      for (const profile of posProfiles) {
        if (profile.posSystem === 'toast') {
          const toastService = new ToastService();
          await toastService.syncMenus(profile);
        } else {
          await PosSyncService.syncMenus(profile);
        }
      }
      console.log(`Menus synced successfully for location ${locationId}`);
    } catch (error) {
      console.error(`Error syncing menus for location ${locationId}:`, error);
    }
  }

  static async syncMenuGroups(locationId) {
    try {
      const posProfiles = await db.PosProfile.findAll({ where: { locationId } });

      for (const profile of posProfiles) {
        if (profile.posSystem === 'toast') {
          const toastService = new ToastService();
          await toastService.syncMenuGroups(profile);
        } else {
          await PosSyncService.syncMenuGroups(profile);
        }
      }
      console.log(`Menu groups synced successfully for location ${locationId}`);
    } catch (error) {
      console.error(`Error syncing menu groups for location ${locationId}:`, error);
    }
  }

  static async syncMenuItems(locationId) {
    try {
      const posProfiles = await db.PosProfile.findAll({ where: { locationId } });

      for (const profile of posProfiles) {
        if (profile.posSystem === 'toast') {
          const toastService = new ToastService();
          await toastService.syncMenuItems(profile);
        } else {
          await PosSyncService.syncMenuItems(profile);
        }
      }
      console.log(`Menu items synced successfully for location ${locationId}`);
    } catch (error) {
      console.error(`Error syncing menu items for location ${locationId}:`, error);
    }
  }
}

module.exports = SyncEngine;
