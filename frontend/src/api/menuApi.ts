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

export const getAllMenuItems = async (clientId: string, locationId: string): Promise<MenuItem[]> => {
  const response = await apiClient.get<MenuItem[]>(`/clients/${clientId}/locations/${locationId}/menu-items`);
  return response.data;
};

export const getMenuItem = async (clientId: string, locationId: string, menuItemId: number): Promise<MenuItem> => {
  const response = await apiClient.get<MenuItem>(`/clients/${clientId}/locations/${locationId}/menu-items/${menuItemId}`);
  return response.data;
};

export const createMenuItem = async (clientId: string, locationId: string, menuItem: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
  const response = await apiClient.post<MenuItem>(`/clients/${clientId}/locations/${locationId}/menu-items`, menuItem);
  return response.data;
};

export const updateMenuItem = async (clientId: string, locationId: string, menuItemId: number, menuItem: MenuItem): Promise<MenuItem> => {
  const response = await apiClient.put<MenuItem>(`/clients/${clientId}/locations/${locationId}/menu-items/${menuItemId}`, menuItem);
  return response.data;
};

export const deleteMenuItem = async (clientId: string, locationId: string, menuItemId: number): Promise<void> => {
  await apiClient.delete(`/clients/${clientId}/locations/${locationId}/menu-items/${menuItemId}`);
};

export const getAllCategories = async (clientId: string, locationId: string): Promise<MenuGroup[]> => {
  const response = await apiClient.get<MenuGroup[]>(`/clients/${clientId}/locations/${locationId}/menu-categories`);
  return response.data;
};

export const getMenu = async (clientId: string, locationId: string) => menuApi.getMenu(clientId, locationId);
export const getMenuStatistics = async (clientId: string, locationId: string) => menuApi.getMenuStatistics(clientId, locationId);
export const updateMenu = async (clientId: string, locationId: string, menu: Partial<Menu>): Promise<Menu> => {
  const response = await apiClient.put<Menu>(`/clients/${clientId}/locations/${locationId}/menu`, menu);
  return response.data;
};
