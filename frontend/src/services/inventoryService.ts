import axios from 'axios';
import { InventoryItem } from '../types/inventoryTypes';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export class InventoryService {
  async getAllInventoryItems(tenantId: string): Promise<InventoryItem[]> {
    const response = await axios.get(
      `${API_BASE_URL}/tenants/${tenantId}/inventory`
    );
    return response.data;
  }

  async getInventoryItem(
    tenantId: string,
    itemId: number
  ): Promise<InventoryItem> {
    const response = await axios.get(
      `${API_BASE_URL}/tenants/${tenantId}/inventory/${itemId}`
    );
    return response.data;
  }

  async createInventoryItem(
    tenantId: string,
    item: Omit<InventoryItem, 'id'>
  ): Promise<InventoryItem> {
    const response = await axios.post(
      `${API_BASE_URL}/tenants/${tenantId}/inventory`,
      item
    );
    return response.data;
  }

  async updateInventoryItem(
    tenantId: string,
    itemId: number,
    item: InventoryItem
  ): Promise<InventoryItem> {
    const response = await axios.put(
      `${API_BASE_URL}/tenants/${tenantId}/inventory/${itemId}`,
      item
    );
    return response.data;
  }

  async deleteInventoryItem(tenantId: string, itemId: number): Promise<void> {
    await axios.delete(
      `${API_BASE_URL}/tenants/${tenantId}/inventory/${itemId}`
    );
  }
}
