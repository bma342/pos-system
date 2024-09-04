import { Menu, MenuStatistics } from '../types/menuTypes';
import api from './api';

export const menuService = {
  getMenu: async (locationId: string): Promise<Menu> => {
    const response = await api.get(`/locations/${locationId}/menu`);
    return response.data;
  },

  getMenuStatistics: async (locationId: string): Promise<MenuStatistics> => {
    const response = await api.get(`/locations/${locationId}/menu/statistics`);
    return response.data;
  },

  updateMenu: async (locationId: string, menuId: string, menuData: Partial<Menu>): Promise<Menu> => {
    const response = await api.put(`/locations/${locationId}/menus/${menuId}`, menuData);
    return response.data;
  },

  // Other methods...
};
