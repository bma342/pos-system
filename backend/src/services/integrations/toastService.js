const BasePosService = require('./basePosService');
const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const pRetry = require('p-retry');

class ToastService extends BasePosService {
  constructor(coreProfile, locationProfile) {
    super(coreProfile, locationProfile);
    this.api = rateLimit(axios.create({
      baseURL: this.coreProfile.apiEndpoint,
      headers: { 
        'Authorization': `Bearer ${this.coreProfile.apiKey}`,
        'Content-Type': 'application/json',
      },
    }), { maxRequests: 5, perMilliseconds: 1000 });
  }

  async syncMenuItems() {
    try {
      const fetchMenuItems = async (page = 1) => {
        const response = await this.api.get(`/v2/menus?page=${page}`);
        return response.data;
      };

      let allMenuItems = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const data = await pRetry(() => fetchMenuItems(page), { retries: 3 });
        allMenuItems = allMenuItems.concat(data.items);
        hasMore = data.hasMore;
        page++;
      }

      await this.processAndSaveMenuItems(allMenuItems);
      console.log(`Synced ${allMenuItems.length} menu items from Toast`);
    } catch (error) {
      console.error('Error syncing Toast menu items:', error);
      throw error;
    }
  }

  async syncOrders() {
    try {
      const fetchOrders = async (page = 1) => {
        const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const response = await this.api.get(`/v2/orders?startDate=${startDate}&page=${page}`);
        return response.data;
      };

      let allOrders = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const data = await pRetry(() => fetchOrders(page), { retries: 3 });
        allOrders = allOrders.concat(data.orders);
        hasMore = data.hasMore;
        page++;
      }

      await this.processAndSaveOrders(allOrders);
      console.log(`Synced ${allOrders.length} orders from Toast`);
    } catch (error) {
      console.error('Error syncing Toast orders:', error);
      throw error;
    }
  }

  async syncInventory() {
    try {
      const fetchInventory = async (page = 1) => {
        const response = await this.api.get(`/v2/inventory/items?page=${page}`);
        return response.data;
      };

      let allInventoryItems = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const data = await pRetry(() => fetchInventory(page), { retries: 3 });
        allInventoryItems = allInventoryItems.concat(data.items);
        hasMore = data.hasMore;
        page++;
      }

      await this.processAndSaveInventory(allInventoryItems);
      console.log(`Synced ${allInventoryItems.length} inventory items from Toast`);
    } catch (error) {
      console.error('Error syncing Toast inventory:', error);
      throw error;
    }
  }
}

module.exports = ToastService;
