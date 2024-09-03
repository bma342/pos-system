import apiClient from './apiClient';
import { Menu, MenuStatistics } from '../types/menuTypes';

export const menuApi = {
  getMenu: async (clientId: string): Promise<Menu> => {
    const response = await apiClient.get(`/menus/${clientId}`);
    return response.data;
  },

  getMenuStatistics: async (clientId: string): Promise<MenuStatistics> => {
    const response = await apiClient.get(`/menus/statistics/${clientId}`);
    return response.data;
  },

  // Add other API methods as needed
};
