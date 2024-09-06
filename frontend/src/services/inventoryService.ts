import axios from 'axios';
import { InventoryItem } from '../types/inventoryTypes';

export const inventoryService = {
  getInventory: async (locationId: string): Promise<InventoryItem[]> => {
    try {
      const response = await axios.get(`/api/locations/${locationId}/inventory`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch inventory: ' + (error as Error).message);
    }
  },

  updateInventoryItem: async (locationId: string, item: InventoryItem): Promise<InventoryItem> => {
    try {
      const response = await axios.put(`/api/locations/${locationId}/inventory/${item.id}`, item);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update inventory item: ' + (error as Error).message);
    }
  },

  createInventoryItem: async (locationId: string, item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
    try {
      const response = await axios.post(`/api/locations/${locationId}/inventory`, item);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create inventory item: ' + (error as Error).message);
    }
  },

  deleteInventoryItem: async (locationId: string, itemId: string): Promise<void> => {
    try {
      await axios.delete(`/api/locations/${locationId}/inventory/${itemId}`);
    } catch (error) {
      throw new Error('Failed to delete inventory item: ' + (error as Error).message);
    }
  }
};
