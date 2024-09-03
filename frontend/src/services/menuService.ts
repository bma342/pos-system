import axios from 'axios';
import { Menu, MenuItem, MenuGroup } from '../types/menuTypes';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const menuService = {
  async getMenus(clientId: string): Promise<Menu[]> {
    const response = await axios.get<Menu[]>(`${API_BASE_URL}/clients/${clientId}/menus`);
    return response.data;
  },

  async updateMenuItem(menuId: string, itemId: string, updates: Partial<MenuItem>): Promise<MenuItem> {
    const response = await axios.put<MenuItem>(`${API_BASE_URL}/menus/${menuId}/items/${itemId}`, updates);
    return response.data;
  },

  // Add other menu-related API calls here
};
