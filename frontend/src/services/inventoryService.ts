import axios from 'axios';
import { InventoryItem } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const inventoryService = {
  async getInventory(): Promise<InventoryItem[]> {
    const response = await axios.get<InventoryItem[]>(`${API_BASE_URL}/inventory`);
    return response.data;
  },

  async getInventoryItem(id: string): Promise<InventoryItem> {
    const response = await axios.get<InventoryItem>(`${API_BASE_URL}/inventory/${id}`);
    return response.data;
  },

  async updateInventoryItem(item: InventoryItem): Promise<InventoryItem> {
    const response = await axios.put<InventoryItem>(`${API_BASE_URL}/inventory/${item.id}`, item);
    return response.data;
  },

  async createInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    const response = await axios.post<InventoryItem>(`${API_BASE_URL}/inventory`, item);
    return response.data;
  },

  async deleteInventoryItem(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/inventory/${id}`);
  },
};
