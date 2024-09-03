const BasePosService = require('./basePosService');
const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const pRetry = require('p-retry');

class RevelService extends BasePosService {
  constructor(coreProfile, locationProfile) {
    super(coreProfile, locationProfile);
    this.api = rateLimit(axios.create({
      baseURL: this.coreProfile.apiEndpoint,
      auth: {
        username: this.coreProfile.settings.username,
        password: this.coreProfile.settings.password,
      },
      headers: { 'Content-Type': 'application/json' },
    }), { maxRequests: 5, perMilliseconds: 1000 });
  }

  async syncMenuItems() {
    try {
      const fetchMenuItems = async (offset = 0) => {
        const response = await this.api.get(`/resources/Product?limit=100&offset=${offset}`);
        return response.data;
      };

      let allMenuItems = [];
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const data = await pRetry(() => fetchMenuItems(offset), { retries: 3 });
        allMenuItems = allMenuItems.concat(data.objects);
        hasMore = data.meta.next !== null;
        offset += 100;
      }

      await this.processAndSaveMenuItems(allMenuItems);
      console.log(`Synced ${allMenuItems.length} menu items from Revel`);
    } catch (error) {
      console.error('Error syncing Revel menu items:', error);
      throw error;
    }
  }

  async syncOrders() {
    try {
      const fetchOrders = async (offset = 0) => {
        const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const response = await this.api.get(`/resources/Order?limit=100&offset=${offset}&created_date__gte=${startDate}`);
        return response.data;
      };

      let allOrders = [];
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const data = await pRetry(() => fetchOrders(offset), { retries: 3 });
        allOrders = allOrders.concat(data.objects);
        hasMore = data.meta.next !== null;
        offset += 100;
      }

      await this.processAndSaveOrders(allOrders);
      console.log(`Synced ${allOrders.length} orders from Revel`);
    } catch (error) {
      console.error('Error syncing Revel orders:', error);
      throw error;
    }
  }

  async syncInventory() {
    try {
      const fetchInventory = async (offset = 0) => {
        const response = await this.api.get(`/resources/Inventory?limit=100&offset=${offset}`);
        return response.data;
      };

      let allInventoryItems = [];
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const data = await pRetry(() => fetchInventory(offset), { retries: 3 });
        allInventoryItems = allInventoryItems.concat(data.objects);
        hasMore = data.meta.next !== null;
        offset += 100;
      }

      await this.processAndSaveInventory(allInventoryItems);
      console.log(`Synced ${allInventoryItems.length} inventory items from Revel`);
    } catch (error) {
      console.error('Error syncing Revel inventory:', error);
      throw error;
    }
  }
}

module.exports = RevelService;
