import apiClient from './apiClient';
import { Menu, MenuStatistics } from '../types/menuTypes';

export const menuApi = {
  getMenu: async (clientId: string): Promise<Menu> => {
    try {
      const response = await apiClient.get(`/menus/${clientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching menu for client ${clientId}:`, error);
      throw error;
    }
  },

  getMenuStatistics: async (clientId: string): Promise<MenuStatistics> => {
    try {
      const response = await apiClient.get(`/menus/statistics/${clientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching menu statistics for client ${clientId}:`, error);
      throw error;
    }
  },

  // Add other API methods as needed
};
