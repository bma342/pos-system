import { InventoryItem } from '../types';
import {
  getInventory,
  getInventoryItem,
  updateInventoryItem,
  createInventoryItem,
  deleteInventoryItem,
} from '../api/inventoryApi';

export const inventoryService = {
  getInventory,
  getInventoryItem,
  updateInventoryItem,
  createInventoryItem,
  deleteInventoryItem,
};
