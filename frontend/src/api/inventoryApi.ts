import axios from 'axios';
import { InventoryItem } from '../types/inventoryTypes';

const BASE_URL = '/api/inventory';

export const getInventory = async (clientId: string, locationId: string): Promise<InventoryItem[]> => {
  const response = await axios.get(`${BASE_URL}/${clientId}/${locationId}`);
  return response.data;
};

export const getInventoryItem = async (clientId: string, locationId: string, itemId: string): Promise<InventoryItem> => {
  const response = await axios.get(`${BASE_URL}/${clientId}/${locationId}/${itemId}`);
  return response.data;
};

export const createInventoryItem = async (clientId: string, locationId: string, item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
  const response = await axios.post(`${BASE_URL}/${clientId}/${locationId}`, item);
  return response.data;
};

export const updateInventoryItem = async (clientId: string, locationId: string, item: InventoryItem): Promise<InventoryItem> => {
  const response = await axios.put(`${BASE_URL}/${clientId}/${locationId}/${item.id}`, item);
  return response.data;
};

export const deleteInventoryItem = async (clientId: string, locationId: string, itemId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${clientId}/${locationId}/${itemId}`);
};
