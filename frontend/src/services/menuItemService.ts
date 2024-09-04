import { MenuItem, MenuGroup } from '../types/menuTypes';
import {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllCategories
} from '../api/menuApi';

export class MenuItemService {
  async getAllMenuItems(clientId: string, locationId: string): Promise<MenuItem[]> {
    return getAllMenuItems(clientId, locationId);
  }

  async getMenuItem(clientId: string, locationId: string, menuItemId: number): Promise<MenuItem> {
    return getMenuItem(clientId, locationId, menuItemId);
  }

  async createMenuItem(clientId: string, locationId: string, menuItem: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    return createMenuItem(clientId, locationId, menuItem);
  }

  async updateMenuItem(clientId: string, locationId: string, menuItemId: number, menuItem: MenuItem): Promise<MenuItem> {
    return updateMenuItem(clientId, locationId, menuItemId, menuItem);
  }

  async deleteMenuItem(clientId: string, locationId: string, menuItemId: number): Promise<void> {
    return deleteMenuItem(clientId, locationId, menuItemId);
  }

  async getAllCategories(clientId: string, locationId: string): Promise<MenuGroup[]> {
    return getAllCategories(clientId, locationId);
  }
}
