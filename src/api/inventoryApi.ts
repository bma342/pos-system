import api from './axios';
import { InventoryItem } from '../types/inventoryTypes';

export const getInventory = async (locationId: string): Promise<InventoryItem[]> => {
  const response = await api.get(`/locations/${locationId}/inventory`);
  return response.data;
};

export const updateInventoryItem = async (
  locationId: string,
  itemId: string,
  updates: Partial<InventoryItem>
): Promise<InventoryItem> => {
  const response = await api.put(`/locations/${locationId}/inventory/${itemId}`, updates);
  return response.data;
};

export const syncInventory = async (locationId: string): Promise<InventoryItem[]> => {
  const response = await api.post(`/locations/${locationId}/sync-inventory`);
  return response.data;
};

export const getInventoryAlerts = async (locationId: string): Promise<InventoryItem[]> => {
  const response = await api.get(`/locations/${locationId}/inventory-alerts`);
  return response.data;
};