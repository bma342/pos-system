const BasePosService = require('./basePosService');
const { Client, Environment } = require('square');
const pRetry = require('p-retry');

class SquareService extends BasePosService {
  constructor(coreProfile, locationProfile) {
    super(coreProfile, locationProfile);
    this.client = new Client({
      accessToken: this.coreProfile.apiKey,
      environment: Environment.Production, // or Environment.Sandbox for testing
    });
  }

  async syncMenuItems() {
    try {
      const fetchMenuItems = async (cursor) => {
        const response = await this.client.catalogApi.listCatalog(cursor, 'ITEM');
        return response.result;
      };

      let allMenuItems = [];
      let cursor;
      do {
        const data = await pRetry(() => fetchMenuItems(cursor), { retries: 3 });
        allMenuItems = allMenuItems.concat(data.objects);
        cursor = data.cursor;
      } while (cursor);

      await this.processAndSaveMenuItems(allMenuItems);
      console.log(`Synced ${allMenuItems.length} menu items from Square`);
    } catch (error) {
      console.error('Error syncing Square menu items:', error);
      throw error;
    }
  }

  async syncOrders() {
    try {
      const { ordersApi } = this.client;
      const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const fetchOrders = async (cursor) => {
        const response = await ordersApi.searchOrders({
          locationIds: [this.locationProfile.settings.squareLocationId],
          query: {
            filter: {
              dateTimeFilter: {
                createdAt: {
                  startAt: startDate,
                },
              },
            },
          },
          cursor: cursor,
        });
        return response.result;
      };

      let allOrders = [];
      let cursor;
      do {
        const data = await pRetry(() => fetchOrders(cursor), { retries: 3 });
        allOrders = allOrders.concat(data.orders || []);
        cursor = data.cursor;
      } while (cursor);

      await this.processAndSaveOrders(allOrders);
      console.log(`Synced ${allOrders.length} orders from Square`);
    } catch (error) {
      console.error('Error syncing Square orders:', error);
      throw error;
    }
  }

  async syncInventory() {
    try {
      const fetchInventory = async (cursor) => {
        const response = await this.client.inventoryApi.retrieveInventoryCounts({
          locationIds: [this.locationProfile.settings.squareLocationId],
          cursor: cursor,
        });
        return response.result;
      };

      let allInventoryItems = [];
      let cursor;
      do {
        const data = await pRetry(() => fetchInventory(cursor), { retries: 3 });
        allInventoryItems = allInventoryItems.concat(data.counts || []);
        cursor = data.cursor;
      } while (cursor);

      await this.processAndSaveInventory(allInventoryItems);
      console.log(`Synced ${allInventoryItems.length} inventory items from Square`);
    } catch (error) {
      console.error('Error syncing Square inventory:', error);
      throw error;
    }
  }
}

module.exports = SquareService;
