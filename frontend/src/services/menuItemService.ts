import axios from 'axios';
import { MenuItem, Category } from '../types/menuTypes';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export class MenuItemService {
  async getAllMenuItems(tenantId: string): Promise<MenuItem[]> {
    const response = await axios.get(
      `${API_BASE_URL}/tenants/${tenantId}/menu-items`
    );
    return response.data;
  }

  async getMenuItem(tenantId: string, menuItemId: number): Promise<MenuItem> {
    const response = await axios.get(
      `${API_BASE_URL}/tenants/${tenantId}/menu-items/${menuItemId}`
    );
    return response.data;
  }

  async createMenuItem(
    tenantId: string,
    menuItem: Omit<MenuItem, 'id'>
  ): Promise<MenuItem> {
    const response = await axios.post(
      `${API_BASE_URL}/tenants/${tenantId}/menu-items`,
      menuItem
    );
    return response.data;
  }

  async updateMenuItem(
    tenantId: string,
    menuItemId: number,
    menuItem: MenuItem
  ): Promise<MenuItem> {
    const response = await axios.put(
      `${API_BASE_URL}/tenants/${tenantId}/menu-items/${menuItemId}`,
      menuItem
    );
    return response.data;
  }

  async deleteMenuItem(tenantId: string, menuItemId: number): Promise<void> {
    await axios.delete(
      `${API_BASE_URL}/tenants/${tenantId}/menu-items/${menuItemId}`
    );
  }

  async getAllCategories(tenantId: string): Promise<Category[]> {
    const response = await axios.get(
      `${API_BASE_URL}/tenants/${tenantId}/categories`
    );
    return response.data;
  }
}
