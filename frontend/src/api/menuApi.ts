import apiClient from './apiClient';
import axios from 'axios';
import { Menu, MenuGroup, MenuItem, Modifier, MenuStatistics } from '../types/menuTypes';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const menuApi = {
  getMenu: async (clientId: string, locationId: string): Promise<Menu> => {
    const response = await apiClient.get(`/clients/${clientId}/locations/${locationId}/menu`);
    return response.data;
  },

  getMenuStatistics: async (clientId: string, locationId: string): Promise<MenuStatistics> => {
    const response = await apiClient.get(`/clients/${clientId}/locations/${locationId}/menu/statistics`);
    return response.data;
  },

  updateMenu: async (clientId: string, locationId: string, menuData: Partial<Menu>): Promise<Menu> => {
    const response = await apiClient.put(`/clients/${clientId}/locations/${locationId}/menu`, menuData);
    return response.data;
  },

  getAllMenus: async (clientId: string): Promise<Menu[]> => {
    const response = await apiClient.get(`/clients/${clientId}/menus`);
    return response.data;
  },

  createMenu: async (clientId: string, menuData: Partial<Menu>): Promise<Menu> => {
    const response = await apiClient.post(`/clients/${clientId}/menus`, menuData);
    return response.data;
  },

  createMenuGroup: async (clientId: string, menuId: string, groupData: Partial<MenuGroup>): Promise<MenuGroup> => {
    const response = await apiClient.post(`/clients/${clientId}/menus/${menuId}/groups`, groupData);
    return response.data;
  },

  updateMenuGroup: async (clientId: string, menuId: string, groupId: string, groupData: Partial<MenuGroup>): Promise<MenuGroup> => {
    const response = await apiClient.put(`/clients/${clientId}/menus/${menuId}/groups/${groupId}`, groupData);
    return response.data;
  },

  getAllMenuItems: async (clientId: string, locationId: string): Promise<MenuItem[]> => {
    const response = await apiClient.get(`/clients/${clientId}/locations/${locationId}/menu-items`);
    return response.data;
  },

  getMenuItem: async (clientId: string, locationId: string, menuItemId: string): Promise<MenuItem> => {
    const response = await apiClient.get(`/clients/${clientId}/locations/${locationId}/menu-items/${menuItemId}`);
    return response.data;
  },

  createMenuItem: async (clientId: string, locationId: string, menuItemData: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    const response = await apiClient.post(`/clients/${clientId}/locations/${locationId}/menu-items`, menuItemData);
    return response.data;
  },

  updateMenuItem: async (clientId: string, locationId: string, menuItemId: string, menuItemData: MenuItem): Promise<MenuItem> => {
    const response = await apiClient.put(`/clients/${clientId}/locations/${locationId}/menu-items/${menuItemId}`, menuItemData);
    return response.data;
  },

  deleteMenuItem: async (clientId: string, locationId: string, menuItemId: string): Promise<void> => {
    await apiClient.delete(`/clients/${clientId}/locations/${locationId}/menu-items/${menuItemId}`);
  },

  getAllCategories: async (clientId: string, locationId: string): Promise<MenuGroup[]> => {
    const response = await apiClient.get(`/clients/${clientId}/locations/${locationId}/menu-categories`);
    return response.data;
  },

  createModifier: async (clientId: string, menuId: string, groupId: string, itemId: string, modifierData: Partial<Modifier>): Promise<Modifier> => {
    const response = await apiClient.post(`/clients/${clientId}/menus/${menuId}/groups/${groupId}/items/${itemId}/modifiers`, modifierData);
    return response.data;
  },

  updateModifier: async (clientId: string, menuId: string, groupId: string, itemId: string, modifierId: string, modifierData: Partial<Modifier>): Promise<Modifier> => {
    const response = await apiClient.put(`/clients/${clientId}/menus/${menuId}/groups/${groupId}/items/${itemId}/modifiers/${modifierId}`, modifierData);
    return response.data;
  },

  deleteItem: async (clientId: string, type: string, id: string): Promise<void> => {
    await apiClient.delete(`/clients/${clientId}/${type}s/${id}`);
  },

  syncMenus: async (clientId: string): Promise<void> => {
    await apiClient.post(`/clients/${clientId}/menus/sync`);
  },

  fetchMenuItems: async (clientId: string, locationId: string): Promise<MenuItem[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clients/${clientId}/locations/${locationId}/menu-items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  },
};

// Export individual functions
export const { 
  getMenu, 
  getMenuStatistics, 
  updateMenu, 
  getAllMenus, 
  createMenu, 
  createMenuGroup, 
  updateMenuGroup, 
  getAllMenuItems, 
  getMenuItem,
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem, 
  getAllCategories, 
  createModifier, 
  updateModifier, 
  deleteItem, 
  syncMenus,
  fetchMenuItems // Add this line
} = menuApi;

export default menuApi;
