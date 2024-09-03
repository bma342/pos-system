const BasePosService = require('./basePosService');
const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const pRetry = require('p-retry');

class BrinkService extends BasePosService {
  constructor(coreProfile, locationProfile) {
    super(coreProfile, locationProfile);
    this.api = rateLimit(axios.create({
      baseURL: this.coreProfile.apiEndpoint,
      headers: { 
        'X-API-Key': this.coreProfile.apiKey,
        'Content-Type': 'application/json',
      },
    }), { maxRequests: 5, perMilliseconds: 1000 });
  }

  async syncMenuItems() {
    try {
      const fetchMenuItems = async (page = 1) => {
        const response = await this.api.get(`/api/v1/menu?page=${page}`);
        return response.data;
      };

      let allMenuItems = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const data = await pRetry(() => fetchMenuItems(page), { retries: 3 });
        allMenuItems = allMenuItems.concat(data.items);
        hasMore = data.hasNextPage;
        page++;
      }

      await this.processAndSaveMenuItems(allMenuItems);
      console.log(`Synced ${allMenuItems.length} menu items from Brink`);
    } catch (error) {
      console.error('Error syncing Brink menu items:', error);
      throw error;
    }
  }

  async syncOrders() {
    try {
      const fetchOrders = async (page = 1) => {
        const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const response = await this.api.get(`/api/v1/orders?start_date=${startDate}&page=${page}`);
        return response.data;
      };

      let allOrders = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const data = await pRetry(() => fetchOrders(page), { retries: 3 });
        allOrders = allOrders.concat(data.orders);
        hasMore = data.hasNextPage;
        page++;
      }

      await this.processAndSaveOrders(allOrders);
      console.log(`Synced ${allOrders.length} orders from Brink`);
    } catch (error) {
      console.error('Error syncing Brink orders:', error);
      throw error;
    }
  }

  async syncInventory() {
    try {
      const fetchInventory = async (page = 1) => {
        const response = await this.api.get(`/api/v1/inventory?page=${page}`);
        return response.data;
      };

      let allInventoryItems = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const data = await pRetry(() => fetchInventory(page), { retries: 3 });
        allInventoryItems = allInventoryItems.concat(data.items);
        hasMore = data.hasNextPage;
        page++;
      }

      await this.processAndSaveInventory(allInventoryItems);
      console.log(`Synced ${allInventoryItems.length} inventory items from Brink`);
    } catch (error) {
      console.error('Error syncing Brink inventory:', error);
      throw error;
    }
  }
}

module.exports = BrinkService;
